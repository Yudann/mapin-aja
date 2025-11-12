// src/app/api/auth/callback/customer/route.ts
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const origin = requestUrl.origin

  if (!code) {
    return NextResponse.redirect(`${origin}/auth/customer?error=no_code`)
  }

  const supabase = await createClient()

  // Exchange code for session
  const { data, error } = await supabase.auth.exchangeCodeForSession(code)

  if (error || !data.session || !data.user) {
    return NextResponse.redirect(`${origin}/auth/customer?error=auth_failed`)
  }

  // Wait for database trigger to complete
  await new Promise(resolve => setTimeout(resolve, 1000))

  // Check existing profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('id, role, onboarding_completed')
    .eq('id', data.user.id)
    .single()

  if (profile) {
    // Update email and mark onboarding complete if needed
    if (!profile.onboarding_completed) {
      await supabase
        .from('profiles')
        .update({ 
          email: data.user.email,
          onboarding_completed: true,
          updated_at: new Date().toISOString()
        })
        .eq('id', data.user.id)
    }

    return NextResponse.redirect(`${origin}/explore`)
  }

  // New user - update profile
  const { error: updateError } = await supabase
    .from('profiles')
    .update({ 
      email: data.user.email,
      onboarding_completed: true,
      updated_at: new Date().toISOString()
    })
    .eq('id', data.user.id)

  // Fallback: insert if update fails
  if (updateError) {
    await supabase
      .from('profiles')
      .insert({
        id: data.user.id,
        email: data.user.email,
        full_name: data.user.user_metadata?.full_name || 
                   data.user.user_metadata?.name || 
                   data.user.email?.split('@')[0] || 
                   'User',
        avatar_url: data.user.user_metadata?.avatar_url,
        role: 'customer',
        onboarding_completed: true,
      })
  }

  return NextResponse.redirect(`${origin}/explore`)
}