/* eslint-disable multiline-ternary */
import React, { useEffect, useState } from 'react'

import { Post, PostMetadata } from '@/domain/models'
import { HttpStatusCode } from '@/data/protocols/http'
import { makeApiUrl } from '@/main/factories/http/api-url-factory'
import { AxiosHttpClient } from '@/infra/http/axios-http-client/axios-http-client'

import { Header, Loader, Pagination, PostsTable } from '@/presentation/components/'

import styles from './home.module.scss'

type ApiResponse = {
  body?: {
    data: Post[]
    meta: PostMetadata
    statusCode: HttpStatusCode
  }
}

export function Home (): JSX.Element {
  const axiosHttpClient = new AxiosHttpClient()

  const [loading, setLoading] = useState(true)
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    void fetchPosts()
  }, [])

  async function fetchPosts (): Promise<void> {
    const response: ApiResponse = await axiosHttpClient.get({ url: makeApiUrl('posts') })

    if (response.body) {
      const { data } = response.body

      setPosts(data)
      setLoading(false)
    } else {
      setPosts([])
      setLoading(false)
    }
  }

  return (
    <>
      <Header />

      <div className={styles.container}>
        <section className={styles.posts}>
          <div className={styles.lastPosts}>
            <h1>Últimas postagens</h1>
          </div>

          {loading ? <Loader /> : <PostsTable posts={posts} />}

          {!loading && <Pagination postsCount={String(posts.length)} />}
        </section>
      </div>
    </>
  )
}
