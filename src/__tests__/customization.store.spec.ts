import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useCustomizationStore } from '@/stores/customization'

describe('customization store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
  })

  it('initializes with default values', () => {
    const store = useCustomizationStore()

    expect(store.global.backgroundColor).toBe('#ffffff')
    expect(store.global.textColor).toBe('#000000')
    expect(store.global.fontFamily).toBe('system-ui, -apple-system, sans-serif')
    expect(store.enableElementSpecific).toBe(false)
    expect(store.elements.header).toEqual({})
    expect(store.elements.body).toEqual({})
    expect(store.elements.footer).toEqual({})
  })

  it('persists changes to localStorage', async () => {
    const store = useCustomizationStore()

    store.global.backgroundColor = '#ff0000'
    store.global.textColor = '#00ff00'

    // Wait for watcher to fire
    await new Promise((resolve) => setTimeout(resolve, 10))

    const stored = JSON.parse(localStorage.getItem('article-customization') || '{}')
    expect(stored.global.backgroundColor).toBe('#ff0000')
    expect(stored.global.textColor).toBe('#00ff00')
  })

  it('loads state from localStorage', () => {
    const initialState = {
      global: {
        backgroundColor: '#123456',
        textColor: '#654321',
        fontFamily: 'Arial, sans-serif',
      },
      elements: {
        header: { backgroundColor: '#aabbcc' },
        body: {},
        footer: { textColor: '#ddeeff' },
      },
      enableElementSpecific: true,
    }

    localStorage.setItem('article-customization', JSON.stringify(initialState))

    const store = useCustomizationStore()

    expect(store.global.backgroundColor).toBe('#123456')
    expect(store.global.textColor).toBe('#654321')
    expect(store.global.fontFamily).toBe('Arial, sans-serif')
    expect(store.enableElementSpecific).toBe(true)
    expect(store.elements.header.backgroundColor).toBe('#aabbcc')
    expect(store.elements.footer.textColor).toBe('#ddeeff')
  })

  it('resets global styles', () => {
    const store = useCustomizationStore()

    store.global.backgroundColor = '#ff0000'
    store.global.textColor = '#00ff00'
    store.global.fontFamily = 'Arial, sans-serif'

    store.resetGlobalStyles()

    expect(store.global.backgroundColor).toBe('#ffffff')
    expect(store.global.textColor).toBe('#000000')
    expect(store.global.fontFamily).toBe('system-ui, -apple-system, sans-serif')
  })

  it('resets element styles', () => {
    const store = useCustomizationStore()

    store.elements.header.backgroundColor = '#ff0000'
    store.elements.body.textColor = '#00ff00'

    store.resetElementStyles()

    expect(store.elements.header).toEqual({})
    expect(store.elements.body).toEqual({})
    expect(store.elements.footer).toEqual({})
  })

  it('resets all settings', () => {
    const store = useCustomizationStore()

    store.global.backgroundColor = '#ff0000'
    store.elements.header.textColor = '#00ff00'
    store.enableElementSpecific = true

    store.resetAll()

    expect(store.global.backgroundColor).toBe('#ffffff')
    expect(store.elements.header).toEqual({})
    expect(store.enableElementSpecific).toBe(false)
  })

  it('handles element-specific style priority correctly', () => {
    const store = useCustomizationStore()

    store.global.backgroundColor = '#ffffff'
    store.elements.header.backgroundColor = '#000000'
    store.enableElementSpecific = true

    expect(store.global.backgroundColor).toBe('#ffffff')
    expect(store.elements.header.backgroundColor).toBe('#000000')
  })

  it('applies theme correctly', () => {
    const store = useCustomizationStore()

    const testTheme = {
      id: 'test',
      name: 'Test Theme',
      styles: {
        backgroundColor: '#123456',
        textColor: '#abcdef',
        fontFamily: 'Arial, sans-serif',
        fontSize: 'base' as const,
      },
    }

    store.applyTheme(testTheme)

    expect(store.global.backgroundColor).toBe('#123456')
    expect(store.global.textColor).toBe('#abcdef')
    expect(store.global.fontFamily).toBe('Arial, sans-serif')
  })

  it('theme does not affect element-specific settings', () => {
    const store = useCustomizationStore()

    store.elements.header.backgroundColor = '#ff0000'
    store.enableElementSpecific = true

    const testTheme = {
      id: 'test',
      name: 'Test Theme',
      styles: {
        backgroundColor: '#000000',
        textColor: '#ffffff',
        fontFamily: 'Georgia, serif',
        fontSize: 'base' as const,
      },
    }

    store.applyTheme(testTheme)

    expect(store.elements.header.backgroundColor).toBe('#ff0000')
    expect(store.enableElementSpecific).toBe(true)
  })
})
