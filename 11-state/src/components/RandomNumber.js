import { useState } from 'react'
import generateRandomNum from '../utils/generateRandomNum'

function RandomNumber({ maxNum }) {
  console.log('rendered')
  const [randomNum, setRandomNum] = useState(generateRandomNum(maxNum))
  const changeRandomNum = () => {
    setRandomNum(generateRandomNum(maxNum))
  }
  return (
    <div>
      <h1>{randomNum}</h1>
      <button onClick={changeRandomNum}> Generate rander number</button>
    </div>
  )
}

export default RandomNumber
