import React, { Component } from 'react'
import PropTypes from 'prop-types'

import MarvelService from '../../services/MarvelService'
import Spinner from '../spinner/Spinner'
import ErrorMessage from '../errorMessage/ErrorMessage'

import './charList.scss'

class CharList extends Component {
  focusRef = React.createRef()
  state = {
    charList: [],
    loading: true,
    error: false,
    newItemLoading: false,
    offset: 155,
    charEnded: false,
    pageNumber: 1,
    hasMore: false,
  }
  marvelService = new MarvelService()

  onUpdateAllCharacters = () => {
    this.onRequest()
  }
  onRequest = (offset) => {
    this.onCharListLoading()
    this.marvelService
      .getAllCharacters(offset)
      .then(this.onLoadAllCharacters)
      .catch(this.onError)
  }

  onCharListLoading = () => {
    this.setState({
      newItemLoading: true,
    })
  }

  onLoadAllCharacters = (NewCharList) => {
    let ended = false
    if (NewCharList.length < 9) {
      ended = true
    }
    this.setState(({ offset, charList }) => ({
      charList: [...charList, ...NewCharList],
      loading: false,
      error: false,
      newItemLoading: false,
      offset: offset + 9,
      charEnded: ended,
      hasMore: NewCharList.length > 0 ? true : false,
    }))
  }
  onError = () => {
    this.setState({ error: true, loading: false })
  }
  componentDidMount() {
    this.onUpdateAllCharacters()
    // this.timerId = setInterval(this.updateChar, 3000)
  }
  itemRefs = []
  setRef = (ref) => {
    this.itemRefs.push(ref)
  }
  focusOnItem = (id) => {
    this.itemRefs.forEach((item) => {
      if (item && item.classList) {
        item.classList.remove('char__item_selected')
      }
    })
    if (this.itemRefs[id]) {
      this.itemRefs[id].classList.add('char__item_selected')
      this.itemRefs[id].focus()
    }
  }

  renderItems(charList) {
    const items = charList.map((item, index) => {
      let imgStyle = { objectFit: 'cover' }
      const searchString = 'image_not_available.jpg'
      if (item.thumbnail.includes(searchString)) {
        imgStyle = { objectFit: 'unset' }
      }

      return (
        <li
          ref={this.setRef}
          key={item.id}
          onClick={() => {
            this.props.onSelectedChar(item.id)
            this.focusOnItem(index)
          }}
          onKeyUp={(e) => {
            if (e.key === '' || e.key === 'Enter') {
              this.props.onSelectedChar(item.id)
              this.focusOnItem(index)
            }
          }}
          className="char__item"
        >
          <img src={item.thumbnail} alt={item.name} style={imgStyle} />
          <div className="char__name">{item.name}</div>
        </li>
      )
    })
    return <ul className="char__grid">{items}</ul>
  }
  render() {
    const {
      charList,
      loading,
      error,
      newItemLoading,
      offset,
      charEnded,
      pageNumber,
    } = this.state

    const items = this.renderItems(charList)
    const loaded = loading ? <Spinner /> : null
    const errorMsg = error ? <ErrorMessage /> : null
    const content = !(loading || error) ? items : null

    return (
      <div className="char__list">
        {loaded}
        {errorMsg}
        {content}
        <button
          onClick={() => this.onRequest(offset)}
          className="button button__main button__long"
          disabled={newItemLoading}
          style={{ display: charEnded ? 'none' : 'block' }}
        >
          <div className="inner">load more</div>
        </button>
      </div>
    )
  }
}
CharList.propTypes = {
  onSelectedChar: PropTypes.func.isRequired,
}

export default CharList
