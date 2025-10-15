import type { Article } from '@/types/article'

/**
 * Sample article data for demonstration
 */
export const sampleArticle: Article = {
  header: {
    title: 'El Futuro del Desarrollo Web',
    subtitle: 'Explorando frameworks modernos y patrones de diseño',
  },
  body: {
    sections: [
      {
        title: 'Introducción',
        content: `El panorama del desarrollo web ha evolucionado dramáticamente en la última década. Desde páginas estáticas simples hasta aplicaciones complejas e interactivas, las herramientas y metodologías que utilizamos se han transformado significativamente.

Los frameworks modernos como Vue.js, React y Angular han revolucionado la forma en que construimos interfaces de usuario, ofreciendo enlace de datos reactivo, arquitectura basada en componentes y potentes herramientas de desarrollo.`,
      },
      {
        title: 'Arquitectura Basada en Componentes',
        content: `Uno de los cambios más significativos en el desarrollo web ha sido el movimiento hacia la arquitectura basada en componentes. Este enfoque permite a los desarrolladores construir unidades reutilizables y autocontenidas de funcionalidad que se pueden componer juntas para crear aplicaciones complejas.

Los componentes encapsulan su propia lógica, estilos y marcado, haciendo que el código sea más mantenible y más fácil de razonar. Esta modularidad también permite mejores prácticas de testing y colaboración en equipo.`,
      },
      {
        title: 'El Ascenso de TypeScript',
        content: `TypeScript se ha vuelto cada vez más popular en el ecosistema JavaScript, proporcionando verificación de tipos estáticos que detecta errores en tiempo de compilación en lugar de tiempo de ejecución. Esto conduce a un código más robusto y una mejor experiencia de desarrollo con autocompletado mejorado y herramientas de refactorización.

La adopción de TypeScript en los principales frameworks y bibliotecas demuestra su valor en la construcción de aplicaciones escalables y mantenibles.`,
      },
    ],
  },
  footer: {
    author: 'John Doe',
    date: '7 de octubre de 2025',
    tags: ['Desarrollo Web', 'Vue.js', 'TypeScript', 'Arquitectura'],
  },
}
