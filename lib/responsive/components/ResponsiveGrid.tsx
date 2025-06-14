import React from 'react'
import { cn } from '../responsive.utils'
import { useResponsive } from '../useResponsive'

interface ResponsiveGridProps {
  children: React.ReactNode
  cols?: {
    mobile?: number
    tablet?: number
    desktop?: number
    xl?: number
  }
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const gapClasses = {
  xs: 'gap-2',
  sm: 'gap-4',
  md: 'gap-6',
  lg: 'gap-8',
  xl: 'gap-12'
}

export const ResponsiveGrid: React.FC<ResponsiveGridProps> = ({
  children,
  cols = { mobile: 1, tablet: 2, desktop: 3, xl: 4 },
  gap = 'md',
  className = ''
}) => {
  const { device } = useResponsive()
  
  const getGridCols = () => {
    const colCount = cols[device] || cols.desktop || cols.tablet || cols.mobile || 1
    return `grid-cols-${colCount}`
  }
  
  const combinedClasses = cn(
    'grid',
    getGridCols(),
    gapClasses[gap],
    className
  )

  return (
    <div className={combinedClasses}>
      {children}
    </div>
  )
}