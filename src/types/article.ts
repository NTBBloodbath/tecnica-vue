/**
 * Article data structure representing newsletter or blog content
 */
export interface Article {
  header: {
    title: string
    subtitle?: string
  }
  body: {
    sections: Array<{
      title: string
      content: string
    }>
  }
  footer: {
    author: string
    date: string
    tags?: string[]
  }
}
