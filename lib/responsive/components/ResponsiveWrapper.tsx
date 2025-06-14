import React from 'react'
import { cn } from '../responsive.utils'

interface ResponsiveWrapperProps {
  children: React.ReactNode
  padding?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  margin?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  as?: React.ElementType
}

const paddingClasses = {
  xs: 'p-1 md:p-2 lg:p-2 xl:p-3',
  sm: 'p-2 md:p-3 lg:p-4 xl:p-5',
  md: 'p-4 md:p-6 lg:p-8 xl:p-10',
  lg: 'p-6 md:p-8 lg:p-12 xl:p-16',
  xl: 'p-8 md:p-12 lg:p-16 xl:p-20'
}

const marginClasses = {
  xs: 'm-1 md:m-2 lg:m-2 xl:m-3',
  sm: 'm-2 md:m-3 lg:m-4 xl:m-5',
  md: 'm-4 md:m-6 lg:m-8 xl:m-10',
  lg: 'm-6 md:m-8 lg:m-12 xl:m-16',
  xl: 'm-8 md:m-12 lg:m-16 xl:m-20'
}

export const ResponsiveWrapper: React.FC<ResponsiveWrapperProps> = ({
  children,
  padding = 'md',
  margin,
  className = '',
  as: Component = 'div'
}) => {
  const combinedClasses = cn(
    paddingClasses[padding],
    margin ? marginClasses[margin] : '',
    className
  )

  return (
    <Component className={combinedClasses}>
      {children}
    </Component>
  )
}
