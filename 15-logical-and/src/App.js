import { useState } from 'react'
import './App.css'
import Counter from './components/Counter'
import Button from './components/Button'
import ResetBtn from './components/ResetBtn'
const texts = ['Click me', 'Push me', 'Click', 'Please click', 'Yeeesss']

function App() {
  const [count, setCount] = useState(0)
  const incrementCount = () => setCount(count + 1)
  const resetCount = () => {
    setCount(0)
  }
  return (
    <div className="App">
      <Counter count={count} />
      {texts.map((text, key) => {
        console.log(key, text)
        return <Button onClick={incrementCount} text={text} key={key} />
      })}
      {count > 0 && <ResetBtn onClick={resetCount} />}
    </div>
  )
}

export default App
