const App = () => {
  let [buttonText, setButtonText] = React.useState('Click me')
  let [buttonClass, setButtonClass] = React.useState('')
  const onButtonClick = () => {
    setButtonText('Hello from react')
    setButtonClass('green-btn')
  }
  return (
    <div className="app">
      <button className={buttonClass} onClick={onButtonClick}>
        {buttonText}
      </button>
    </div>
  )
}

const container = document.getElementById('app')
const root = ReactDOM.createRoot(container)
root.render(<App />)
