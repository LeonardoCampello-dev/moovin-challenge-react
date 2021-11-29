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

export function Home(): JSX.Element {
  const axiosHttpClient = new AxiosHttpClient()

  const [loading, setLoading] = useState(true)
  const [posts, setPosts] = useState<Post[]>([])

  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const [postsMetadata, setPostsMetadata] = useState<PostMetadata>({} as PostMetadata)

  useEffect(() => {
    void fetchPosts()
  }, [])

  async function fetchPosts(url?: string): Promise<void> {
    setLoading(true)

    let response: ApiResponse

    if (url) {
      response = await axiosHttpClient.get({ url })
    } else {
      response = await axiosHttpClient.get({ url: makeApiUrl('posts') })
    }

    if (response.body) {
      const { data, meta } = response.body

      setPosts(data)
      setPostsMetadata(meta)

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

          {!loading && (
            <Pagination
              postsCount={String(posts.length)}
              postsMetadata={postsMetadata}
              fetchPosts={fetchPosts}
            />
          )}
        </section>
      </div>
    </>
  )
}
