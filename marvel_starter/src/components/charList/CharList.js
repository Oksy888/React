import React, { useEffect, useCallback, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import MarvelService from '../../services/MarvelService'
import Spinner from '../spinner/Spinner'
import ErrorMessage from '../errorMessage/ErrorMessage'
import useLoadMoreCharacters from '../../services/useLoadMoreCharacters'

import './charList.scss'

const CharList = ({ onSelectedChar }) => {
  const [charLi, setCharList] = useState([])
  const [load, setLoading] = useState(false)
  const [err, setError] = useState(false)
  const [newItemLoad, setNewItemLoading] = useState(false)
  const [offs, setOffset] = useState(210)
  const [charEnd, setCharEnded] = useState(false)
  const [loadByScroll, setLoadByScroll] = useState(false)
  const marvelService = new MarvelService()
  useEffect(() => {
    onRequest()
  }, [])

  const onRequest = (offset) => {
    onCharListLoading()
    marvelService
      .getAllCharactersAxios(offset)
      .then(onLoadAllCharacters)
      .catch(onError)
  }

  const onCharListLoading = () => {
    setNewItemLoading(true)
  }

  const onLoadAllCharacters = (NewCharList) => {
    let ended = false
    if (NewCharList.length < 9) {
      ended = true
    }
    setCharList((charList) => [...charLi, ...NewCharList])
    setLoading((load) => false)
    setError((error) => false)
    setNewItemLoading((newItem) => false)
    setOffset((offset) => offset + 9)
    setCharEnded((charEnd) => ended)
  }

  const { loadingUse, errorUse, chars, hasMoreItems } =
    useLoadMoreCharacters(offs)
  const observer = useRef()
  const lastCharElment = useCallback(
    (node) => {
      if (loadingUse || !node) return
      if (observer.current) observer.current.disconnect()

      observer.current = new IntersectionObserver((entries) => {
        console.log(entries[0])
        if (entries[0].isIntersecting && hasMoreItems) {
          setOffset((offset) => offset + 9)
        }
      })
      if (node) observer.current.observe(node)
      console.log(node)
    },
    [loadingUse, hasMoreItems]
  )
  const onError = () => {
    setError((error) => true)
    setLoading((load) => false)
  }
  const itemRefs = useRef([])

  const focusOnItem = (id) => {
    console.log(id)

    itemRefs.current.forEach((item) => {
      console.log(item.classList)
      item.classList.remove('char__item_selected')
    })
    itemRefs.current[id].classList.add('char__item_selected')
    itemRefs.current[id].focus()
  }

  function renderItemsScroll(arr) {
    const items = arr.map((item, i) => {
      let imgStyle = { objectFit: 'cover' }
      const searchString = 'image_not_available.jpg'
      if (item.thumbnail.includes(searchString)) {
        imgStyle = { objectFit: 'unset' }
      }
      if (arr.length === i + 1) {
        return (
          <li
            className="char__item"
            tabIndex={0}
            ref={(el) => (itemRefs.current[i] = el)}
            key={i}
            onClick={() => {
              onSelectedChar(item.id)
              focusOnItem(i)
            }}
            onKeyUp={(e) => {
              if (e.key === '' || e.key === 'Enter') {
                onSelectedChar(item.id)
                focusOnItem(i)
              }
            }}
          >
            <img src={item.thumbnail} alt={item.name} style={imgStyle} />
            <div ref={lastCharElment} className="char__name">
              {item.name}
            </div>
          </li>
        )
      } else {
        return (
          <li
            className="char__item"
            tabIndex={0}
            ref={(el) => (itemRefs.current[i] = el)}
            key={i}
            onClick={() => {
              onSelectedChar(item.id)
              focusOnItem(i)
            }}
            onKeyUp={(e) => {
              if (e.key === '' || e.key === 'Enter') {
                onSelectedChar(item.id)
                focusOnItem(i)
              }
            }}
          >
            <img src={item.thumbnail} alt={item.name} style={imgStyle} />
            <div className="char__name">{item.name}</div>
          </li>
        )
      }
    })
    return <ul className="char__grid">{items}</ul>
  }
  function renderItems(arr) {
    const items = arr.map((item, i) => {
      let imgStyle = { objectFit: 'cover' }
      const searchString = 'image_not_available.jpg'
      if (item.thumbnail.includes(searchString)) {
        imgStyle = { objectFit: 'unset' }
      }

      return (
        <li
          className="char__item"
          tabIndex={0}
          ref={(el) => (itemRefs.current[i] = el)}
          key={i}
          onClick={() => {
            onSelectedChar(item.id)
            focusOnItem(i)
          }}
          onKeyUp={(e) => {
            if (e.key === '' || e.key === 'Enter') {
              onSelectedChar(item.id)
              focusOnItem(i)
            }
          }}
        >
          <img src={item.thumbnail} alt={item.name} style={imgStyle} />
          <div className="char__name">{item.name}</div>
        </li>
      )
    })
    return <ul className="char__grid">{items}</ul>
  }
  const items = loadByScroll ? renderItemsScroll(chars) : renderItems(charLi)
  //const items = renderItems(charLi)
  const loaded = load ? <Spinner /> : null
  const errorMsg = err ? <ErrorMessage /> : null
  const content = !(load || err) ? items : null

  return (
    <div className="char__list">
      {loaded}
      {errorMsg}
      <input
        type="checkbox"
        id="scales"
        name="scales"
        onChange={() => setLoadByScroll(!loadByScroll)}
      />
      <label htmlFor="scales">Loading items on scroll</label>
      {content}
      {loadByScroll && (
        <>
          <button
            className="button button__main button__long"
            disabled={loadingUse}
            style={{ display: charEnd ? 'none' : 'block' }}
          >
            <div className="inner">loading</div>
          </button>
          <div>{errorUse && 'Error'}</div>
        </>
      )}
      {!loadByScroll && (
        <button
          onClick={() => onRequest(offs)}
          className="button button__main button__long"
          disabled={newItemLoad}
          style={{ display: charEnd ? 'none' : 'block' }}
        >
          <div className="inner">load more</div>
        </button>
      )}
    </div>
  )
}
CharList.propTypes = {
  onSelectedChar: PropTypes.func.isRequired,
}

export default CharList
