import React from 'react'

import { PostMetadata } from '@/domain/models'
import { makeApiUrl } from '@/main/factories/http/api-url-factory'

import styles from './pagination.module.scss'

type Props = {
  postsCount: string
  postsMetadata: PostMetadata
  fetchPosts: (url?: string) => void
}

function makeAssetsPath (): {
  leftArrow: string
  rightArrow: string
} {
  const basePath = 'images/icons/'

  return {
    leftArrow: `${basePath}left-arrow.svg`,
    rightArrow: `${basePath}right-arrow.svg`
  }
}

export default function Pagination ({ postsCount, postsMetadata, fetchPosts }: Props): JSX.Element {
  const { links, pages, page } = postsMetadata.pagination

  const assets = makeAssetsPath()

  const siblingsCount = 1

  const previousPages = page > 1 ? generatePagesArray(page - 1 - siblingsCount, page - 1) : []

  const nextPages =
    page < pages ? generatePagesArray(page, Math.min(page + siblingsCount, pages)) : []

  function generatePagesArray (from: number, to: number): number[] {
    return [...new Array(to - from)].map((_, index) => from + index + 1).filter((page) => page > 0)
  }

  function fetchPage (url: string): void {
    fetchPosts(url)
  }

  function renderPreviousPages (): JSX.Element[] | null {
    if (previousPages.length > 0) {
      return previousPages.map((page) => (
        <span key={page} onClick={() => fetchPage(makeApiUrl(`posts?page=${page}`))}>
          {page}
        </span>
      ))
    } else {
      return null
    }
  }

  function renderNextPages (): JSX.Element[] | null {
    if (nextPages.length > 0) {
      return nextPages.map((page) => (
        <span key={page} onClick={() => fetchPage(makeApiUrl(`posts?page=${page}`))}>
          {page}
        </span>
      ))
    } else {
      return null
    }
  }

  function renderArrow (url: string, arrow: 'left' | 'right'): JSX.Element {
    return (
      <span
        className={arrow === 'left' ? styles.leftArrow : styles.rightArrow}
        onClick={() => fetchPage(url)}
      >
        <img
          src={arrow === 'left' ? assets.leftArrow : assets.rightArrow}
          alt={arrow === 'left' ? 'Página anterior' : 'Próxima página'}
        />
      </span>
    )
  }

  function renderFirstPage (): JSX.Element | null {
    if (page > 1 + siblingsCount) {
      return (
        <>
          <span onClick={() => fetchPage(makeApiUrl('posts'))}>1</span>
          {page > 2 + siblingsCount && <span className={styles.ellipsis}>...</span>}
        </>
      )
    } else {
      return null
    }
  }

  function renderLastPage (): JSX.Element | null {
    if (page + siblingsCount < pages) {
      return (
        <>
          {page + 1 + siblingsCount < pages && <span className={styles.ellipsis}>...</span>}
          <span onClick={() => fetchPage(makeApiUrl(`posts?page=${pages}`))}>{String(pages)}</span>
        </>
      )
    } else {
      return null
    }
  }

  return (
    <section className={styles.info}>
      <div>
        <div className={styles.count}>Exibindo {postsCount} postagens</div>

        <div className={styles.pagination}>
          <div className={styles.pages}>
            {links.previous && renderArrow(links.previous, 'left')}

            {renderFirstPage()}

            {renderPreviousPages()}

            <span className={styles.selected}>{String(page)}</span>

            {renderNextPages()}

            {renderLastPage()}

            {links.next && renderArrow(links.previous, 'right')}
          </div>
        </div>
      </div>
    </section>
  )
}
