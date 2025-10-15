import type { GlobalStyles } from './customization'

/**
 * Represents a predefined theme with a unique identifier and style settings
 */
export interface Theme {
  id: string
  name: string
  styles: GlobalStyles
}

/**
 * Predefined themes for quick style selection
 */
export const themes: Theme[] = [
  {
    id: 'default',
    name: 'Default',
    styles: {
      backgroundColor: '#ffffff',
      textColor: '#000000',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      fontSize: 'base',
    },
  },
  {
    id: 'dark',
    name: 'Dark',
    styles: {
      backgroundColor: '#1a1a1a',
      textColor: '#e5e5e5',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      fontSize: 'base',
    },
  },
  {
    id: 'sepia',
    name: 'Sepia',
    styles: {
      backgroundColor: '#f4ecd8',
      textColor: '#5c4a3a',
      fontFamily: 'Georgia, serif',
      fontSize: 'base',
    },
  },
  {
    id: 'ocean',
    name: 'Ocean',
    styles: {
      backgroundColor: '#e0f2f7',
      textColor: '#00695c',
      fontFamily: 'Verdana, sans-serif',
      fontSize: 'base',
    },
  },
  {
    id: 'noir',
    name: 'Noir',
    styles: {
      backgroundColor: '#0a0a0a',
      textColor: '#f5f5f5',
      fontFamily: '"Courier New", monospace',
      fontSize: 'base',
    },
  },
  {
    id: 'minimal',
    name: 'Minimal',
    styles: {
      backgroundColor: '#fafafa',
      textColor: '#333333',
      fontFamily: 'Helvetica, sans-serif',
      fontSize: 'base',
    },
  },
]
