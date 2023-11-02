import './charList.scss'
import MarvelService from '../../services/MarvelService'
import { Component } from 'react'
import Spinner from '../spinner/Spinner'
import ErrorMessage from '../errorMessage/ErrorMessage'

class CharList extends Component {
  state = {
    charList: [],
    loading: true,
    error: false,
    newItemLoading: false,
    offset: 155,
    charEnded: false,
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
    }))
  }
  onError = () => {
    this.setState({ error: true, loading: false })
  }
  componentDidMount() {
    console.log('mount')
    this.onUpdateAllCharacters()
    // this.timerId = setInterval(this.updateChar, 3000)
  }

  renderItems(charList) {
    const items = charList.map((item) => {
      let imgStyle = { objectFit: 'cover' }
      const searchString = 'image_not_available.jpg'
      if (item.thumbnail.includes(searchString)) {
        imgStyle = { objectFit: 'unset' }
      }
      return (
        <li
          key={item.id}
          onClick={() => this.props.onSelectedChar(item.id)}
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
    const { charList, loading, error, newItemLoading, offset, charEnded } =
      this.state
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

export default CharList
