import { useState } from 'react'

const useInputWithValidate = (initialValue) => {
  const [value, setValue] = useState(initialValue)

  const onChange = (e) => {
    setValue(e.target.value)
  }
  const validateInput = () => {
    return value.search(/\d/) >= 0
  }
  return { value, onChange, validateInput }
}
export default useInputWithValidate
