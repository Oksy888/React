import './App.css'
import useBookSearch from './useBookSearch'
import { useCallback, useState, useRef } from 'react'

function App() {
  const [query, setQuery] = useState('')
  const [pageNumber, setpageNumber] = useState(1)

  const { books, loading, error, hasMore } = useBookSearch(query, pageNumber)
  const observer = useRef()
  const lastBookElementRef = useCallback(
    (node) => {
      if (loading) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setpageNumber((prevPage) => prevPage + 1)
        }
      })
      if (node) observer.current.observe(node)
      console.log(node)
    },
    [loading, hasMore]
  )

  function handleSearch(e) {
    setQuery(e.target.value)
    setpageNumber(1)
  }
  return (
    <>
      <label htmlFor="search-field">Search book by name</label>
      <input
        type="text"
        className="text-search-field"
        onChange={handleSearch}
      ></input>
      {books.map((book, index) => {
        if (books.length === index + 1) {
          return (
            <div ref={lastBookElementRef} key={book}>
              {book}
            </div>
          )
        } else {
          return <div key={book}>{book}</div>
        }
      })}
      <div>{loading && 'Loading...'}</div>
      <div>{error && 'Error'}</div>
    </>
  )
}

export default App
