import { Component } from 'react'
import PropTypes from 'prop-types'
import MarvelService from '../../services/MarvelService'
import Spinner from '../spinner/Spinner'
import ErrorMessage from '../errorMessage/ErrorMessage'
import Skeleton from '../skeleton/Skeleton'

import './charInfo.scss'

class CharInfo extends Component {
  state = {
    char: null,
    loading: false,
    error: false,
  }
  marvelService = new MarvelService()

  componentDidMount() {
    //this.updateChar()
  }
  componentDidUpdate(prevProps) {
    if (this.props.charId !== prevProps.charId) {
      this.updateChar()
    }
  }
  componentDidCatch(err, info) {
    console.log(err, info)
    this.setState({ error: true })
  }
  updateChar = () => {
    const { charId } = this.props
    if (!charId) {
      return
    }
    this.onLoadingChar()
    this.marvelService
      .getCharacter(charId)
      .then(this.onCharLoaded)
      .catch(this.onError)
  }
  onLoadingChar = () => {
    this.setState({ loading: true })
  }
  onCharLoaded = (char) => {
    this.setState({ char, loading: false, error: false })
  }
  onError = () => {
    this.setState({ loading: false, error: true })
  }
  render() {
    const { char, loading, error } = this.state
    const skeleton = char || loading || error ? null : <Skeleton />
    const loaded = loading ? <Spinner /> : null
    const errorMsg = error ? <ErrorMessage /> : null
    const content = !(loading || error || !char) ? <View char={char} /> : null
    return (
      <div className="char__info">
        {skeleton}
        {loaded}
        {errorMsg}
        {content}
      </div>
    )
  }
}
const View = ({ char }) => {
  const { name, description, thumbnail, wiki, homepage, comics } = char
  let imgStyle = { objectFit: 'cover' }
  const searchString = 'image_not_available.jpg'
  if (thumbnail.includes(searchString)) {
    imgStyle = { objectFit: 'unset' }
  }
  return (
    <>
      <div className="char__basics">
        <img src={thumbnail} alt={name} style={imgStyle} />
        <div>
          <div className="char__info-name">{name} </div>
          <div className="char__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{description}</div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {comics.length > 0 ? null : 'There is no comisc with this character'}
        {comics.map((item, i) => {
          if (i > 9) {
            return
          }
          return (
            <li key={i} className="char__comics-item">
              {item.name}
            </li>
          )
        })}
      </ul>
    </>
  )
}
CharInfo.propTypes = { charId: PropTypes.number }

export default CharInfo
