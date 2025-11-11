// src/app/api/auth/callback/route.ts
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const userType = requestUrl.searchParams.get('user_type') || 'customer'
  const redirectTo = requestUrl.searchParams.get('redirect') || '/explore'
  
  // Gunakan origin dari request untuk environment yang dinamis
  const origin = requestUrl.origin


  if (!code) {
    console.error('❌ No code provided')
    return NextResponse.redirect(`${origin}/auth?error=no_code`)
  }

  try {
    const supabase = await createClient()

    // Exchange code for session
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    if (error) {
      console.error('❌ Exchange code error:', error)
      return NextResponse.redirect(`${origin}/auth?error=auth_failed`)
    }

    if (!data.session) {
      console.error('❌ No session after exchange')
      return NextResponse.redirect(`${origin}/auth?error=no_session`)
    }


    // Upsert profile
    const profileData = {
      id: data.user.id,
      full_name: 
        data.user.user_metadata.full_name ||
        data.user.user_metadata.name ||
        data.user.email?.split('@')[0] ||
        'User',
      avatar_url: data.user.user_metadata.avatar_url,
      role: userType,
      onboarding_completed: userType === 'customer',
      updated_at: new Date().toISOString(),
    }

    const { error: profileError } = await supabase
      .from('profiles')
      .upsert(profileData, { onConflict: 'id' })

    if (profileError) {
      console.error('⚠️ Profile upsert error:', profileError)
      // Continue anyway - profile can be created later
    } 

    // Determine final redirect destination
    let finalDestination = redirectTo

    if (userType === 'seller') {
      // Check if onboarding is completed
      const { data: profile } = await supabase
        .from('profiles')
        .select('onboarding_completed')
        .eq('id', data.user.id)
        .single()

      finalDestination = profile?.onboarding_completed 
        ? '/dashboard/seller' 
        : '/onboarding/seller'
    } else if (redirectTo === '/') {
      finalDestination = '/explore'
    }

    
    // Redirect ke destination yang sudah ditentukan
    return NextResponse.redirect(`${origin}${finalDestination}`)

  } catch (error) {
    console.error('❌ Unexpected error in auth callback:', error)
    return NextResponse.redirect(`${origin}/auth?error=server_error`)
  }
}