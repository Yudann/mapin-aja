// src/middleware.ts
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => 
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Define route patterns
  const isAuthPage = request.nextUrl.pathname.startsWith('/auth')
  const isAuthCallback = request.nextUrl.pathname.includes('/callback')
  const isOnboardingPage = request.nextUrl.pathname.startsWith('/onboarding')
  const isDashboardPage = request.nextUrl.pathname.startsWith('/dashboard')
  const isPublicPage = 
    request.nextUrl.pathname === '/' ||
    request.nextUrl.pathname.startsWith('/umkm') ||
    request.nextUrl.pathname.startsWith('/api')

  // Allow auth callbacks to pass through
  if (isAuthCallback) {
    return supabaseResponse
  }

  // User not authenticated
  if (!user) {
    if (isDashboardPage || isOnboardingPage) {
      // Redirect to main auth landing page
      return NextResponse.redirect(new URL('/auth', request.url))
    }
    return supabaseResponse
  }

  // User is authenticated - get profile data
  const { data: profile } = await supabase
    .from('profiles')
    .select('onboarding_completed, role')
    .eq('id', user.id)
    .maybeSingle()

  // User authenticated but on auth page (except callback)
  if (user && isAuthPage && !isAuthCallback) {
    // Redirect based on role and onboarding status
    if (profile?.role === 'seller') {
      if (profile?.onboarding_completed) {
        return NextResponse.redirect(new URL('/dashboard/seller', request.url))
      } else {
        return NextResponse.redirect(new URL('/onboarding/seller', request.url))
      }
    } else {
    }
  }

  // Seller role specific logic
  if (profile?.role === 'seller') {
    // Seller trying to access dashboard without completing onboarding
    if (isDashboardPage && !profile?.onboarding_completed) {
      return NextResponse.redirect(new URL('/onboarding/seller', request.url))
    }

    // Seller trying to access onboarding after completion
    if (isOnboardingPage && profile?.onboarding_completed) {
      return NextResponse.redirect(new URL('/dashboard/seller', request.url))
    }
  }

  // Customer role specific logic
  if (profile?.role === 'customer') {
    // Customer trying to access seller-only pages
    if (isDashboardPage || isOnboardingPage) {
      return NextResponse.redirect(new URL('/dashboard/customer', request.url))
    }
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}