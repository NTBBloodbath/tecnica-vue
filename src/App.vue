<script setup lang="ts">
import ArticleView from '@/components/ArticleView.vue'
import PersonalizationPanel from '@/components/PersonalizationPanel.vue'
import { sampleArticle } from '@/data/article'
</script>

<template>
  <div class="min-h-screen bg-gray-50 relative">
    <ArticleView :article="sampleArticle" />
    <PersonalizationPanel />
  </div>
</template>

<style>
@import 'tailwindcss';

main section:not(:first-child) h1,
main section:not(:first-child) h2,
main section:not(:first-child) h3,
main section:not(:first-child) h4,
main section:not(:first-child) h5,
main section:not(:first-child) h6 {
  @apply border-t border-gray-200 pt-4 mt-4;
}
</style>
