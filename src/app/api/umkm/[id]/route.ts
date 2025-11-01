// app/api/umkm/[id]/route.ts
import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase-server';

interface RouteParams {
  params: {
    id: string;
  };
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const supabase = await createSupabaseServerClient();
    const { id } = params;

    // Validasi ID
    if (!id) {
      return NextResponse.json(
        { error: 'ID UMKM tidak valid' },
        { status: 400 }
      );
    }

    // Fetch data UMKM
    const { data: umkmData, error: umkmError } = await supabase
      .from("umkm")
      .select("*")
      .eq("id", id)
      .single();

    if (umkmError) {
      console.error('Error fetching UMKM:', umkmError);
      
      if (umkmError.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'UMKM tidak ditemukan' },
          { status: 404 }
        );
      }
      
      return NextResponse.json(
        { error: 'Gagal mengambil data UMKM' },
        { status: 500 }
      );
    }

    // Jika UMKM ditemukan, fetch data pemilik (profile)
    let ownerProfile = null;
    if (umkmData.owner_id) {
      const { data: profileData } = await supabase
        .from("profiles")
        .select("full_name, avatar_url, phone")
        .eq("id", umkmData.owner_id)
        .single();
      
      ownerProfile = profileData;
    }

    return NextResponse.json({
      data: {
        ...umkmData,
        owner_profile: ownerProfile
      }
    });

  } catch (error) {
    console.error('Error in UMKM detail API:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan internal server' },
      { status: 500 }
    );
  }
}
