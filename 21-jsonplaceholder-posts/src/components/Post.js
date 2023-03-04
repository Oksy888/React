import { jsx, css } from '@emotion/react'
import styled from '@emotion/styled'

function Post(props) {
  const { id, title, userId, body } = props
  const flexBox = css`
    display: flex;
    flex-flow: 0 0 auto;
    justify-content: center;
    align-items: center;
    max-width: 50%;
    padding: 15px;
    margin: 25px auto;
    borderradius: 15px;
  `
  const MainFonts = styled.div`
    color: red;
    font-size: 16px;
    font-family: Roboto;
  `
  const hotpink = css({
    color: 'hotpink',
  })

  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 15px;
        padding: 20px;
        @media (max-width: 900px) {
          display: grid;
        }
      `}
    >
      <MainFonts>
        <p css={hotpink}>This is hotpink</p>
      </MainFonts>
      <small>{id} </small>
      <h1>{title} </h1>
      <p>{body} </p>
      <h3>{userId} </h3>
    </div>
  )
}

export default Post
