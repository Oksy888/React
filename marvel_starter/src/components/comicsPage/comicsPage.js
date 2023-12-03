import { useEffect, useRef, useState } from 'react'

import useMarvelService from '../../services/MarvelService'
import AppBanner from '../appBanner/AppBanner'
import Spinner from '../spinner/Spinner'
import ErrorMessage from '../errorMessage/ErrorMessage'

import './comicsPage.scss'

const ComicsPage = ({ onSelectedComics }) => {
  const [offset, setOffset] = useState()
  const [comics, setComics] = useState({})
  const [newItemLoad, setNewItemLoading] = useState(true)
  const [comicEnded, setComicEnded] = useState(false)

  const { loading, error, getComics } = useMarvelService()

  useEffect(() => {
    onRequest()
  }, [])

  const onRequest = () => {
    setNewItemLoading(true)
    getComics(offset).then(onLoadAllComiscs)
  }
  const onLoadAllComiscs = (newComics) => {
    console.log(newComics)
    let ended = false
    if (newComics.length <= 8) {
      ended = true
    }
    setComics((comic) => [...comics, ...newComics])
    setNewItemLoading(false)
    setOffset((offset) => offset + 9)
    setComicEnded((end) => ended)
  }
  const comicRef = useRef([])

  function focusOnItem(id) {
    comicRef.current.forEach((item) => {
      item.classList.remove('comicsPage__item_selected')
    })
    comicRef.current[id].classList.add('comicsPage__item_selected')
    comicRef.current[id].focus()
  }
  function renderComisc(array) {
    const items = array.map((item, i) => {
      return (
        <li
          key={i}
          tabIndex={0}
          ref={(e) => (comicRef.current[i] = e)}
          onClick={() => {
            onSelectedComics(item.id)
            focusOnItem(i)
          }}
          onKeyUp={(e) => {
            if (e.key === 'Enter' || e.key === '') {
              onSelectedComics(item.id)
              focusOnItem(i)
            }
          }}
          className="comicsPage__item"
        >
          <img src={item.thumbnail} alt={item.title} />
          <div className="comicsPage__name">{item.title}</div>
          <div className="comicsPage__price">{item.price}</div>
        </li>
      )
    })
    return <ul className="comicsPage__grid">{items}</ul>
  }
  const items = renderComisc(comics)
  const loaded = loading && !newItemLoad ? <Spinner /> : null
  const errorMSG = error ? <ErrorMessage /> : null

  return (
    <>
      <AppBanner />

      <div className="comicsPage">
        {loaded}
        {errorMSG}
        {items}
        <button
          onClick={() => onRequest(offset)}
          className="button button__main button__long"
          disabled={newItemLoad}
          style={{ display: comicEnded ? 'none' : 'block' }}
        >
          <div className="inner">load more</div>
        </button>
      </div>
    </>
  )
}

export default ComicsPage
