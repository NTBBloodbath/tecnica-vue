import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import App from '../App.vue'

describe('App', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders article view and personalization panel', () => {
    const wrapper = mount(App)
    expect(wrapper.text()).toContain('El Futuro del Desarrollo Web')
    expect(wrapper.text()).toContain('Personalization')
  })

  it('integrates ArticleView with PersonalizationPanel', () => {
    const wrapper = mount(App)

    const article = wrapper.findComponent({ name: 'ArticleView' })
    const panel = wrapper.findComponent({ name: 'PersonalizationPanel' })

    expect(article.exists()).toBe(true)
    expect(panel.exists()).toBe(true)
  })
})
