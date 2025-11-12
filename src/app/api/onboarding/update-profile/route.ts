// src/app/api/onboarding/update-profile/route.ts
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      console.error('❌ Auth error:', authError)
      return NextResponse.json(
        { error: 'Unauthorized', message: 'User not authenticated' },
        { status: 401 }
      )
    }

    console.log('📝 Update profile request from user:', user.id)

    // Update profile to mark onboarding as completed
    const { error: profileError } = await supabase
      .from('profiles')
      .update({
        onboarding_completed: true,
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.id)

    if (profileError) {
      console.error('❌ Profile update error:', profileError)
      return NextResponse.json(
        { error: 'Database Error', message: profileError.message },
        { status: 500 }
      )
    }

    console.log('✅ Profile updated - onboarding completed')

    return NextResponse.json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        user_id: user.id,
        onboarding_completed: true
      }
    })

  } catch (error) {
    console.error('❌ Unexpected error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error', message: 'Something went wrong' },
      { status: 500 }
    )
  }
}