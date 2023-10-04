import { Component, useState } from 'react'
import './App.css'

class WhoAmI extends Component {
  constructor(props) {
    super(props)
    this.state = {
      years: 27,
      text: '+++',
      position: '',
    }
  }
  nextYear = () => {
    console.log('+++')
    this.setState((state) => ({ years: state.years + 1 }))
  }
  comitInput = (e, text) => {
    console.log(text)
    this.setState({
      position: e.target.value,
    })
  }
  render() {
    const { name, surname, link } = this.props
    const { years, text, position } = this.state
    return (
      <div>
        <button onClick={this.nextYear}>{text}</button>
        <h1>
          My name is {name}, surname - {surname}, age - {years}, position -
          {position}
        </h1>
        <a href={link}>My profile</a>
        <form action="">
          <span>Введите должность</span>
          <input
            type="text"
            onChange={(e) => this.comitInput(e, 'some text')}
          />
        </form>
      </div>
    )
  }
}

function App() {
  return (
    <div className="app">
      <WhoAmI name="John" surname="Smith" link="facebook.com" />
      <WhoAmI name="Oksana" surname="Game" link="insta.com" />
    </div>
  )
}

export default App
