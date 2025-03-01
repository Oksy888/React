import './randomChar.scss'
import useMarvelService from '../../services/MarvelService'
import mjolnir from '../../resources/img/mjolnir.png'
import Spinner from '../spinner/Spinner'
import ErrorMessage from '../errorMessage/ErrorMessage'
import { useEffect, useState } from 'react'

const RandomChar = () => {
  const [char, setChar] = useState({})
  const { loading, error, getCharacter, clearError } = useMarvelService()

  useEffect(() => {
    updateChar()
    const timerId = setInterval(updateChar, 60000)
    return () => {
      clearInterval(timerId)
    }
  }, [])

  const updateChar = () => {
    clearError()
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)
    getCharacter(id).then(onCharLoaded)
  }

  const onCharLoaded = (char) => {
    setChar(char)
  }

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
        <button onClick={updateChar} className="button button__main">
          <div className="inner">try it</div>
        </button>
        <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
      </div>
    </div>
  )
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
          objectFit: thumbnail === searchString ? 'contain' : 'cover',
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
