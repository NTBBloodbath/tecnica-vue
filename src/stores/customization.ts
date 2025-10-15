import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import type { CustomizationState, GlobalStyles, ElementCustomization } from '@/types/customization'
import type { Theme } from '@/types/themes'

const STORAGE_KEY = 'article-customization'

const defaultGlobalStyles: GlobalStyles = {
  backgroundColor: '#ffffff',
  textColor: '#000000',
  fontFamily: 'system-ui, -apple-system, sans-serif',
  fontSize: 'base',
}

const defaultElementStyles: ElementCustomization = {
  header: {},
  body: {},
  footer: {},
}

/**
 * Loads customization state from localStorage
 * Returns null if no data exists or if parsing fails
 */
function loadFromStorage(): CustomizationState | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : null
  } catch {
    return null
  }
}

/**
 * Persists customization state to localStorage
 * Logs errors to console without throwing
 */
function saveToStorage(state: CustomizationState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch (error) {
    console.error('Failed to save customization to localStorage:', error)
  }
}

/**
 * Pinia store for managing article customization state
 *
 * Handles global and element-specific styling with automatic localStorage persistence.
 * Changes are watched and saved automatically using Vue's reactivity system.
 */
export const useCustomizationStore = defineStore('customization', () => {
  const stored = loadFromStorage()

  const global = ref<GlobalStyles>(stored?.global ?? { ...defaultGlobalStyles })
  const elements = ref<ElementCustomization>(stored?.elements ?? { ...defaultElementStyles })
  const enableElementSpecific = ref<boolean>(stored?.enableElementSpecific ?? false)

  watch(
    [global, elements, enableElementSpecific],
    () => {
      saveToStorage({
        global: global.value,
        elements: elements.value,
        enableElementSpecific: enableElementSpecific.value,
      })
    },
    { deep: true },
  )

  /**
   * Resets global styles to default values
   */
  function resetGlobalStyles() {
    global.value = { ...defaultGlobalStyles }
  }

  /**
   * Clears all element-specific style overrides
   */
  function resetElementStyles() {
    elements.value = {
      header: {},
      body: {},
      footer: {},
    }
  }

  /**
   * Resets all customization settings to defaults
   * Includes global styles, element styles, and element-specific toggle
   */
  function resetAll() {
    resetGlobalStyles()
    resetElementStyles()
    enableElementSpecific.value = false
  }

  /**
   * Applies a predefined theme to global styles
   * Does not affect element-specific overrides
   *
   * @param theme The theme to apply
   */
  function applyTheme(theme: Theme) {
    global.value = { ...theme.styles }
  }

  return {
    global,
    elements,
    enableElementSpecific,
    resetGlobalStyles,
    resetElementStyles,
    resetAll,
    applyTheme,
  }
})
