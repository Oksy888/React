import './App.css'
import Posts from './components/Posts'
import { ThemeProvider } from '@emotion/react'
import { SomeText, theme } from './style'

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <SomeText>Posts</SomeText>
      </ThemeProvider>
      <Posts />
    </div>
  )
}

export default App
