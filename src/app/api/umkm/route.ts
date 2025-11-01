// app/api/umkm/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase-server';
import { umkmCreateSchema } from '@/lib/validations';

// GET /api/umkm - Get all public UMKM
export async function GET() {
  try {
    const supabase = await createSupabaseServerClient();
    
    const { data: umkmList, error } = await supabase
      .from('umkm_with_ratings')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching UMKM list:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(umkmList);
  } catch (error) {
    console.error('Error in UMKM API:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// POST /api/umkm - Create new UMKM (seller only)
export async function POST(request: NextRequest) {
  try {
    const supabase = await createSupabaseServerClient();
    
    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user is seller
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profile?.role !== 'seller') {
      return NextResponse.json({ error: 'Only sellers can create UMKM' }, { status: 403 });
    }

    // Check if user already has UMKM
    const { data: existingUmkm } = await supabase
      .from('umkm')
      .select('id')
      .eq('owner_id', user.id)
      .single();

    if (existingUmkm) {
      return NextResponse.json({ error: 'You already have an UMKM' }, { status: 400 });
    }

    // Validate request body
    const body = await request.json();
    const validation = umkmCreateSchema.safeParse(body);
    
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validation.error.issues },
        { status: 400 }
      );
    }

    // Create UMKM
    const { data: umkm, error } = await supabase
      .from('umkm')
      .insert({
        ...validation.data,
        owner_id: user.id,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating UMKM:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(umkm, { status: 201 });
  } catch (error) {
    console.error('Error in UMKM creation API:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}