import { createContext } from 'react'

const dataContext = createContext({
  mail: 'name@example.com',
  text: 'some text',
  forseChangeMail: () => {},
})

export default dataContext
