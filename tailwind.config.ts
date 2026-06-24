import type { Config } from 'tailwindcss'

export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#c9a84c',
          light: '#e0c878',
          dark: '#a07830',
          muted: '#7a6030',
        },
        parchment: '#e8e0d0',
        ink: '#ccc',
        'bg-base': '#0f0f0f',
        'bg-elevated': '#1a1a1a',
        'bg-hover': '#252525',
        'bg-active': '#2a2010',
        'border-subtle': '#2a2a2a',
        'border-mid': '#333',
        muted: '#666',
        dimmed: '#aaa',
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', '"Times New Roman"', 'serif'],
        sans: ['system-ui', '-apple-system', 'sans-serif'],
        mono: ['ui-monospace', 'Menlo', 'Monaco', 'monospace'],
      },
      fontSize: {
        '2xs': ['10px', { lineHeight: '1.4' }],
        xs: ['11px', { lineHeight: '1.5' }],
        sm: ['13px', { lineHeight: '1.5' }],
        base: ['15px', { lineHeight: '1.75' }],
        lg: ['18px', { lineHeight: '1.6' }],
        xl: ['22px', { lineHeight: '1.4' }],
        '2xl': ['28px', { lineHeight: '1.3' }],
        '3xl': ['36px', { lineHeight: '1.2' }],
      },
    },
  },
  plugins: [],
} satisfies Config
