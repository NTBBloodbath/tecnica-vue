<script setup lang="ts">
/**
 * PersonalizationPanel component
 *
 * Provides a collapsible sidebar interface for customizing article appearance
 */
import { ref } from 'vue'
import { useCustomizationStore } from '@/stores/customization'
import type { ElementType, FontSize } from '@/types/customization'
import { themes } from '@/types/themes'

const store = useCustomizationStore()
const isOpen = ref(false)

const fontFamilies = [
  { label: 'System Default', value: 'system-ui, -apple-system, sans-serif' },
  { label: 'Arial', value: 'Arial, sans-serif' },
  { label: 'Georgia', value: 'Georgia, serif' },
  { label: 'Times New Roman', value: '"Times New Roman", serif' },
  { label: 'Courier New', value: '"Courier New", monospace' },
  { label: 'Verdana', value: 'Verdana, sans-serif' },
  { label: 'Helvetica', value: 'Helvetica, sans-serif' },
]

const fontSizes: Array<{ label: string; value: FontSize }> = [
  { label: 'Extra Small', value: 'xs' },
  { label: 'Small', value: 'sm' },
  { label: 'Medium', value: 'base' },
  { label: 'Large', value: 'lg' },
  { label: 'Extra Large', value: 'xl' },
]

const elementTypes: Array<{ type: ElementType; label: string }> = [
  { type: 'header', label: 'Header' },
  { type: 'body', label: 'Body' },
  { type: 'footer', label: 'Footer' },
]

function togglePanel() {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <aside
    class="fixed top-0 right-0 h-full bg-white shadow-2xl transition-transform duration-300 z-50 flex flex-col w-full sm:w-96 md:w-[420px]"
    :class="isOpen ? 'translate-x-0' : 'translate-x-full'"
  >
    <button
      @click="togglePanel"
      class="absolute -left-10 sm:-left-12 top-4 bg-white shadow-lg rounded-l-lg p-2 sm:p-3 hover:bg-gray-50 transition-colors"
      :aria-label="isOpen ? 'Close panel' : 'Open panel'"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 sm:h-6 sm:w-6 transition-transform duration-300"
        :class="{ 'rotate-180': isOpen }"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </button>

    <div class="flex items-center justify-between p-4 sm:p-6 border-b sticky top-0 bg-white z-10">
      <h2 class="text-xl sm:text-2xl font-bold">Personalization</h2>
      <button
        @click="togglePanel"
        class="sm:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
        aria-label="Close panel"
      >
        <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>

    <div class="overflow-y-auto flex-1 p-4 sm:p-6">
      <section class="mb-6">
        <h3 class="text-base sm:text-lg font-semibold mb-3">Themes</h3>
        <div class="grid grid-cols-2 gap-2">
          <button
            v-for="theme in themes"
            :key="theme.id"
            @click="store.applyTheme(theme)"
            class="p-2.5 sm:p-3 rounded-lg border-2 transition-all text-left shadow-sm hover:shadow-md active:scale-95"
            :class="
              store.global.backgroundColor === theme.styles.backgroundColor &&
              store.global.textColor === theme.styles.textColor
                ? 'border-blue-500 ring-2 ring-blue-200'
                : 'border-gray-200 hover:border-blue-300'
            "
            :style="{
              backgroundColor: theme.styles.backgroundColor,
              color: theme.styles.textColor,
            }"
          >
            <span class="text-xs sm:text-sm font-medium">{{ theme.name }}</span>
          </button>
        </div>
      </section>

      <!-- Global Styles -->
      <section class="mb-6">
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-base sm:text-lg font-semibold">Global Styles</h3>
          <button
            @click="store.resetGlobalStyles()"
            class="text-xs sm:text-sm text-blue-600 hover:text-blue-800 font-medium px-2 py-1 hover:bg-blue-50 rounded transition-colors"
          >
            Reset
          </button>
        </div>

        <div class="space-y-3">
          <div>
            <label
              for="global-bg"
              class="block text-xs sm:text-sm font-medium mb-1.5 text-gray-700"
            >
              Background
            </label>
            <div class="relative">
              <input
                id="global-bg"
                v-model="store.global.backgroundColor"
                type="color"
                class="absolute left-1.5 top-1.5 w-7 h-7 rounded border-0 cursor-pointer"
              />
              <input
                v-model="store.global.backgroundColor"
                type="text"
                class="w-full pl-11 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-shadow"
                placeholder="#ffffff"
              />
            </div>
          </div>

          <div>
            <label
              for="global-text"
              class="block text-xs sm:text-sm font-medium mb-1.5 text-gray-700"
            >
              Text Color
            </label>
            <div class="relative">
              <input
                id="global-text"
                v-model="store.global.textColor"
                type="color"
                class="absolute left-1.5 top-1.5 w-7 h-7 rounded border-0 cursor-pointer"
              />
              <input
                v-model="store.global.textColor"
                type="text"
                class="w-full pl-11 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-shadow"
                placeholder="#000000"
              />
            </div>
          </div>

          <div>
            <label
              for="global-font"
              class="block text-xs sm:text-sm font-medium mb-1.5 text-gray-700"
            >
              Font Family
            </label>
            <select
              id="global-font"
              v-model="store.global.fontFamily"
              class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-shadow bg-white"
            >
              <option v-for="font in fontFamilies" :key="font.value" :value="font.value">
                {{ font.label }}
              </option>
            </select>
          </div>

          <div>
            <label
              for="global-size"
              class="block text-xs sm:text-sm font-medium mb-1.5 text-gray-700"
            >
              Font Size
            </label>
            <select
              id="global-size"
              v-model="store.global.fontSize"
              class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-shadow bg-white"
            >
              <option v-for="size in fontSizes" :key="size.value" :value="size.value">
                {{ size.label }}
              </option>
            </select>
          </div>
        </div>
      </section>

      <!-- Element Specific Styles -->
      <section>
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-base sm:text-lg font-semibold">Element Specific</h3>
          <button
            @click="store.resetElementStyles()"
            class="text-xs sm:text-sm text-blue-600 hover:text-blue-800 font-medium px-2 py-1 hover:bg-blue-50 rounded transition-colors"
          >
            Reset
          </button>
        </div>

        <div class="mb-4">
          <label
            class="flex items-center gap-2 cursor-pointer p-2 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <input
              v-model="store.enableElementSpecific"
              type="checkbox"
              class="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 focus:ring-offset-0"
            />
            <span class="text-xs sm:text-sm font-medium text-gray-700"
              >Enable element-specific customization</span
            >
          </label>
        </div>

        <div v-if="store.enableElementSpecific" class="space-y-3">
          <div
            v-for="{ type, label } in elementTypes"
            :key="type"
            class="border border-gray-200 rounded-lg p-3 bg-gray-50"
          >
            <h4 class="text-sm font-semibold mb-2.5 text-gray-800">{{ label }}</h4>
            <div class="space-y-2.5">
              <div>
                <label :for="`${type}-bg`" class="block text-xs font-medium mb-1 text-gray-600">
                  Background
                </label>
                <div class="relative">
                  <input
                    :id="`${type}-bg`"
                    v-model="store.elements[type].backgroundColor"
                    type="color"
                    class="absolute left-1.5 top-1.5 w-6 h-6 rounded border-0 cursor-pointer"
                  />
                  <input
                    v-model="store.elements[type].backgroundColor"
                    type="text"
                    class="w-full pl-10 pr-2 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-shadow"
                    placeholder="Default"
                  />
                </div>
              </div>

              <div>
                <label :for="`${type}-text`" class="block text-xs font-medium mb-1 text-gray-600">
                  Text Color
                </label>
                <div class="relative">
                  <input
                    :id="`${type}-text`"
                    v-model="store.elements[type].textColor"
                    type="color"
                    class="absolute left-1.5 top-1 w-6 h-6 rounded border-0 cursor-pointer"
                  />
                  <input
                    v-model="store.elements[type].textColor"
                    type="text"
                    class="w-full pl-10 pr-2 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-shadow"
                    placeholder="Default"
                  />
                </div>
              </div>

              <div>
                <label :for="`${type}-font`" class="block text-xs font-medium mb-1 text-gray-600">
                  Font Family
                </label>
                <select
                  :id="`${type}-font`"
                  v-model="store.elements[type].fontFamily"
                  class="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-shadow bg-white"
                >
                  <option :value="undefined">Use Global</option>
                  <option v-for="font in fontFamilies" :key="font.value" :value="font.value">
                    {{ font.label }}
                  </option>
                </select>
              </div>

              <div>
                <label :for="`${type}-size`" class="block text-xs font-medium mb-1 text-gray-600">
                  Font Size
                </label>
                <select
                  :id="`${type}-size`"
                  v-model="store.elements[type].fontSize"
                  class="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-shadow bg-white"
                >
                  <option :value="undefined">Use Global</option>
                  <option v-for="size in fontSizes" :key="size.value" :value="size.value">
                    {{ size.label }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      <button
        @click="store.resetAll()"
        class="w-full mt-6 px-4 py-2.5 sm:py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 active:scale-[0.98] transition-all font-medium text-sm sm:text-base shadow-md hover:shadow-lg"
      >
        Reset All Settings
      </button>
    </div>
  </aside>
</template>
