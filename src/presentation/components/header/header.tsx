import React from 'react'

import styles from './header.module.scss'

export default function Header (): JSX.Element {
  return (
    <header className={styles.headerContainer}>
      <div>
        <img src='images/logo.svg' alt='Moovin' className='logo' />
      </div>
    </header>
  )
}
