// src/app/actions/auth.ts
'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function signOut() {
  const supabase = await createClient()
  
  const { error } = await supabase.auth.signOut()
  
  if (error) {
    console.error('❌ Sign out error:', error)
    return { error: error.message }
  }

  
  // Revalidate all paths to clear cached data
  revalidatePath('/', 'layout')
  
  // Redirect to auth page
  redirect('/auth')
}