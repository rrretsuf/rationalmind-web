'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AuthInput } from '@/components/AuthInput'
import { AuthButton } from '@/components/AuthButton'
import { ResponsiveWrapper, ResponsiveText } from '@/lib/responsive'
import { signUpWithEmail, signInWithEmail } from '@/lib/auth'
import { logger } from '@/lib/logger'

type AuthMode = 'signin' | 'signup'

export default function AuthPage() {
  const router = useRouter()
  
  const [mode, setMode] = useState<AuthMode>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Basic validation
    if (!email || !password) {
      setError('Please fill in all fields')
      setLoading(false)
      return
    }

    if (mode === 'signup' && password !== confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      setLoading(false)
      return
    }

    try {
      let result
      if (mode === 'signup') {
        logger.info('Attempting signup', { email })
        result = await signUpWithEmail(email, password, router)
      } else {
        logger.info('Attempting signin', { email })
        result = await signInWithEmail(email, password, router)
      }

      if (result.error) {
        setError(result.error.message || 'Authentication failed')
      }
    } catch (error) {
      logger.error('Auth error', error)
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const toggleMode = () => {
    setMode(mode === 'signin' ? 'signup' : 'signin')
    setError('')
    setPassword('')
    setConfirmPassword('')
  }

  return (
    <div className="min-h-screen bg-dark-gradient flex items-center justify-center">
      <ResponsiveWrapper padding="lg" className="w-full max-w-xl xl:max-w-4xl mx-auto">
        <div className="glass-card p-8 md:p-10">
          {/* Logo/Brand */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/20 flex items-center justify-center border border-white/30">
              <span className="text-3xl font-bold text-white">R</span>
            </div>
            <ResponsiveText variant="h1" weight="bold" className="text-center mb-4 text-white">
              Welcome to Rational Mind
            </ResponsiveText>
            <ResponsiveText variant="body" className="text-center text-white/80 text-lg">
              {mode === 'signin' 
                ? "Ready to continue your journey? Let's get you signed in." 
                : "Start your mental strength journey in a secure space."
              }
            </ResponsiveText>
          </div>

          {/* Auth Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <AuthInput
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={error && error.includes('email') ? error : ''}
              required
            />
            
            <AuthInput
              type="password"
              placeholder={mode === 'signin' ? 'Enter your password' : 'Create a password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={error && error.includes('password') ? error : ''}
              required
            />

            {mode === 'signup' && (
              <AuthInput
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={error && error.includes('match') ? error : ''}
                required
              />
            )}

            {error && !error.includes('email') && !error.includes('password') && !error.includes('match') && (
              <div className="p-4 rounded-standard bg-red-500/20 border border-red-500/30">
                <p className="text-red-200 text-base text-center font-medium">{error}</p>
              </div>
            )}

            <AuthButton
              type="submit"
              variant="primary"
              size="md"
              loading={loading}
              className="w-full py-4 text-lg font-medium"
            >
              {mode === 'signin' ? 'Sign In' : 'Create Account'}
            </AuthButton>
          </form>

          {/* Mode Toggle */}
          <div className="mt-8 text-center">
            <p className="text-white/70 text-base mb-4">
              {mode === 'signin' ? "Don't have an account?" : "Already have an account?"}
            </p>
            <AuthButton
              variant="ghost"
              onClick={toggleMode}
              className="text-white hover:text-white/80 font-medium text-base"
            >
              {mode === 'signin' ? 'Create one now' : 'Sign in instead'}
            </AuthButton>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-white/20">
            <ResponsiveText variant="small" className="text-center text-white/60">
              By continuing, you agree to our terms of service and privacy policy.
            </ResponsiveText>
          </div>
        </div>
      </ResponsiveWrapper>
    </div>
  )
} 