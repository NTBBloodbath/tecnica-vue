# Prueba Técnica Vue.js

Aplicación web con Vue.js 3 para personalizar la apariencia de artículos en tiempo real con opciones de estilo globales y específicas por elemento.

## Características

- **Temas predefinidos**: Selección rápida entre 6 temas preestablecidos (Default, Dark, Sepia, Ocean, Noir, Minimal)
- **Personalización en tiempo real**: Los cambios se aplican instantáneamente
- **Estilos globales**: Color de fondo, color de texto y tipografía aplicables a todo el artículo
- **Estilos específicos por elemento**: Anula los estilos globales para header, body y footer individualmente
- **Sistema de prioridades**: Los estilos específicos tienen prioridad sobre los globales cuando están activos
- **Persistencia**: La configuración se guarda automáticamente en localStorage
- **Panel colapsable**: Barra lateral con controles de personalización
- **Diseño responsive**: Funciona en móvil y escritorio

## Requisitos Técnicos Implementados

### Obligatorios

- Aplicación Vue con mínimo 2 componentes (`ArticleView` y `PersonalizationPanel`)
- Componente de artículo con header, body y footer
- Menú de personalización en tiempo real con controles para:
  - Color de fondo global
  - Color de texto global
  - Tipografía global
  - Color de fondo específico por elemento
  - Color de texto específico por elemento
  - Tipografía específica por elemento:
    - Prioridad de estilos: específico > global
    - Persistencia con localStorage
    - Diseño responsive y buena UX

### Extras Implementados

- Sistema de temas predefinidos
- Código documentado con JSDoc
- Testing completo (32 tests)

## Stack Tecnológico

- **Vue 3** - Composition API con `<script setup>`
- **TypeScript** - Tipado estricto sin `any`
- **Pinia** - Gestión de estado reactivo
- **TailwindCSS** - Estilos
- **Vitest + Vue Test Utils** - Testing
- **Vite** - Herramienta de build

## Estructura del Proyecto

```
src/
├── components/
│   ├── ArticleView.vue           # Renderiza el artículo con estilos dinámicos
│   └── PersonalizationPanel.vue  # Panel de controles de personalización
├── composables/
│   └── useStyleCustomization.ts  # Lógica de resolución de estilos con prioridades
├── stores/
│   └── customization.ts          # Store Pinia con persistencia en localStorage
├── types/
│   ├── article.ts                # Interfaces de datos del artículo
│   ├── customization.ts          # Interfaces de estado de personalización
│   └── themes.ts                 # Definición de temas predefinidos
├── data/
│   └── article.ts                # Datos de ejemplo del artículo
└── App.vue                       # Componente principal
```

## Instalación y Uso

### Instalar dependencias

```sh
pnpm install
```

### Desarrollo

```sh
pnpm dev
```

La aplicación estará disponible en `http://localhost:5173/`

### Build para producción

```sh
pnpm build
```

### Ejecutar tests

```sh
pnpm test:unit
```

### Verificación de tipos

```sh
pnpm type-check
```

## Arquitectura y Decisiones Técnicas

### Sistema de Prioridad de Estilos

El composable `useStyleCustomization` implementa la lógica de prioridad de forma clara:

```typescript
backgroundColor: (useSpecific && elementSpecific.backgroundColor) || global.backgroundColor
```

1. Si la personalización específica está habilitada Y hay un valor establecido: usa el valor específico
2. En caso contrario: usa el valor global

### Persistencia de Estado

El store Pinia observa cambios en el estado y persiste automáticamente en localStorage:

```typescript
watch(
  [global, elements, enableElementSpecific],
  () => {
    saveToStorage({ global, elements, enableElementSpecific })
  },
  { deep: true },
)
```

Al inicializar, carga desde localStorage si está disponible.

### Arquitectura de Componentes

- **Separación de responsabilidades**: Los componentes no conocen el almacenamiento
- **Responsabilidad única**: Cada componente tiene un propósito claro
- **Reactividad por diseño**: Todas las actualizaciones de estilo son computadas y reactivas
- **Type-safe**: Cobertura completa de TypeScript sin tipos `any`

## Testing

32 tests cubriendo:

- Lógica del store y persistencia
- Resolución de prioridad de estilos
- Renderizado de componentes
- Interacciones de usuario
- Flujos de integración
- Aplicación de temas

## License

El código de esta prueba está bajo licencia GPLv2.
