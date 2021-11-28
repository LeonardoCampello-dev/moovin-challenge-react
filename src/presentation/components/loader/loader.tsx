import React from 'react'

import styles from './loader.module.scss'

export default function Loader (): JSX.Element {
  return (
    <div className={styles.container}>
      <div className={styles.loader} />
    </div>
  )
}
