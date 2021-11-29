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
      previous: string
      current: string
      next: string
    }
    page: number
    pages: number
    total: number
  }
}
