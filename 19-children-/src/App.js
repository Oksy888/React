import './App.css'
import { Wrapper } from './components/Wrapper'

function App() {
  return (
    <div>
      <Wrapper color="lightblue">
        <h2> Text inside of the wrapper</h2>
        <button>Click me</button>
      </Wrapper>
      <Wrapper color="hotpink">
        <h2> Another text</h2>
        <p>Some description</p>
        <input type="text" placeholder="Enter value"></input>
      </Wrapper>
    </div>
  )
}

export default App
