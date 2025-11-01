// app/api/umkm/route.ts
import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase-server';

export async function GET() {
  try {
    const supabase = await createSupabaseServerClient();
    
    const { data, error } = await supabase
      .from("umkm")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error('Error fetching UMKM list:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json(data);
  } catch(error) {
    console.error('Error in UMKM API:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
