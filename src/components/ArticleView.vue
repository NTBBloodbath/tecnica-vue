<script setup lang="ts">
/**
 * ArticleView component
 *
 * Renders an article with customizable styling for header, body, and footer
 * Styles are applied reactively based on global and element-specific settings
 */
import { useStyleCustomization } from '@/composables/useStyleCustomization'
import type { Article } from '@/types/article'

interface Props {
  article: Article
}

defineProps<Props>()

const headerStyles = useStyleCustomization('header')
const bodyStyles = useStyleCustomization('body')
const footerStyles = useStyleCustomization('footer')
</script>

<template>
  <article class="max-w-4xl mx-auto">
    <header
      :style="headerStyles.styleObject.value"
      class="p-8 transition-all duration-200 border-b border-gray-300"
    >
      <h1 :class="headerStyles.fontSizeClasses.value.title" class="font-bold mb-2">
        {{ article.header.title }}
      </h1>
      <p
        v-if="article.header.subtitle"
        :class="headerStyles.fontSizeClasses.value.subtitle"
        class="opacity-80"
      >
        {{ article.header.subtitle }}
      </p>
    </header>

    <main :style="bodyStyles.styleObject.value" class="p-8 transition-all duration-200">
      <section
        v-for="(section, index) in article.body.sections"
        :key="index"
        class="mb-6 last:mb-0"
      >
        <h2 :class="bodyStyles.fontSizeClasses.value.heading" class="font-semibold mb-3">
          {{ section.title }}
        </h2>
        <p
          :class="bodyStyles.fontSizeClasses.value.paragraph"
          class="leading-relaxed whitespace-pre-line"
        >
          {{ section.content }}
        </p>
      </section>
    </main>

    <footer
      :style="footerStyles.styleObject.value"
      class="p-8 transition-all duration-200 border-t border-gray-300"
    >
      <div class="flex flex-wrap gap-4 items-center justify-between">
        <div>
          <p :class="footerStyles.fontSizeClasses.value.author" class="font-medium">
            {{ article.footer.author }}
          </p>
          <p :class="footerStyles.fontSizeClasses.value.date" class="opacity-70">
            {{ article.footer.date }}
          </p>
        </div>
        <div
          v-if="article.footer.tags && article.footer.tags.length > 0"
          class="flex gap-2 flex-wrap"
        >
          <span
            v-for="tag in article.footer.tags"
            :key="tag"
            :class="footerStyles.fontSizeClasses.value.tag"
            class="px-3 py-1 rounded-full bg-black/10"
          >
            {{ tag }}
          </span>
        </div>
      </div>
    </footer>
  </article>
</template>
