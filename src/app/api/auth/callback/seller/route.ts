// src/app/api/auth/callback/seller/route.ts
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const origin = requestUrl.origin

  if (!code) {
    return NextResponse.redirect(`${origin}/auth/seller?error=no_code`)
  }

  const supabase = await createClient()

  // Exchange code for session
  const { data, error } = await supabase.auth.exchangeCodeForSession(code)

  if (error || !data.session || !data.user) {
    return NextResponse.redirect(`${origin}/auth/seller?error=auth_failed`)
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
    // Existing seller
    if (profile.role === 'seller') {
      const destination = profile.onboarding_completed 
        ? `${origin}/dashboard/seller` 
        : `${origin}/onboarding/seller`
      return NextResponse.redirect(destination)
    }

    // Convert customer to seller
    await supabase
      .from('profiles')
      .update({ 
        role: 'seller',
        onboarding_completed: false,
        updated_at: new Date().toISOString()
      })
      .eq('id', data.user.id)

    return NextResponse.redirect(`${origin}/onboarding/seller`)
  }

  // New user - update to seller role
  const { error: updateError } = await supabase
    .from('profiles')
    .update({ 
      role: 'seller',
      email: data.user.email,
      onboarding_completed: false,
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
        role: 'seller',
        onboarding_completed: false,
      })
  }

  return NextResponse.redirect(`${origin}/onboarding/seller`)
}