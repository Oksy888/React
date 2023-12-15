import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import useMarvelService from '../../services/MarvelService'
import Spinner from '../spinner/Spinner'
import ErrorMessage from '../errorMessage/ErrorMessage'

import './singleComicPage.scss'

const SingleComicPage = () => {
  const { comicId } = useParams()
  const [comic, setComic] = useState([])
  const { loading, error, getSingleComic, clearError } = useMarvelService()

  useEffect(() => {
    updateComic()
  }, [comicId])
  const updateComic = () => {
    clearError()
    getSingleComic(comicId).then(onComicLoaded)
  }

  const onComicLoaded = (comic) => {
    setComic(comic)
  }

  const loaded = loading ? <Spinner /> : null
  const errorMsg = error ? <ErrorMessage /> : null
  const content = !(loading || error || !comic) ? <View comic={comic} /> : null
  return (
    <>
      {loaded}
      {errorMsg}
      {content}
    </>
  )
}
const View = ({ comic }) => {
  const { title, description, thumbnail, pages, price, language } = comic
  return (
    <div className="single-comic">
      <img src={thumbnail} alt={title} className="single-comic__img" />
      <div className="single-comic__info">
        <h2 className="single-comic__name">{title}</h2>
        <p className="single-comic__descr">{description}</p>
        <p className="single-comic__descr">{pages}</p>
        <p className="single-comic__descr">Language: {language}</p>
        <div className="single-comic__price">{price}</div>
      </div>
      <Link to="/comics" className="single-comic__back">
        Back to all
      </Link>
    </div>
  )
}

export default SingleComicPage
