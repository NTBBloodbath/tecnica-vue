import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import PersonalizationPanel from '@/components/PersonalizationPanel.vue'
import { useCustomizationStore } from '@/stores/customization'

describe('PersonalizationPanel', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders panel with global styles section', () => {
    const wrapper = mount(PersonalizationPanel)

    expect(wrapper.text()).toContain('Personalization')
    expect(wrapper.text()).toContain('Global Styles')
    expect(wrapper.text()).toContain('Background')
    expect(wrapper.text()).toContain('Text Color')
    expect(wrapper.text()).toContain('Font Family')
  })

  it('toggles panel visibility', async () => {
    const wrapper = mount(PersonalizationPanel)

    const aside = wrapper.find('aside')
    expect(aside.classes()).toContain('translate-x-full')

    const toggleButton = wrapper.findAll('button[aria-label="Open panel"]')[0]
    expect(toggleButton).toBeDefined()
    await toggleButton?.trigger('click')

    expect(aside.classes()).not.toContain('translate-x-full')
  })

  it('updates global background color', async () => {
    const wrapper = mount(PersonalizationPanel)
    const store = useCustomizationStore()

    const input = wrapper.find('#global-bg')
    await input.setValue('#123456')

    expect(store.global.backgroundColor).toBe('#123456')
  })

  it('updates global text color', async () => {
    const wrapper = mount(PersonalizationPanel)
    const store = useCustomizationStore()

    const input = wrapper.find('#global-text')
    await input.setValue('#654321')

    expect(store.global.textColor).toBe('#654321')
  })

  it('updates global font family', async () => {
    const wrapper = mount(PersonalizationPanel)
    const store = useCustomizationStore()

    const select = wrapper.find('#global-font')
    await select.setValue('Arial, sans-serif')

    expect(store.global.fontFamily).toBe('Arial, sans-serif')
  })

  it('shows element-specific controls when checkbox is checked', async () => {
    const wrapper = mount(PersonalizationPanel)

    expect(wrapper.text()).not.toContain('Header')

    const checkbox = wrapper.find('input[type="checkbox"]')
    await checkbox.setValue(true)

    expect(wrapper.text()).toContain('Header')
    expect(wrapper.text()).toContain('Body')
    expect(wrapper.text()).toContain('Footer')
  })

  it('resets global styles when reset button is clicked', async () => {
    const wrapper = mount(PersonalizationPanel)
    const store = useCustomizationStore()

    store.global.backgroundColor = '#ff0000'
    store.global.textColor = '#00ff00'

    const resetButtons = wrapper.findAll('button')
    const resetGlobalButton = resetButtons.find((btn) => btn.text() === 'Reset')
    await resetGlobalButton?.trigger('click')

    expect(store.global.backgroundColor).toBe('#ffffff')
    expect(store.global.textColor).toBe('#000000')
  })

  it('resets all settings when reset all button is clicked', async () => {
    const wrapper = mount(PersonalizationPanel)
    const store = useCustomizationStore()

    store.global.backgroundColor = '#ff0000'
    store.elements.header.textColor = '#00ff00'
    store.enableElementSpecific = true

    const resetAllButton = wrapper.find('button.bg-gradient-to-r')
    await resetAllButton.trigger('click')

    expect(store.global.backgroundColor).toBe('#ffffff')
    expect(store.elements.header).toEqual({})
    expect(store.enableElementSpecific).toBe(false)
  })

  it('updates element-specific styles', async () => {
    const wrapper = mount(PersonalizationPanel)
    const store = useCustomizationStore()

    const checkbox = wrapper.find('input[type="checkbox"]')
    await checkbox.setValue(true)

    await wrapper.vm.$nextTick()

    const headerBgInput = wrapper.find('#header-bg')
    await headerBgInput.setValue('#aabbcc')

    expect(store.elements.header.backgroundColor).toBe('#aabbcc')
  })
})
