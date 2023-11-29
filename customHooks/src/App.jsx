import './App.css'
import useLocalStorage from './useLocalStorage'
import useUpdateLogger from './useUpdateLogger'

function App() {
  const [name, setName] = useLocalStorage('myName', '')
  useUpdateLogger(name)

  return (
    <input
      type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}
    ></input>
  )
}

export default App
