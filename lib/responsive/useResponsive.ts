'use client'

import { useState, useEffect } from 'react'
import { RESPONSIVE_CONFIG } from './responsive.config'
import { getDeviceType } from './responsive.utils'

export type DeviceType = 'mobile' | 'tablet' | 'desktop' | 'xl'

export interface UseResponsiveReturn {
  device: DeviceType
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  isXL: boolean
  width: number
  height: number
}

export const useResponsive = (): UseResponsiveReturn => {
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  })

  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    const handleResize = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight
        })
      }, 150) // Debounce resizes
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(timeoutId)
    }
  }, [])

  const device = getDeviceType(dimensions.width)

  return {
    device,
    isMobile: device === 'mobile',
    isTablet: device === 'tablet',
    isDesktop: device === 'desktop',
    isXL: device === 'xl',
    width: dimensions.width,
    height: dimensions.height
  }
}