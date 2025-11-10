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
  // Get current user
  const { data: { user }, error: userError } = await supabase.auth.getUser()

  if (userError || !user) {
    return { user: null, profile: null }
  }

  // Get profile data
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (profileError) {
    console.error('Error fetching profile:', profileError)
    return { user, profile: null }
  }

  return { user, profile }
}

export function useUser() {
  const queryClient = useQueryClient()

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['user'],
    queryFn: fetchUserAndProfile,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
  })

  // Listen to auth state changes and invalidate cache
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      console.log('🔄 Auth state changed:', event)

      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        // Invalidate and refetch user data
        queryClient.invalidateQueries({ queryKey: ['user'] })
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
  }
}