/** @jsxImportSource @emotion/react */
import { jsx, css, ThemeProvider } from '@emotion/react'
import styled from '@emotion/styled'
import { Wrapper, theme } from '../style'

function Post(props) {
  const { id, title, userId, body } = props

  const hotpink = css({
    color: 'hotpink',
  })

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <small>{id} </small>
        <h1>{title} </h1>
        <p>{body} </p>
        <h3>{userId} </h3>
      </Wrapper>
    </ThemeProvider>
  )
}

export default Post
