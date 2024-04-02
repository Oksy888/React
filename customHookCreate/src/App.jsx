import { Container } from 'react-bootstrap'
import useInputWithValidate from './useInputWithValidate'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const FormInput = () => {
  const input = useInputWithValidate('')
  const textArea = useInputWithValidate('')
  const color = input.validateInput() ? 'text-danger' : null
  return (
    <Container>
      <form className="w-100 border mt-5 p-3 m-auto">
        <div className="mb-3">
          <input
            value={`${input.value} / ${textArea.value}`}
            type="text"
            className="form-control"
            readOnly
          />
          <label htmlFor="exampleFormControlInput1" className="form-label mt-3">
            Email address
          </label>
          <input
            onChange={input.onChange}
            type="email"
            className={`form-control ${color}`}
            id="exampleFormControlInput1"
            placeholder="name@example.com"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">
            Example textarea
          </label>
          <textarea
            value={textArea.value}
            onChange={textArea.onChange}
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
          ></textarea>
        </div>
      </form>
    </Container>
  )
}

function App() {
  return <FormInput />
}

export default App
