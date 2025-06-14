import React from 'react'
import { cn } from '../responsive.utils'

interface ResponsiveTextProps {
  children: React.ReactNode
  variant?: 'title' | 'h1' | 'h2' | 'h3' | 'body' | 'small'
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div'
  weight?: 'light' | 'normal' | 'medium' | 'bold' | 'extrabold'
  color?: string
}

const variantClasses = {
  title: 'text-3xl md:text-4xl lg:text-5xl xl:text-6xl',
  h1: 'text-2xl md:text-3xl lg:text-4xl xl:text-5xl',
  h2: 'text-xl md:text-2xl lg:text-3xl xl:text-4xl',
  h3: 'text-lg md:text-xl lg:text-2xl xl:text-3xl',
  body: 'text-sm md:text-base lg:text-lg xl:text-xl',
  small: 'text-xs md:text-sm lg:text-base xl:text-lg'
}

export const ResponsiveText: React.FC<ResponsiveTextProps> = ({
  children,
  variant = 'body',
  className = '',
  as: Component = 'p',
  weight = 'normal',
  color = 'text-primary'
}) => {
  const weightClasses = {
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    bold: 'font-bold',
    extrabold: 'font-extrabold'
  }

  const combinedClasses = cn(
    variantClasses[variant],
    weightClasses[weight],
    color,
    className
  )

  return (
    <Component className={combinedClasses}>
      {children}
    </Component>
  )
}