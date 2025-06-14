'use client'

import React, { forwardRef } from 'react'
import { cn } from '@/lib/responsive'

// Controlled component props - if value is provided, onChange is required
type ControlledProps = {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

// Uncontrolled component props - neither value nor onChange
type UncontrolledProps = {
  value?: never
  onChange?: never
}

interface BaseAuthInputProps {
  type?: 'email' | 'password' | 'text'
  placeholder?: string
  className?: string
  required?: boolean
  disabled?: boolean
  error?: string
}

type AuthInputProps = BaseAuthInputProps & (ControlledProps | UncontrolledProps)

export const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(({
  type = 'text',
  placeholder,
  value,
  onChange,
  className = '',
  required = false,
  disabled = false,
  error,
  ...props
}, ref) => {
  // Runtime check for proper controlled component usage
  if (process.env.NODE_ENV === 'development') {
    if (value !== undefined && !onChange) {
      console.error(
        'AuthInput: You provided a `value` prop without an `onChange` handler. ' +
        'This will render a read-only field. If you want a controlled component, ' +
        'provide both `value` and `onChange`. If you want an uncontrolled component, ' +
        'remove the `value` prop and use `defaultValue` instead.'
      )
    }
  }

  return (
    <div className="w-full">
      <input
        ref={ref}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className={cn(
          // Base styling
          'w-full px-4 py-3 h-12 text-base rounded-standard',
          'md:px-6 md:py-4 md:h-14 md:text-base-large',
          'lg:px-8 lg:py-5 lg:h-16 lg:text-h3',
          
          // Colors and effects
          'bg-white/10 backdrop-blur-sm',
          'border border-white/20',
          'text-primary placeholder:text-white/60',
          
          // Focus states
          'focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-white/40',
          'focus:bg-white/15',
          
          // Transitions
          'transition-all duration-200 ease-in-out',
          
          // Disabled state
          disabled && 'opacity-50 cursor-not-allowed',
          
          // Error state
          error && 'border-red-400 ring-2 ring-red-400/20',
          
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-2 text-sm md:text-base text-red-300 animate-pulse">
          {error}
        </p>
      )}
    </div>
  )
})

AuthInput.displayName = 'AuthInput' 