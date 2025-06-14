'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ResponsiveWrapper, ResponsiveText } from '@/lib/responsive'
import { AuthButton } from '@/components/AuthButton'
import { getSession } from '@/lib/auth/auth'
import { logger } from '@/lib/logger'

export default function LandingPage() {
  const router = useRouter()

  useEffect(() => {
    const checkExistingSession = async () => {
      try {
        const { session } = await getSession()
        if (session) {
          logger.info('Existing session found, redirecting to home')
          router.replace('/main')
        }
              } catch (error) {
          logger.error({ message: 'Session check error on landing', error: error as Error })
      }
    }

    checkExistingSession()
  }, [router])

  const handleGetStarted = () => {
    router.push('/register')
  }

  return (
    <div className="min-h-screen bg-dark-gradient relative overflow-hidden">
      {/* Floating orbs for visual appeal */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-white/5 rounded-full blur-xl animate-pulse" />
      <div className="absolute top-20 right-20 w-40 h-40 bg-white/10 rounded-full blur-2xl animate-pulse delay-500" />
      <div className="absolute bottom-20 left-1/3 w-24 h-24 bg-white/5 rounded-full blur-lg animate-pulse delay-1000" />
      <div className="absolute bottom-32 right-10 w-28 h-28 bg-white/10 rounded-full blur-xl animate-pulse delay-700" />
      
      <ResponsiveWrapper padding="lg" className="min-h-screen flex items-center justify-center">
        <div className="w-full max-w-4xl mx-auto text-center">
          <div className="glass-card p-8 md:p-12 lg:p-16">
            {/* Logo/Brand */}
            <div className="mb-8 md:mb-12">
              <div className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center backdrop-blur-sm border border-white/20">
                <span className="text-4xl md:text-5xl font-bold text-primary">🧠</span>
              </div>
              
              <ResponsiveText variant="title" weight="extrabold" className="mb-4">
                Welcome to
                <br />
                <span className="bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent">
                  Rational Mind
                </span>
              </ResponsiveText>
              
              <ResponsiveText variant="h2" className="text-white/80 max-w-2xl mx-auto leading-relaxed">
                Start your mental strength journey in a secure, personalized, safe space.
                <br />
                <span className="text-white/60">Your AI-powered companion for rational thinking.</span>
              </ResponsiveText>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12">
              <div className="glass-card p-6 md:p-8 bg-white/5">
                <div className="text-3xl md:text-4xl mb-4">🔒</div>
                <ResponsiveText variant="h3" weight="bold" className="mb-3">
                  Private & Secure
                </ResponsiveText>
                <ResponsiveText variant="body" className="text-white/70">
                  Your conversations are encrypted and completely private
                </ResponsiveText>
              </div>
              
              <div className="glass-card p-6 md:p-8 bg-white/5">
                <div className="text-3xl md:text-4xl mb-4">🤖</div>
                <ResponsiveText variant="h3" weight="bold" className="mb-3">
                  AI-Powered
                </ResponsiveText>
                <ResponsiveText variant="body" className="text-white/70">
                  Advanced AI that understands and adapts to your needs
                </ResponsiveText>
              </div>
              
              <div className="glass-card p-6 md:p-8 bg-white/5">
                <div className="text-3xl md:text-4xl mb-4">📈</div>
                <ResponsiveText variant="h3" weight="bold" className="mb-3">
                  Personal Growth
                </ResponsiveText>
                <ResponsiveText variant="body" className="text-white/70">
                  Track your progress and build lasting mental strength
                </ResponsiveText>
              </div>
            </div>

            {/* Call to Action */}
            <div className="space-y-6">
              <AuthButton 
                variant="primary" 
                size="lg" 
                onClick={handleGetStarted}
                className="w-full md:w-auto px-12 md:px-16"
              >
                Get Started for Free
              </AuthButton>
              
              <ResponsiveText variant="small" className="text-white/50">
                No credit card required • Join thousands of users building mental resilience
              </ResponsiveText>
            </div>

            {/* Social Proof */}
            <div className="mt-12 md:mt-16 pt-8 md:pt-12 border-t border-white/10">
              <ResponsiveText variant="small" className="text-white/40 mb-4">
                Trusted by mental health professionals and individuals worldwide
              </ResponsiveText>
              <div className="flex justify-center items-center space-x-8 opacity-40">
                <div className="text-2xl">⭐⭐⭐⭐⭐</div>
                <ResponsiveText variant="small" className="text-white/50">
                  4.9/5 rating
                </ResponsiveText>
              </div>
            </div>
          </div>
        </div>
      </ResponsiveWrapper>
    </div>
  )
} 