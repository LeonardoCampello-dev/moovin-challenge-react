import React from 'react'

import { PostMetadata } from '@/domain/models'
import { makeApiUrl } from '@/main/factories/http/api-url-factory'

import styles from './pagination.module.scss'

type Props = {
  postsCount: string
  postsMetadata: PostMetadata
  fetchPosts: (url?: string) => void
}

function makeAssetsPath(): {
  leftArrow: string
  righArrow: string
} {
  const basePath = 'images/icons/'

  return {
    leftArrow: `${basePath}left-arrow.svg`,
    righArrow: `${basePath}right-arrow.svg`
  }
}

export default function Pagination({ postsCount, postsMetadata, fetchPosts }: Props): JSX.Element {
  const { links, pages, page } = postsMetadata.pagination

  const assets = makeAssetsPath()

  function generatePagesArray(from: number, to: number): number[] {
    return [...new Array(to - from)].map((_, index) => from + index + 1).filter((page) => page > 0)
  }

  function fetchPreviousOrNextPage(url: string): void {
    fetchPosts(url)
  }

  const siblingsCount = 1

  const previousPages = page > 1 ? generatePagesArray(page - 1 - siblingsCount, page - 1) : []

  const nextPages =
    page < pages ? generatePagesArray(page, Math.min(page + siblingsCount, pages)) : []

  return (
    <section className={styles.info}>
      <div>
        <div className={styles.count}>Exibindo {postsCount} postagens</div>

        <div className={styles.pagination}>
          <div className={styles.pages}>
            {links.previous && (
              <span
                className={styles.leftArrow}
                onClick={() => fetchPreviousOrNextPage(links.previous)}
              >
                <img src={assets.leftArrow} alt='Página anterior' />
              </span>
            )}

            {page > 1 + siblingsCount && (
              <>
                <span onClick={() => fetchPreviousOrNextPage(makeApiUrl('posts'))}>1</span>
                {page > 2 + siblingsCount && <span className={styles.ellipsis}>...</span>}
              </>
            )}

            {previousPages.length > 0 &&
              previousPages.map((page) => (
                <span
                  key={page}
                  onClick={() => fetchPreviousOrNextPage(makeApiUrl(`posts?page=${page}`))}
                >
                  {page}
                </span>
              ))}

            <span className={styles.selected}>{String(page)}</span>

            {nextPages.length > 0 &&
              nextPages.map((page) => (
                <span
                  key={page}
                  onClick={() => fetchPreviousOrNextPage(makeApiUrl(`posts?page=${page}`))}
                >
                  {page}
                </span>
              ))}

            {page + siblingsCount < pages && (
              <>
                {page + 1 + siblingsCount < pages && <span className={styles.ellipsis}>...</span>}
                <span onClick={() => fetchPreviousOrNextPage(makeApiUrl(`posts?page=${pages}`))}>
                  {String(pages)}
                </span>
              </>
            )}

            {links.next && (
              <span
                className={styles.rightArrow}
                onClick={() => fetchPreviousOrNextPage(links.next)}
              >
                <img src={assets.righArrow} alt='Próxima página' />
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
