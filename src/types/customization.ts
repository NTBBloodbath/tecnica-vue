/**
 * Article element types that can be customized
 */
export type ElementType = 'header' | 'body' | 'footer'

/**
 * Font size options based off Tailwind's scale
 */
export type FontSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl'

/**
 * Global style settings applied to all elements
 */
export interface GlobalStyles {
  backgroundColor: string
  textColor: string
  fontFamily: string
  fontSize: FontSize
}

/**
 * Optional style overrides for a specific element
 * Any undefined property falls back to global styles
 */
export interface ElementStyles {
  backgroundColor?: string
  textColor?: string
  fontFamily?: string
  fontSize?: FontSize
}

/**
 * Collection of element-specific style overrides
 */
export interface ElementCustomization {
  header: ElementStyles
  body: ElementStyles
  footer: ElementStyles
}

/**
 * Complete customization state
 */
export interface CustomizationState {
  global: GlobalStyles
  elements: ElementCustomization
  enableElementSpecific: boolean
}

/**
 * Resolved styles for an element after applying priority logic
 */
export interface ResolvedStyles {
  backgroundColor: string
  textColor: string
  fontFamily: string
  fontSize: FontSize
}
