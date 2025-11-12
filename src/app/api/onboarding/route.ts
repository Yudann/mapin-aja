// src/app/api/onboarding/route.ts
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

    console.log('📝 Onboarding request from user:', user.id)

    // Parse request body
    const body = await request.json()
    const { businessName, category, address, phone, description } = body 

    // Validate required fields
    if (!businessName || !category || !address || !phone || !description) {
      return NextResponse.json(
        { error: 'Validation Error', message: 'All fields are required' },
        { status: 400 }
      )
    }

    // Check if user already has UMKM
    const { data: existingUmkm } = await supabase
      .from('umkm')
      .select('id')
      .eq('owner_id', user.id)
      .single()

    if (existingUmkm) {
      return NextResponse.json(
        { error: 'Already Exists', message: 'You already have a registered UMKM' },
        { status: 409 }
      )
    }

    // 1. Insert UMKM data
    const { data: umkmData, error: umkmError } = await supabase
      .from('umkm')
      .insert({
        owner_id: user.id,
        name: businessName.trim(),
        category: category,
        address: address.trim(),
        phone: phone.trim(),
        description: description.trim(),
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (umkmError) {
      console.error('❌ UMKM insert error:', umkmError)
      return NextResponse.json(
        { error: 'Database Error', message: umkmError.message },
        { status: 500 }
      )
    }

    console.log('✅ UMKM created:', umkmData.id)

    // 2. Update profile onboarding status
    const { error: profileError } = await supabase
      .from('profiles')
      .update({
        onboarding_completed: true,
        phone: phone.trim(), 
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.id)

    if (profileError) {
      console.error('⚠️ Profile update error:', profileError)
      // Lanjutkan, karena UMKM sudah dibuat
    } else {
      console.log('✅ Profile updated - onboarding marked as completed')
    }

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Onboarding completed successfully',
      data: {
        umkm_id: umkmData.id,
        umkm_name: umkmData.name,
      }
    }, { status: 201 })

  } catch (error) {
    console.error('❌ Unexpected error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error', message: 'Something went wrong' },
      { status: 500 }
    )
  }
}

// GET endpoint to check onboarding status
export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if user has completed onboarding
    const { data: profile } = await supabase
      .from('profiles')
      .select('onboarding_completed, role')
      .eq('id', user.id)
      .single()

    // Check if UMKM exists
    const { data: umkm } = await supabase
      .from('umkm')
      .select('id, name')
      .eq('owner_id', user.id)
      .single()

    return NextResponse.json({
      onboarding_completed: profile?.onboarding_completed || false,
      has_umkm: !!umkm,
      role: profile?.role,
      umkm: umkm
    })

  } catch (error) {
    console.error('❌ Get onboarding status error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}