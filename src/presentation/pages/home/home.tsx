/* eslint-disable multiline-ternary */
import React, { useEffect, useState } from 'react'

import { Post, PostMetadata } from '@/domain/models'
import { HttpStatusCode } from '@/data/protocols/http'
import { makeApiUrl } from '@/main/factories/http/api-url-factory'
import { AxiosHttpClient } from '@/infra/http/axios-http-client/axios-http-client'

import { Header, Loader } from '@/presentation/components/'

import styles from './home.module.scss'

type ApiResponse = {
  body?: {
    data: Post[]
    meta: PostMetadata
    statusCode: HttpStatusCode
  }
}

export function Home(): JSX.Element {
  const [loading, setLoading] = useState(true)
  const [posts, setPosts] = useState<Post[]>([])

  const axiosHttpClient = new AxiosHttpClient()

  useEffect(() => {
    void fetchPosts()
  }, [])

  async function fetchPosts(): Promise<void> {
    const response: ApiResponse = await axiosHttpClient.get({ url: makeApiUrl('posts') })

    if (response.body) {
      setPosts(response.body.data)
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

          {loading ? (
            <Loader />
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Conteúdo</th>
                </tr>
              </thead>

              <tbody>
                {posts.map((post) => {
                  const { id, title, body } = post

                  console.log(body.length)

                  return (
                    <tr key={id}>
                      <td>{title}</td>
                      <td>
                        {body.substring(1, 150)} {body.length > 150 && '...'}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}

          {!loading && (
            <section className={styles.info}>
              <div>
                <div className={styles.count}>Exibindo {posts.length} postagens</div>

                <div className={styles.pagination}>
                  <div className={styles.pages}>
                    <span className={styles.leftArrow}>
                      <img src='images/icons/left-arrow.svg' alt='Voltar' />
                    </span>
                    <span className={styles.selected}>1</span>
                    <span>2</span>
                    <span>3</span>
                    <span className={styles.rightArrow}>
                      <img src='images/icons/right-arrow.svg' alt='Voltar' />
                    </span>
                  </div>
                </div>
              </div>
            </section>
          )}
        </section>
      </div>
    </>
  )
}
