// app/api/umkm/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase-server';
import { umkmUpdateSchema } from '@/lib/validations';

interface RouteParams {
  params: {
    id: string;
  };
}

// GET /api/umkm/[id] - Get UMKM detail
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const supabase = await createSupabaseServerClient();
    
    const { data: umkm, error } = await supabase
      .from('umkm_with_ratings')
      .select('*')
      .eq('id', params.id)
      .eq('is_active', true)
      .single();

    if (error) {
      console.error('Error fetching UMKM detail:', error);
      return NextResponse.json({ error: 'UMKM not found' }, { status: 404 });
    }

    // Get UMKM products
    const { data: products } = await supabase
      .from('products')
      .select('*')
      .eq('umkm_id', params.id)
      .eq('is_available', true)
      .order('created_at', { ascending: false });

    // Get UMKM reviews
    const { data: reviews } = await supabase
      .from('reviews')
      .select('*, profiles(full_name, avatar_url)')
      .eq('umkm_id', params.id)
      .order('created_at', { ascending: false });

    return NextResponse.json({
      ...umkm,
      products: products || [],
      reviews: reviews || [],
    });
  } catch (error) {
    console.error('Error in UMKM detail API:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// PATCH /api/umkm/[id] - Update UMKM (owner only)
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const supabase = await createSupabaseServerClient();
    
    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user owns this UMKM
    const { data: umkm } = await supabase
      .from('umkm')
      .select('owner_id')
      .eq('id', params.id)
      .single();

    if (!umkm || umkm.owner_id !== user.id) {
      return NextResponse.json({ error: 'Not authorized to update this UMKM' }, { status: 403 });
    }

    // Validate request body
    const body = await request.json();
    const validation = umkmUpdateSchema.safeParse(body);
    
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validation.error.issues },
        { status: 400 }
      );
    }

    // Update UMKM
    const { data: updatedUmkm, error } = await supabase
      .from('umkm')
      .update({
        ...validation.data,
        updated_at: new Date().toISOString(),
      })
      .eq('id', params.id)
      .select()
      .single();

    if (error) {
      console.error('Error updating UMKM:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(updatedUmkm);
  } catch (error) {
    console.error('Error in UMKM update API:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// DELETE /api/umkm/[id] - Delete UMKM (owner only)
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const supabase = await createSupabaseServerClient();
    
    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user owns this UMKM
    const { data: umkm } = await supabase
      .from('umkm')
      .select('owner_id')
      .eq('id', params.id)
      .single();

    if (!umkm || umkm.owner_id !== user.id) {
      return NextResponse.json({ error: 'Not authorized to delete this UMKM' }, { status: 403 });
    }

    // Soft delete (set is_active to false)
    const { error } = await supabase
      .from('umkm')
      .update({ 
        is_active: false,
        updated_at: new Date().toISOString(),
      })
      .eq('id', params.id);

    if (error) {
      console.error('Error deleting UMKM:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'UMKM deleted successfully' });
  } catch (error) {
    console.error('Error in UMKM delete API:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}