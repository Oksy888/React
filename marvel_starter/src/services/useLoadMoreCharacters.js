import { useEffect, useState } from 'react'
import axios from 'axios'

import MarvelService from './MarvelService'

export default function useLoadMoreCharacters(offset) {
  const _baseURL = 'https://gateway.marvel.com:443/v1/public/'
  const _apikey = 'apikey=a86b63f1c5e5603d37a06e815ed44aa8'
  const [loadingUse, setLoadingUse] = useState(true)
  const [errorUse, setErrorUse] = useState(false)
  const [chars, setChars] = useState([])
  const [hasMoreItems, setHasMoreItems] = useState(false)

  const marvelService = new MarvelService()

  useEffect(() => {
    setChars([])
  }, [])
  useEffect(() => {
    setLoadingUse(true)
    setErrorUse(false)
    axios({
      method: 'GET',
      url: `${_baseURL}characters?limit=9&offset=${offset}&${_apikey}`,
      //params: { page: pageNumb },
    })
      .then((res) => {
        console.log(res.data.data.results)

        setChars((prevChars) => [
          ...prevChars,
          ...res.data.data.results.map(marvelService._transformCharacter),
        ])

        setHasMoreItems(res.data.data.results.length > 0)
        setLoadingUse(false)
      })
      .catch((e) => {
        if (axios.isCancel(e)) return
        setErrorUse(true)
      })
  }, [offset])
  return { loadingUse, errorUse, chars, hasMoreItems }
}
