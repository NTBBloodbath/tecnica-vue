import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useStyleCustomization } from '@/composables/useStyleCustomization'
import { useCustomizationStore } from '@/stores/customization'

describe('useStyleCustomization', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
  })

  it('returns global styles when element-specific is disabled', () => {
    const store = useCustomizationStore()
    store.global.backgroundColor = '#ffffff'
    store.global.textColor = '#000000'
    store.global.fontFamily = 'Arial, sans-serif'
    store.enableElementSpecific = false

    const { resolvedStyles } = useStyleCustomization('header')

    expect(resolvedStyles.value.backgroundColor).toBe('#ffffff')
    expect(resolvedStyles.value.textColor).toBe('#000000')
    expect(resolvedStyles.value.fontFamily).toBe('Arial, sans-serif')
  })

  it('returns element-specific styles when enabled and defined', () => {
    const store = useCustomizationStore()
    store.global.backgroundColor = '#ffffff'
    store.global.textColor = '#000000'
    store.global.fontFamily = 'Arial, sans-serif'
    store.elements.header.backgroundColor = '#ff0000'
    store.elements.header.textColor = '#00ff00'
    store.enableElementSpecific = true

    const { resolvedStyles } = useStyleCustomization('header')

    expect(resolvedStyles.value.backgroundColor).toBe('#ff0000')
    expect(resolvedStyles.value.textColor).toBe('#00ff00')
    expect(resolvedStyles.value.fontFamily).toBe('Arial, sans-serif')
  })

  it('falls back to global when element-specific is enabled but not defined', () => {
    const store = useCustomizationStore()
    store.resetAll() // Clear any persisted state
    store.global.backgroundColor = '#ffffff'
    store.global.textColor = '#000000'
    store.enableElementSpecific = true

    const { resolvedStyles } = useStyleCustomization('header')

    expect(resolvedStyles.value.backgroundColor).toBe('#ffffff')
    expect(resolvedStyles.value.textColor).toBe('#000000')
  })

  it('prioritizes element-specific over global for specific properties', () => {
    const store = useCustomizationStore()
    store.global.backgroundColor = '#ffffff'
    store.global.textColor = '#000000'
    store.global.fontFamily = 'Arial, sans-serif'
    store.elements.body.backgroundColor = '#123456'
    store.enableElementSpecific = true

    const { resolvedStyles } = useStyleCustomization('body')

    expect(resolvedStyles.value.backgroundColor).toBe('#123456')
    expect(resolvedStyles.value.textColor).toBe('#000000')
    expect(resolvedStyles.value.fontFamily).toBe('Arial, sans-serif')
  })

  it('returns correct style object format', () => {
    const store = useCustomizationStore()
    store.global.backgroundColor = '#abcdef'
    store.global.textColor = '#123456'
    store.global.fontFamily = 'Georgia, serif'

    const { styleObject } = useStyleCustomization('footer')

    expect(styleObject.value).toEqual({
      backgroundColor: '#abcdef',
      color: '#123456',
      fontFamily: 'Georgia, serif',
    })
  })

  it('works correctly for different element types', () => {
    const store = useCustomizationStore()
    store.global.backgroundColor = '#ffffff'
    store.elements.header.backgroundColor = '#ff0000'
    store.elements.body.backgroundColor = '#00ff00'
    store.elements.footer.backgroundColor = '#0000ff'
    store.enableElementSpecific = true

    const header = useStyleCustomization('header')
    const body = useStyleCustomization('body')
    const footer = useStyleCustomization('footer')

    expect(header.resolvedStyles.value.backgroundColor).toBe('#ff0000')
    expect(body.resolvedStyles.value.backgroundColor).toBe('#00ff00')
    expect(footer.resolvedStyles.value.backgroundColor).toBe('#0000ff')
  })
})
