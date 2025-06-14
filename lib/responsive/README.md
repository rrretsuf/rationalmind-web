# Responsive System - Usage Guide

## Overview
This is a simplified, performance-optimized responsive system that combines the power of Tailwind CSS with strategic centralization for complex scenarios.

## Quick Start

### Basic Usage (95% of cases)
Use Tailwind responsive utilities directly:

```tsx
// Mobile-first button
<button className="
  px-4 py-3 text-sm h-12 rounded-lg
  md:px-6 md:text-base 
  lg:px-8 lg:py-4 lg:h-14 lg:text-lg lg:rounded-xl
  bg-blue-600 hover:bg-blue-700 text-white
">
  Click Me
</button>

// Responsive layout
<div className="
  flex flex-col gap-4 p-4
  md:flex-row md:gap-6 md:p-6
  lg:gap-8 lg:p-8
">
  <div className="flex-1">Content</div>
  <div className="w-full md:w-1/3">Sidebar</div>
</div>
```

### Using Responsive Components

```tsx
import { 
  ResponsiveText, 
  ResponsiveWrapper, 
  ResponsiveGrid,
  useResponsive 
} from '@/lib/responsive'

function MyComponent() {
  const { isMobile } = useResponsive()

  return (
    <ResponsiveWrapper padding="lg">
      <ResponsiveText variant="title" as="h1" weight="bold">
        Welcome to Our App
      </ResponsiveText>
      
      <ResponsiveText variant="body" className="mb-8">
        This text automatically scales across devices
      </ResponsiveText>

      <ResponsiveGrid 
        cols={{ mobile: 1, tablet: 2, desktop: 3 }}
        gap="md"
      >
        <div>Card 1</div>
        <div>Card 2</div>
        <div>Card 3</div>
      </ResponsiveGrid>

      {isMobile ? <MobileMenu /> : <DesktopMenu />}
    </ResponsiveWrapper>
  )
}
```

## Available Components

### ResponsiveText
Typography with semantic scaling:
- `variant`: 'title', 'h1', 'h2', 'h3', 'body', 'small'
- `weight`: 'light', 'regular', 'medium', 'bold', 'extra-bold'
- `as`: HTML element to render

### ResponsiveWrapper
Container with responsive padding/margin:
- `padding`: 'xs', 'sm', 'md', 'lg', 'xl'
- `margin`: 'xs', 'sm', 'md', 'lg', 'xl'

### ResponsiveGrid
Flexible grid system:
- `cols`: Object with breakpoint-specific column counts
- `gap`: 'xs', 'sm', 'md', 'lg', 'xl'

### useResponsive Hook
Device detection for conditional logic:
- `device`: 'mobile', 'tablet', 'desktop', 'xl'
- `isMobile`, `isTablet`, `isDesktop`, `isXL`: boolean flags
- `width`, `height`: current viewport dimensions

## Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1023px  
- Desktop: 1024px - 1439px
- XL: ≥ 1440px

## Best Practices

1. **Mobile-First**: Always design for mobile first, then enhance for larger screens
2. **Use Tailwind**: Prefer responsive utilities over components for simple cases
3. **Conditional Logic**: Use `useResponsive` hook for device-specific behavior
4. **Performance**: Avoid unnecessary re-renders by memoizing expensive computations

## Examples

### Card with Responsive Styling
```tsx
<div className="
  p-4 rounded-lg border border-component-border bg-component-bg
  md:p-6 md:rounded-xl
  lg:p-8 lg:rounded-2xl
  hover:shadow-lg transition-all duration-200
">
  <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-primary">
    Card Title
  </h3>
  <p className="text-sm md:text-base lg:text-lg text-secondary mt-2">
    Card description that scales with screen size
  </p>
</div>
```

### Form Input
```tsx
<input className="
  w-full px-4 py-3 h-12 text-sm rounded-lg
  md:text-base
  lg:px-6 lg:py-4 lg:h-14 lg:text-lg lg:rounded-xl
  border border-input-border bg-input-bg text-primary
  focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
  transition-all duration-200
" />
```

This system provides the perfect balance of simplicity, performance, and flexibility for building responsive web applications. 