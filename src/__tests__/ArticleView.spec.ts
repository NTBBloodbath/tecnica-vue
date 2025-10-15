import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import ArticleView from '@/components/ArticleView.vue'
import type { Article } from '@/types/article'
import { useCustomizationStore } from '@/stores/customization'

const mockArticle: Article = {
  header: {
    title: 'Test Article',
    subtitle: 'Test Subtitle',
  },
  body: {
    sections: [
      {
        title: 'Section 1',
        content: 'Content 1',
      },
      {
        title: 'Section 2',
        content: 'Content 2',
      },
    ],
  },
  footer: {
    author: 'Test Author',
    date: '2025-01-01',
    tags: ['tag1', 'tag2'],
  },
}

describe('ArticleView', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders article content correctly', () => {
    const wrapper = mount(ArticleView, {
      props: { article: mockArticle },
    })

    expect(wrapper.text()).toContain('Test Article')
    expect(wrapper.text()).toContain('Test Subtitle')
    expect(wrapper.text()).toContain('Section 1')
    expect(wrapper.text()).toContain('Content 1')
    expect(wrapper.text()).toContain('Section 2')
    expect(wrapper.text()).toContain('Content 2')
    expect(wrapper.text()).toContain('Test Author')
    expect(wrapper.text()).toContain('2025-01-01')
    expect(wrapper.text()).toContain('tag1')
    expect(wrapper.text()).toContain('tag2')
  })

  it('applies global styles correctly', () => {
    const wrapper = mount(ArticleView, {
      props: { article: mockArticle },
    })
    const store = useCustomizationStore()

    store.global.backgroundColor = '#ff0000'
    store.global.textColor = '#00ff00'
    store.global.fontFamily = 'Arial, sans-serif'

    // Need to wait for reactivity
    wrapper.vm.$nextTick(() => {
      const header = wrapper.find('header')
      expect(header.attributes('style')).toContain('background-color: rgb(255, 0, 0)')
      expect(header.attributes('style')).toContain('color: rgb(0, 255, 0)')
      expect(header.attributes('style')).toContain('font-family: Arial, sans-serif')
    })
  })

  it('applies element-specific styles when enabled', () => {
    const wrapper = mount(ArticleView, {
      props: { article: mockArticle },
    })
    const store = useCustomizationStore()

    store.global.backgroundColor = '#ffffff'
    store.elements.header.backgroundColor = '#000000'
    store.enableElementSpecific = true

    wrapper.vm.$nextTick(() => {
      const header = wrapper.find('header')
      expect(header.attributes('style')).toContain('background-color: rgb(0, 0, 0)')
    })
  })

  it('prioritizes element-specific over global styles', () => {
    const wrapper = mount(ArticleView, {
      props: { article: mockArticle },
    })
    const store = useCustomizationStore()

    store.global.backgroundColor = '#ffffff'
    store.global.textColor = '#000000'
    store.elements.header.backgroundColor = '#ff0000'
    store.enableElementSpecific = true

    wrapper.vm.$nextTick(() => {
      const header = wrapper.find('header')
      // Element-specific background should override global
      expect(header.attributes('style')).toContain('background-color: rgb(255, 0, 0)')
      // Global text color should still apply (no element-specific override)
      expect(header.attributes('style')).toContain('color: rgb(0, 0, 0)')
    })
  })

  it('renders without subtitle when not provided', () => {
    const articleWithoutSubtitle: Article = {
      ...mockArticle,
      header: { title: 'Test' },
    }

    const wrapper = mount(ArticleView, {
      props: { article: articleWithoutSubtitle },
    })

    expect(wrapper.text()).toContain('Test')
    expect(wrapper.text()).not.toContain('Test Subtitle')
  })

  it('renders without tags when not provided', () => {
    const articleWithoutTags: Article = {
      ...mockArticle,
      footer: { author: 'Test Author', date: '2025-01-01' },
    }

    const wrapper = mount(ArticleView, {
      props: { article: articleWithoutTags },
    })

    expect(wrapper.find('.rounded-full').exists()).toBe(false)
  })
})
