import './randomChar.scss'
import MarvelService from '../../services/MarvelService'
import mjolnir from '../../resources/img/mjolnir.png'
import { Component } from 'react/cjs/react.production.min'
import Spinner from '../spinner/Spinner'
import ErrorMessage from '../errorMessage/ErrorMessage'

class RandomChar extends Component {
  state = {
    char: {},
    loading: true,
    error: false,
  }
  marvelService = new MarvelService()
  componentDidMount() {
    console.log('mount')
    this.updateChar()
    // this.timerId = setInterval(this.updateChar, 3000)
  }
  componentWillUnmount() {
    console.log('unmount')
    //clearInterval(this.timerId)
  }
  updateChar = () => {
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)
    this.onLoadingChar()
    this.marvelService
      .getCharacter(id)
      .then(this.onCharLoaded)
      .catch(this.onError)
  }
  onLoadingChar = () => {
    this.setState({ loading: true })
  }
  onCharLoaded = (char) => {
    console.log('update')
    this.setState({ char, loading: false, error: false })
  }
  onError = () => {
    this.setState({ loading: false, error: true })
  }
  render() {
    console.log('render')
    const { char, loading, error } = this.state
    const loaded = loading ? <Spinner /> : null
    const errorMsg = error ? <ErrorMessage /> : null
    const content = !(loading || error) ? <View char={char} /> : null
    return (
      <div className="randomchar">
        {loaded}
        {errorMsg}
        {content}
        <div className="randomchar__static">
          <p className="randomchar__title">
            Random character for today!
            <br />
            Do you want to get to know him better?
          </p>
          <p className="randomchar__title">Or choose another one</p>
          <button onClick={this.updateChar} className="button button__main">
            <div className="inner">try it</div>
          </button>
          <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
        </div>
      </div>
    )
  }
}

const View = ({ char }) => {
  const { name, description, thumbnail, wiki, homepage } = char
  const searchString = 'image_not_available.jpg'

  return (
    <div className="randomchar__block">
      <img
        src={thumbnail}
        alt="Random character"
        className="randomchar__img"
        style={{
          objectFit: thumbnail.includes(searchString) ? 'contain' : 'cover',
        }}
      />
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">{description}</p>
        <div className="randomchar__btns">
          <a href={homepage} className="button button__main">
            <div className="inner">homepage</div>
          </a>
          <a href={wiki} className="button button__secondary">
            <div className="inner">wiki</div>
          </a>
        </div>
      </div>
    </div>
  )
}
export default RandomChar
