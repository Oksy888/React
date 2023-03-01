import { useState } from 'react'
import './App.css'
import Counter from './components/Counter'
import Button from './components/Button'
const texts = ['Click me', 'Push me', 'Click', 'Please click', 'Yeeesss']

function App() {
  const [count, setCount] = useState(0)
  function incrementCount(amount) {
    setCount((currentCount) => {
      return currentCount + amount
    })
  }

  return (
    <div className="App">
      <Counter count={count} />
      {texts.map((text, key) => {
        console.log(key, text)
        return (
          <Button onClick={() => incrementCount(1)} text={text} key={key} />
        )
      })}
    </div>
  )
}

export default App
