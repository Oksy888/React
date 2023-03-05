/** @jsxImportSource @emotion/react */
import { css, ThemeProvider } from '@emotion/react'
import {
  Wrapper,
  theme,
  WithoutBorder,
  SmallTextCss,
  TableWrapper,
  InnerData,
} from '../style'

function Post(props) {
  const { id, title, userId, body } = props

  return (
    <ThemeProvider theme={theme}>
      <Wrapper color={'#afafaf1f'}>
        <div css={[InnerData, SmallTextCss]}>{id}</div>
        <div css={InnerData}>{title}</div>
        <div css={WithoutBorder}>{body}</div>
      </Wrapper>
    </ThemeProvider>
  )
}

export default Post
