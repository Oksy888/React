import ComicsPage from '../comicsPage/comicsPage'
import { useState } from 'react'

const ComicsPagePage = () => {
  const [selectedComiscs, setSelectedComiscs] = useState(null)

  const onSelectedComics = (id) => {
    setSelectedComiscs(id)
  }
  return <ComicsPage onSelectedComics={onSelectedComics} />
}
export default ComicsPagePage
