import React from 'react'
import { cn } from '../responsive.utils'
import { useResponsive } from '../useResponsive'

type GridColCount = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

interface ResponsiveGridProps {
  children: React.ReactNode
  cols?: {
    mobile?: GridColCount
    tablet?: GridColCount
    desktop?: GridColCount
    xl?: GridColCount
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

// Deterministic mapping to prevent Tailwind purging issues
const gridColsClasses = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-6',
  7: 'grid-cols-7',
  8: 'grid-cols-8',
  9: 'grid-cols-9',
  10: 'grid-cols-10',
  11: 'grid-cols-11',
  12: 'grid-cols-12'
} as const

export const ResponsiveGrid: React.FC<ResponsiveGridProps> = ({
  children,
  cols = { mobile: 1, tablet: 2, desktop: 3, xl: 4 },
  gap = 'md',
  className = ''
}) => {
  const { device } = useResponsive()
  
  const getGridCols = () => {
    const colCount = cols[device] || cols.desktop || cols.tablet || cols.mobile || 1
    return gridColsClasses[colCount] || 'grid-cols-1'
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