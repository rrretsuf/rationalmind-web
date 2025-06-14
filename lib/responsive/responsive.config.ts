export interface ResponsiveConfig {
    breakpoints: {
      mobile: number
      tablet: number
      desktop: number
      xl: number
    }
}

export const RESPONSIVE_CONFIG: ResponsiveConfig = {
  breakpoints: {
    mobile: 768,
    tablet: 1024,
    desktop: 1440,
    xl: 1920
  }
}