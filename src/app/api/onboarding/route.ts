// app/api/onboarding/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase-server';
import { onboardingSchema } from '@/lib/validations';

// POST /api/onboarding - Complete seller onboarding
export async function POST(request: NextRequest) {
  try {
    const supabase = await createSupabaseServerClient();
    
    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user already completed onboarding
    const { data: existingUmkm } = await supabase
      .from('umkm')
      .select('id')
      .eq('owner_id', user.id)
      .single();

    if (existingUmkm) {
      return NextResponse.json({ error: 'Onboarding already completed' }, { status: 400 });
    }

    // Validate request body
    const body = await request.json();
    const validation = onboardingSchema.safeParse(body);
    
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validation.error.issues },
        { status: 400 }
      );
    }

    // Create UMKM through onboarding
    const { data: umkm, error } = await supabase
      .from('umkm')
      .insert({
        ...validation.data,
        owner_id: user.id,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating UMKM through onboarding:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Update user profile to mark onboarding as completed
    await supabase
      .from('profiles')
      .update({ 
        onboarding_completed: true,
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.id);

    return NextResponse.json({ 
      success: true, 
      umkm_id: umkm.id,
      message: 'Onboarding completed successfully' 
    }, { status: 201 });
  } catch (error) {
    console.error('Error in onboarding API:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}