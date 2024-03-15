/* @jsxImportSource @emotion/react */ // import `css`and `ThemeProvider` from "@emotion/react" package
import { useState } from 'react'
import { css, ThemeProvider } from '@emotion/react'

import Toast from 'react-bootstrap/Toast'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import ToastContainer from 'react-bootstrap/ToastContainer'

import logo from './logo.png'

import {
  theme,
  LogoSpin,
  CardWrapper,
  ImageWrapper,
  TextWrapper,
  TitleWrapper,
  DescriptionWrapper,
  ActionsWrapper,
  PrimaryButton,
  SecondaryButton,
} from './styles'
import { Popover } from './components/popover'
// import styled components, theming and animation from "./styles.js" file
import 'bootstrap/dist/css/bootstrap.min.css'
import './style.css'

const hotels = [
  {
    id: 1,
    src: 'images/hotel-leisure.jpeg',
    alt: '',
    title: 'Hotel Leisure',
    description: 'Enjoy world-class shopping in the heart of the city.',
  },
  {
    id: 2,
    src: 'images/hotel-paradise.jpeg',
    alt: '',
    title: 'Hotel Paradise',
    description: 'Enjoy open-air spaces, waterfront dining, and poolside fun.',
  },
  {
    id: 3,
    src: 'images/hotel-holiday.jpeg',
    alt: '',
    title: 'Hotel Holiday',
    description: 'Discover your home away from home.',
  },
]

const ExampleToast = ({ children }) => {
  const [show, toggleShow] = useState(true)
  const [position, setPosition] = useState('top-end')
  return (
    <ToastContainer className="p-3" position={position} style={{ zIndex: 1 }}>
      {!show && <Button onClick={() => toggleShow(true)}>Show Toast</Button>}
      <Toast show={show} onClose={() => toggleShow(false)}>
        <Toast.Header>
          <strong className="me-auto">React-Bootstrap</strong>
        </Toast.Header>
        <Toast.Body>{children}</Toast.Body>
      </Toast>
    </ToastContainer>
  )
}

const CardTop = () => {
  return (
    <div className="card my-2">
      <div className="card-body row row-sound position-relative justify-content-between">
        <div className="align-items-center">first block</div>
        <div className="videos_and_growth">second block</div>
        <div className="align-items-center">third block</div>
      </div>
    </div>
  )
}
// Apply styling to code within the `App` component's `return` statement using styled components, theming, animation and the `css` prop
function App() {
  const [showA, setShowA] = useState(true)

  const toggleShowA = () => setShowA(!showA)

  return (
    <ThemeProvider theme={theme}>
      <main
        css={(theme) => ({
          color: theme.colors.primary,
          background: theme.colors.quaternary,
          height: '1200px',
          fontFamily: theme.fonts.primary,
        })}
      >
        <img
          src={logo}
          alt=""
          css={css`
            display: absolute;
            margin-top: 15px;
            margin-left: 15px;
            height: 100px;
            width: 100px;
            animation: ${LogoSpin} 10s linear infinite;
          `}
        />
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
          {hotels.map((hotel) => {
            return (
              <CardWrapper key={hotel.id}>
                <ImageWrapper src={hotel.src} alt={hotel.alt} />
                <TextWrapper>
                  <TitleWrapper>{hotel.title}</TitleWrapper>
                  <DescriptionWrapper>{hotel.description}</DescriptionWrapper>
                </TextWrapper>
                <ActionsWrapper>
                  <PrimaryButton>Details</PrimaryButton>
                  <SecondaryButton>Book</SecondaryButton>
                </ActionsWrapper>
              </CardWrapper>
            )
          })}
        </div>
        <div className="content-wrapper container-xxl p-0">
          <div className="content-header row">
            <div className="content-body">
              <CardTop />
              <CardTop />
              <CardTop />
              <Popover />
            </div>
          </div>
        </div>
        <Button onClick={toggleShowA} className="mb-2">
          Toggle Toast <strong>with</strong> Animation
        </Button>
        <Toast show={showA} onClose={toggleShowA}>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Bootstrap</strong>
            <small>11 mins ago</small>
          </Toast.Header>
          <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
        </Toast>
      </main>
    </ThemeProvider>
  )
}

export default App
