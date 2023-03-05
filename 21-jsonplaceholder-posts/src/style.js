/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled'
import { css } from '@emotion/react'

export const theme = {
  colors: {
    primary: '#044149',
    secondary: '#10cde6',
    tertiary: '#faa634',
    quaternary: '#fff',
    hotpink: 'hotpink',
  },
  fonts: {
    primary: 'helvetica',
  },
  fontSize: {
    primary: '20px',
    secondary: '0.8rem',
  },
}

export const Wrapper = styled.div(
  {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '15px',
    margin: '25px auto',
    borderRadius: '15px 50px 30px',
    borderBottom: `2px solid ${theme.colors.primary}`,
  },
  (props) => ({
    backgroundColor: props.color,
  })
)
export const TableWrapper = styled.div(
  {
    fontSize: theme.fontSize.secondary,
    border: `1px solid  $(props) => props.theme.colors.tertiary`,
  },
  (props) => ({ color: props.col })
)

export const hotpinkHoverOrFocus = css({
  '&:hover,&:focus': {
    color: theme.colors.hotpink,
    cursor: 'pointer',
  },
  color: theme.colors.secondary,
})
export const InnerData = css(
  {
    borderRight: `1px solid  ${theme.colors.tertiary}`,
    padding: '10px',
  },
  hotpinkHoverOrFocus
)
export const WithoutBorder = hotpinkHoverOrFocus
export const SmallTextCss = css([
  { fontSize: theme.fontSize.secondary },
  hotpinkHoverOrFocus,
])
