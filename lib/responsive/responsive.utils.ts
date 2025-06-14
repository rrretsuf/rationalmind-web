import { RESPONSIVE_CONFIG } from './responsive.config'
import { DeviceType } from './useResponsive'

// Get device type from width
export const getDeviceType = (width: number): DeviceType => {
  if (width < RESPONSIVE_CONFIG.breakpoints.mobile) return 'mobile'
  if (width < RESPONSIVE_CONFIG.breakpoints.tablet) return 'tablet'  
  if (width < RESPONSIVE_CONFIG.breakpoints.desktop) return 'desktop'
  return 'xl'
}

// Combine CSS classes utility
export const cn = (...classes: (string | undefined | null | false)[]): string => {
  return classes
    .filter(Boolean)
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim()
}