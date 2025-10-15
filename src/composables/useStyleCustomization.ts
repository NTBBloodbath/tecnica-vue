import { computed, type ComputedRef } from 'vue'
import type { ElementType, ResolvedStyles, FontSize } from '@/types/customization'
import { useCustomizationStore } from '@/stores/customization'

/**
 * Font size scale configurations for different element types
 * Each size modifier adjusts all text elements proportionally
 */
const headerFontSizeClasses: Record<FontSize, { title: string; subtitle: string }> = {
  xs: { title: 'text-lg', subtitle: 'text-sm' },
  sm: { title: 'text-xl', subtitle: 'text-base' },
  base: { title: 'text-2xl', subtitle: 'text-lg' },
  lg: { title: 'text-3xl', subtitle: 'text-xl' },
  xl: { title: 'text-4xl', subtitle: 'text-2xl' },
}

const bodyFontSizeClasses: Record<FontSize, { heading: string; paragraph: string }> = {
  xs: { heading: 'text-sm', paragraph: 'text-xs' },
  sm: { heading: 'text-base', paragraph: 'text-sm' },
  base: { heading: 'text-xl', paragraph: 'text-base' },
  lg: { heading: 'text-2xl', paragraph: 'text-lg' },
  xl: { heading: 'text-3xl', paragraph: 'text-xl' },
}

const footerFontSizeClasses: Record<FontSize, { author: string; date: string; tag: string }> = {
  xs: { author: 'text-xs', date: 'text-[10px]', tag: 'text-[10px]' },
  sm: { author: 'text-sm', date: 'text-xs', tag: 'text-xs' },
  base: { author: 'text-base', date: 'text-sm', tag: 'text-sm' },
  lg: { author: 'text-lg', date: 'text-base', tag: 'text-base' },
  xl: { author: 'text-xl', date: 'text-lg', tag: 'text-lg' },
}

type HeaderFontSizeClasses = { title: string; subtitle: string }
type BodyFontSizeClasses = { heading: string; paragraph: string }
type FooterFontSizeClasses = { author: string; date: string; tag: string }

interface StyleCustomizationReturn<T> {
  resolvedStyles: ComputedRef<ResolvedStyles>
  styleObject: ComputedRef<{
    backgroundColor: string
    color: string
    fontFamily: string
  }>
  fontSizeClasses: ComputedRef<T>
}

/**
 * Composable for resolving styles for a specific article element
 *
 * Implements priority logic:
 * 1. If element-specific customization is enabled and a value is set, use it
 * 2. Otherwise, fall back to global styles
 *
 * @param elementType The type of element (header, body, or footer)
 * @returns Reactive style objects and resolved style values
 *
 * @example
 * ```vue
 * <script setup>
 * const headerStyles = useStyleCustomization('header')
 * </script>
 *
 * <template>
 *   <header :style="headerStyles.styleObject.value">
 *     <h1 :class="headerStyles.fontSizeClasses.value.title">Title</h1>
 *   </header>
 * </template>
 * ```
 */
export function useStyleCustomization(
  elementType: 'header',
): StyleCustomizationReturn<HeaderFontSizeClasses>
export function useStyleCustomization(
  elementType: 'body',
): StyleCustomizationReturn<BodyFontSizeClasses>
export function useStyleCustomization(
  elementType: 'footer',
): StyleCustomizationReturn<FooterFontSizeClasses>
export function useStyleCustomization(
  elementType: ElementType,
):
  | StyleCustomizationReturn<HeaderFontSizeClasses>
  | StyleCustomizationReturn<BodyFontSizeClasses>
  | StyleCustomizationReturn<FooterFontSizeClasses> {
  const store = useCustomizationStore()

  const resolvedStyles = computed<ResolvedStyles>(() => {
    const global = store.global
    const elementSpecific = store.elements[elementType]
    const useSpecific = store.enableElementSpecific

    return {
      backgroundColor: (useSpecific && elementSpecific.backgroundColor) || global.backgroundColor,
      textColor: (useSpecific && elementSpecific.textColor) || global.textColor,
      fontFamily: (useSpecific && elementSpecific.fontFamily) || global.fontFamily,
      fontSize: (useSpecific && elementSpecific.fontSize) || global.fontSize,
    }
  })

  const styleObject = computed(() => ({
    backgroundColor: resolvedStyles.value.backgroundColor,
    color: resolvedStyles.value.textColor,
    fontFamily: resolvedStyles.value.fontFamily,
  }))

  if (elementType === 'header') {
    const fontSizeClasses = computed(() => headerFontSizeClasses[resolvedStyles.value.fontSize])
    return {
      resolvedStyles,
      styleObject,
      fontSizeClasses,
    }
  } else if (elementType === 'body') {
    const fontSizeClasses = computed(() => bodyFontSizeClasses[resolvedStyles.value.fontSize])
    return {
      resolvedStyles,
      styleObject,
      fontSizeClasses,
    }
  } else {
    const fontSizeClasses = computed(() => footerFontSizeClasses[resolvedStyles.value.fontSize])
    return {
      resolvedStyles,
      styleObject,
      fontSizeClasses,
    }
  }
}
