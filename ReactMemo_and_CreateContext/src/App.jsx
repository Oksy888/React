import { useState, useCallback } from 'react'

import dataContext from './context'
import Form from './Form'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const { Provider } = dataContext
//class Form extends PureComponent {
// class Form extends Component {
//   shouldComponentUpdate(nextProps) {
//     if (this.props.mail.name === nextProps.mail.name) {
//       return false
//     }
//     return true
//   }

//   render() {
//     console.log('render')
//     return (
//       <Container>
//         <form className="w-50 border mt-5 p-3 m-auto">
//           <div className="mb-3">
//             <label
//               htmlFor="exampleFormControlInput1"
//               className="form-label mt-3"
//             >
//               Email address
//             </label>
//             <input
//               value={this.props.mail.name}
//               type="email"
//               className="form-control"
//               id="exampleFormControlInput1"
//               placeholder="name@example.com"
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="exampleFormControlTextarea1" className="form-label">
//               Example textarea
//             </label>
//             <textarea
//               value={this.props.text}
//               className="form-control"
//               id="exampleFormControlTextarea1"
//               rows="3"
//             ></textarea>
//           </div>
//         </form>
//       </Container>
//     )
//   }
// }
// function compareProps(prevValue, nextValue) {
//   return (
//     prevValue.mail.name === nextValue.mail.name &&
//     prevValue.text === nextValue.text
//   )
// }

/*class InputComponent extends Component {
  static contextType = dataContext
  render() {
    return (
      /* <Consumer>
        {(value) => {
          return (
            <input
              value={value.mail}
              type="email"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="name@example.com"
            />
          )
        }}
      </Consumer>
      <input
        value={this.context.mail}
        type="email"
        className="form-control"
        id="exampleFormControlInput1"
        placeholder="name@example.com"
      />
    )
  }
}*/
//InputComponent.contextType = dataContext

// function App() {
//   const [data, setData] = useState({
//     mail: {
//       name: 'name@example.com',
//     },
//     text: 'some text',
//   })

//console.dir(dataContext)

function App() {
  const [data, setData] = useState({
    mail: 'name@example.com',
    text: 'some text',
    forseChangeMail: forseChangeValue,
  })

  const log = useCallback(() => {
    console.log('hi')
  }, [])

  function forseChangeValue() {
    setData({
      ...data,
      mail: 'text@test.com',
    })
  }

  return (
    <Provider value={data}>
      <Form text={data.text} log={log} />
      <button
        onClick={() =>
          setData({
            mail: 'new@example.com',
            text: 'next text',
            forseChangeMail: forseChangeValue,
          })
        }
      >
        Click me
      </button>
    </Provider>
  )
}

export default App
