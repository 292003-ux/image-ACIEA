import localFont from 'next/font/local'

export const inter = localFont({
  src: './inter-latin-wght-normal.woff2',
  variable: '--font-inter',
  weight: '100 900',
  display: 'swap',
  fallback: ['system-ui', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif'],
})

export const sora = localFont({
  src: './sora-latin-wght-normal.woff2',
  variable: '--font-sora',
  weight: '100 800',
  display: 'swap',
  fallback: ['system-ui', 'Segoe UI', 'Arial', 'sans-serif'],
})

export const playfair = localFont({
  src: [
    { path: './playfair-display-latin-wght-normal.woff2', style: 'normal' },
    { path: './playfair-display-latin-wght-italic.woff2', style: 'italic' },
  ],
  variable: '--font-playfair',
  weight: '400 900',
  display: 'swap',
  // Quotes appear below the fold: no preload to keep the critical path light.
  preload: false,
  fallback: ['Georgia', 'Times New Roman', 'serif'],
})
