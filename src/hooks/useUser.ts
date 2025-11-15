// src/hooks/useUser.ts
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase/client'
import { useEffect } from 'react'
import type { User } from '@supabase/supabase-js'
import type { Database } from '@/integrations/supabase/types'

type Profile = Database['public']['Tables']['profiles']['Row']

interface UserData {
  user: User | null
  profile: Profile | null
}

async function fetchUserAndProfile(): Promise<UserData> {
  try {
    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser()

    if (userError || !user) {
      return { user: null, profile: null }
    }


    // Get profile data - GUNAKAN maybeSingle() BUKAN single()
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle() // ← PERUBAHAN UTAMA: maybeSingle() tidak error jika tidak ada data

    if (profileError) {
      console.error('❌ Error fetching profile:', profileError)
      return { user, profile: null }
    }

    if (!profile) {
      return { user, profile: null }
    }

    return { user, profile }
  } catch (error) {
    console.error('❌ Unexpected error in fetchUserAndProfile:', error)
    return { user: null, profile: null }
  }
}

export function useUser() {
  const queryClient = useQueryClient()

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['user'],
    queryFn: fetchUserAndProfile,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
    retry: 2,
    refetchOnWindowFocus: false, // ← Tambahan: hindari refetch berlebihan
  })

  // Listen to auth state changes
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {

      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED' || event === 'USER_UPDATED') {
        // Tambahkan delay untuk memastikan profile sudah dibuat di database
        setTimeout(async () => {
          await queryClient.invalidateQueries({ queryKey: ['user'] })
        }, 1000) // Increase delay to 1 second
      } else if (event === 'SIGNED_OUT') {
        // Clear user data immediately
        queryClient.setQueryData(['user'], { user: null, profile: null })
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [queryClient])

  return {
    user: data?.user ?? null,
    profile: data?.profile ?? null,
    isLoading,
    error,
    refetch,
    isAuthenticated: !!data?.user,
    isSeller: data?.profile?.role === 'seller',
    isCustomer: data?.profile?.role === 'customer',
    onboardingCompleted: data?.profile?.onboarding_completed ?? false,
  }
}