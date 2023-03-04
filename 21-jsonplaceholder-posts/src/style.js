/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled'
import { jsx, css } from '@emotion/react'

export const theme = {
  colors: {
    primary: '#03045e',
    secondary: '#caf0f8',
    tertiary: '#023e8a',
    quaternary: '#fff',
  },
  fonts: {
    primary: 'helvetica',
  },
  fontSize: {
    primary: '20px',
    secondary: '14px',
  },
}

export const Wrapper = styled.div`
  display: flex;
  flex-flow: 0 0 auto;
  justify-content: center;
  align-items: center;
  max-width: 50%;
  padding: 15px;
  margin: 25px auto;
  borderradius: 15px;
`
