'use client'

import React from 'react'
import { cn } from '@/lib/responsive'

interface AuthButtonProps {
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  className?: string
}

export const AuthButton: React.FC<AuthButtonProps> = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  className = ''
}) => {
  const baseClasses = cn(
    // Base styling
    'relative font-medium rounded-standard cursor-pointer',
    'transition-all duration-300 ease-out',
    'focus:outline-none focus:ring-2 focus:ring-white/40',
    'disabled:cursor-not-allowed disabled:opacity-50',
    
    // Size variations
    size === 'sm' && 'px-4 py-2 h-10 text-sm md:px-6 md:h-12 md:text-base',
    size === 'md' && 'px-6 py-3 h-12 text-base md:px-8 md:py-4 md:h-14 md:text-base-large lg:px-10 lg:py-5 lg:h-16 lg:text-h3',
    size === 'lg' && 'px-8 py-4 h-14 text-base-large md:px-12 md:py-6 md:h-16 md:text-h3 lg:px-16 lg:py-8 lg:h-20 lg:text-h2',
    
    // Variant styling
    variant === 'primary' && 'bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-sm border border-white/30 text-primary shadow-lg hover:from-white/30 hover:to-white/20 hover:border-white/40 hover:shadow-xl hover:shadow-white/20 active:scale-95',
    
    variant === 'secondary' && 'bg-white/5 backdrop-blur-sm border border-white/20 text-primary hover:bg-white/10 hover:border-white/30 active:scale-95',
    
    variant === 'ghost' && 'bg-transparent text-primary hover:bg-white/10 active:scale-95',
    
    className
  )

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={baseClasses}
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
          Loading...
        </div>
      ) : (
        children
      )}
    </button>
  )
} 