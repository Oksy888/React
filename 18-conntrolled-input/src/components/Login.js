import { useState } from 'react'

function Login() {
  const [data, setData] = useState({ name: '', password: '' })

  function handleFormSubmit(event) {
    event.preventDefault()
    console.log(data)
    alert(JSON.stringify(data))
  }
  function handleInputChange(text, name) {
    setData({ ...data, [name]: text })
  }
  return (
    <>
      <h1>Login:</h1>
      <form onSubmit={handleFormSubmit}>
        <label>
          Username:{' '}
          <input
            type="text"
            value={data.name}
            onChange={(e) => handleInputChange(e.target.value, 'name')}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={data.password}
            onChange={(e) => handleInputChange(e.target.value, 'password')}
          />
        </label>

        <button>Login</button>
      </form>
    </>
  )
}
export default Login
