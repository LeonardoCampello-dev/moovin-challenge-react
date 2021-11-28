import React from 'react'
import { Post } from '@/domain/models'

type Props = {
  posts: Post[]
}

export default function PostsTable ({ posts }: Props): JSX.Element {
  function renderTableHead (): JSX.Element {
    return (
      <thead>
        <tr>
          <th>Título</th>
          <th>Conteúdo</th>
        </tr>
      </thead>
    )
  }

  function renderPostBody (body: string): JSX.Element {
    return (
      <td>
        {body.substring(1, 150)} {body.length > 150 && '...'}
      </td>
    )
  }

  return (
    <table>
      {renderTableHead()}

      <tbody>
        {posts.map((post) => {
          const { id, title, body } = post

          return (
            <tr key={id}>
              <td>{title}</td>
              {renderPostBody(body)}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
