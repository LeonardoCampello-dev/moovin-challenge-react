export type Post = {
  id: string
  body: string
  title: string
  user_id: string
}

export type PostMetadata = {
  pagination: {
    limit: 20
    links: {
      previous: null | string
      current: string
      next: null | string
    }
    page: number
    pages: number
    total: number
  }
}
