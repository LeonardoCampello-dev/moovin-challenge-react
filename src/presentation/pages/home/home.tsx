import React from 'react'

import { Header } from '../../components'

import styles from './home.module.scss'

export function Home(): JSX.Element {
  return (
    <>
      <Header />

      <div className={styles.container}>
        <section className={styles.posts}>
          <div className={styles.lastPosts}>
            <h1>Últimas postagens</h1>
          </div>

          <table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Conteúdo</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</td>
                <td>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</td>
              </tr>

              <tr>
                <td>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</td>
                <td>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</td>
              </tr>

              <tr>
                <td>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</td>
                <td>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</td>
              </tr>

              <tr>
                <td>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</td>
                <td>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</td>
              </tr>

              <tr>
                <td>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</td>
                <td>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</td>
              </tr>

              <tr>
                <td>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</td>
                <td>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</td>
              </tr>

              <tr>
                <td>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</td>
                <td>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</td>
              </tr>

              <tr>
                <td>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</td>
                <td>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</td>
              </tr>

              <tr>
                <td>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</td>
                <td>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</td>
              </tr>
            </tbody>
          </table>

          <section className={styles.info}>
            <div>
              <div className={styles.count}>Exibindo 9 postagens</div>

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
        </section>
      </div>
    </>
  )
}
