// src/app/auth/callback/route.ts
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const userType = requestUrl.searchParams.get('user_type') || 'customer'
  const redirectTo = requestUrl.searchParams.get('redirect') || '/'
  const origin = requestUrl.origin

  console.log('🔄 Auth callback received:', { code: !!code, userType, redirectTo })

  if (code) {
    const supabase = await createClient()

    // Exchange code for session
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    if (error) {
      console.error('❌ Exchange code error:', error)
      return NextResponse.redirect(`${origin}/auth?error=${encodeURIComponent(error.message)}`)
    }

    if (data.session) {
      console.log('✅ Session established for user:', data.user.id)

      // Upsert profile
      const profileData = {
        id: data.user.id,
        full_name: 
          data.user.user_metadata.full_name ||
          data.user.user_metadata.name ||
          data.user.email?.split('@')[0] ||
          'User',
        avatar_url: data.user.user_metadata.avatar_url,
        role: userType as 'customer' | 'seller',
        onboarding_completed: userType === 'customer', // customer auto-complete, seller needs onboarding
        updated_at: new Date().toISOString(),
      }

      const { error: profileError } = await supabase
        .from('profiles')
        .upsert(profileData, { onConflict: 'id' })

      if (profileError) {
        console.error('⚠️ Profile upsert error:', profileError)
        // Continue anyway - profile can be created later
      } else {
        console.log('✅ Profile created/updated')
      }

      // Determine redirect destination
      let destination = redirectTo

      if (userType === 'seller') {
        // Check if onboarding is completed
        const { data: profile } = await supabase
          .from('profiles')
          .select('onboarding_completed')
          .eq('id', data.user.id)
          .single()

        destination = profile?.onboarding_completed 
          ? '/dashboard/seller' 
          : '/onboarding/seller'
      } else {
        destination = redirectTo === '/' ? '/explore' : redirectTo
      }

      console.log('📍 Redirecting to:', destination)
      return NextResponse.redirect(`${origin}${destination}`)
    }
  }

  // No code or session - redirect to auth with error
  console.error('❌ No code provided')
  return NextResponse.redirect(`${origin}/auth?error=no_code`)
}