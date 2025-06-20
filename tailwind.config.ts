import type { Config } from "tailwindcss";

const config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    // ResponsiveGrid component classes
    'grid-cols-1',
    'grid-cols-2', 
    'grid-cols-3',
    'grid-cols-4',
    'grid-cols-5',
    'grid-cols-6',
    'grid-cols-7',
    'grid-cols-8',
    'grid-cols-9',
    'grid-cols-10',
    'grid-cols-11',
    'grid-cols-12',
    // Gap classes used by ResponsiveGrid
    'gap-2',
    'gap-4',
    'gap-6', 
    'gap-8',
    'gap-12'
  ] as string[],
  theme: {
    // Custom breakpoints synchronized with responsive system
    screens: {
      'md': '768px',   // Tablet
      'lg': '1024px',  // Desktop  
      'xl': '1440px',  // Large desktop
      '2xl': '1920px', // Extra large
    },
    extend: {
      colors: {
        // Core Semantic Colors
        'primary': '#FFFFFF',
        'secondary': 'rgba(255, 255, 255, 0.7)',
        'placeholder': '#7784A5',
        'placeholder-light': '#A0AEC0',
  
        // Backgrounds
        'component-bg': 'rgba(30, 47, 80, 0.35)',
        'input-bg': '#18274D',
  
        // Borders
        'component-border': 'rgba(255, 255, 255, 0.1)',
        'input-border': '#495C8A',
        'profile-card-border': '#5E6E97',
  
        // Component-Specific Colors
        'button-secondary-bg': 'rgba(255, 255, 255, 0.2)',
        'settings-btn-bg': 'rgba(61, 79, 126, 0.5)',
        'logout-btn-bg': 'rgba(222, 18, 18, 0.5)',
        'profile-placeholder': '#6E7B9D',
      },
      fontSize: {
        'title': ['56px', { lineHeight: '64px' }],
        'h1': ['36px', { lineHeight: '40px' }],
        'h2': ['28px', { lineHeight: '32px' }],
        'h3': ['22px', { lineHeight: '30px' }],
        'base-large': ['20px', { lineHeight: '28px' }],
        'base': ['18px', { lineHeight: '24px' }],
        'base-small': ['16px', { lineHeight: '20px' }],
        'sm': ['14px', { lineHeight: '20px' }],
      },
      fontWeight: {
        'light': '300',
        'regular': '400',
        'medium': '500',
        'bold': '600',
        'extra-bold': '700',
      },
      borderRadius: {
        'standard': '12px',
      },
      boxShadow: {
        'auth-button': '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
        'start-session-glow': '0 0 15px 5px rgba(52, 152, 219, 0.35)',
      },
    },
  },
  plugins: [],
};

export default config satisfies Config; 