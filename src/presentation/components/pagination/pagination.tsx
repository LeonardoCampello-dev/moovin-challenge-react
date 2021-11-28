import React from 'react'

import styles from './pagination.module.scss'

type Props = {
  postsCount: string
}

function makeAssetsPath (): {
  leftArrow: string
  righArrow: string
} {
  const basePath = 'images/icons/'

  return {
    leftArrow: `${basePath}left-arrow.svg`,
    righArrow: `${basePath}right-arrow.svg`
  }
}

export default function Pagination ({ postsCount }: Props): JSX.Element {
  const assets = makeAssetsPath()

  return (
    <section className={styles.info}>
      <div>
        <div className={styles.count}>Exibindo {postsCount} postagens</div>

        <div className={styles.pagination}>
          <div className={styles.pages}>
            <span className={styles.leftArrow}>
              <img src={assets.leftArrow} alt='Voltar' />
            </span>
            <span className={styles.selected}>1</span>
            <span>2</span>
            <span>3</span>
            <span className={styles.rightArrow}>
              <img src={assets.righArrow} alt='Voltar' />
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
