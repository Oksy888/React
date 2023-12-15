import { useEffect, useRef, useState } from 'react'

import useMarvelService from '../../services/MarvelService'
import AppBanner from '../appBanner/AppBanner'
import Spinner from '../spinner/Spinner'
import ErrorMessage from '../errorMessage/ErrorMessage'

import './comics.scss'
import { Link } from 'react-router-dom'

const Comics = () => {
  const [offset, setOffset] = useState(0)
  const [comics, setComics] = useState([])
  const [newItemLoad, setNewItemLoading] = useState(false)
  const [comicEnded, setComicEnded] = useState(false)

  const { loading, error, getComics } = useMarvelService()

  useEffect(() => {
    onRequest(offset, true)
  }, [])

  const onRequest = (offset, initial) => {
    initial ? setNewItemLoading(false) : setNewItemLoading(true)

    getComics(offset).then(onLoadAllComiscs)
  }
  const onLoadAllComiscs = (newComics) => {
    console.log(newComics)
    let ended = false
    if (newComics.length < 8) {
      ended = true
    }
    setComics((comic) => [...comics, ...newComics])
    setNewItemLoading(false)
    setOffset((offset) => offset + 8)
    setComicEnded((end) => ended)
  }
  const comicRef = useRef([])
  console.log('Comics')
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
        <li key={i} tabIndex={0} className="comics__item">
          <Link to={`/comics/${item.id}`}>
            <img
              src={item.thumbnail}
              alt={item.title}
              className="comics__item-img"
            />
            <div className="comics__item-name">{item.title}</div>
            <div className="comics__item-price">{item.price}</div>
          </Link>
        </li>
      )
    })
    return <ul className="comics__grid">{items}</ul>
  }
  const items = renderComisc(comics)
  const loaded = loading && !newItemLoad ? <Spinner /> : null
  const errorMSG = error ? <ErrorMessage /> : null

  return (
    <>
      <AppBanner />

      <div className="comics">
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

export default Comics
