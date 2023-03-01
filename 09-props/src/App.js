import './App.css'
import PetInfo from './components/PetInfo'

function App() {
  return (
    <div className="App">
      <PetInfo animal="" age="4" hasAnimal={false} />
      <PetInfo animal="racoon" age={7} hasAnimal />
      <PetInfo animal="rebbit" age={2} hasAnimal={true} />
    </div>
  )
}

export default App
