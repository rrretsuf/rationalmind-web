'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ResponsiveWrapper, ResponsiveText } from '@/lib/responsive'
import { AuthButton } from '@/components/AuthButton'
import { getSession, signOut } from '@/lib/auth/auth'
import { logger } from '@/lib/logger'

export default function MainPage() {
  const router = useRouter()
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { session } = await getSession()
        if (!session) {
          logger.info('No session found, redirecting to auth')
          router.replace('/register')
          return
        }
        
        setUserEmail(session.user.email || null)
        logger.info('User session verified', { userId: session.user.id })
              } catch (error) {
          logger.error({ message: 'Session check error', error: error as Error })
        router.replace('/register')
      } finally {
        setLoading(false)
      }
    }

    checkSession()
  }, [router])

  const handleSignOut = async () => {
    try {
      await signOut(router)
          } catch (error) {
        logger.error({ message: 'Sign out error', error: error as Error })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-gradient flex items-center justify-center">
        <div className="glass-card p-8">
          <div className="flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3" />
            <ResponsiveText variant="body" className="text-white">
              Loading...
            </ResponsiveText>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-dark-gradient">
      <ResponsiveWrapper padding="lg" className="min-h-screen flex items-center justify-center">
        <div className="w-full max-w-2xl mx-auto">
          <div className="glass-card p-8 md:p-12 text-center">
            {/* Welcome Header */}
            <div className="mb-8">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-white/20 flex items-center justify-center border border-white/30">
                <span className="text-4xl font-bold text-white">R</span>
              </div>
              
              <ResponsiveText variant="title" weight="bold" className="mb-4 text-white">
                Welcome to Rational Mind
              </ResponsiveText>
              
              <ResponsiveText variant="body" className="text-white/80 text-lg">
                {userEmail ? (
                  <>
                    Hello, <span className="text-white font-medium">{userEmail}</span>
                    <br />Your mental strength journey continues here.
                  </>
                ) : (
                  "Your mental strength journey starts here."
                )}
              </ResponsiveText>
            </div>

            {/* Main Content */}
            <div className="space-y-6 mb-8">
              <div className="glass-card p-6 bg-white/10">
                <ResponsiveText variant="h2" weight="bold" className="mb-4 text-white">
                  Ready to Begin?
                </ResponsiveText>
                <ResponsiveText variant="body" className="text-white/80 mb-6 text-lg">
                  Your AI companion is ready to help you build mental resilience 
                  and make rational decisions.
                </ResponsiveText>
                <AuthButton variant="primary" size="md" className="w-full md:w-auto px-8 py-4">
                  Start Session
                </AuthButton>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-card p-6 bg-white/10">
                  <ResponsiveText variant="h3" weight="bold" className="mb-3 text-white">
                    Smart Insights
                  </ResponsiveText>
                  <ResponsiveText variant="body" className="text-white/70">
                    Personalized recommendations based on your progress
                  </ResponsiveText>
                </div>
                
                <div className="glass-card p-6 bg-white/10">
                  <ResponsiveText variant="h3" weight="bold" className="mb-3 text-white">
                    Private & Secure
                  </ResponsiveText>
                  <ResponsiveText variant="body" className="text-white/70">
                    Your data is encrypted and completely private
                  </ResponsiveText>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="pt-6 border-t border-white/20">
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <AuthButton variant="secondary" size="sm" className="px-6 py-3">
                  View Profile
                </AuthButton>
                <AuthButton variant="ghost" size="sm" onClick={handleSignOut} className="px-6 py-3">
                  Sign Out
                </AuthButton>
              </div>
            </div>
          </div>
        </div>
      </ResponsiveWrapper>
    </div>
  )
} 