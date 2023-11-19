import { useEffect, useState } from 'react'
import axios from 'axios'

export default function useLoadMoreCharacters(pageNumb) {
  const _baseURL = 'https://gateway.marvel.com:443/v1/public/'
  const _apikey = 'apikey=a86b63f1c5e5603d37a06e815ed44aa8'
  const _baseOffset = 210
  const [loadingUse, setLoadingUse] = useState(true)
  const [errorUse, setErrorUse] = useState(false)
  const [chars, setChar] = useState([])
  const [hasMore, setHasMore] = useState(false)
  useEffect(() => {
    setLoadingUse(true)
    setErrorUse(false)
    axios({
      method: 'GET',
      url: `${_baseURL}characters?limit=9&offset=${_baseOffset}&${_apikey}`,
      params: { page: pageNumb },
    })
      .then((res) => {
        console.log(res.data.results[0])
        setChar((prevChars) => {
          return [
            ...new Set([
              ...prevChars,
              ...res.data.results[0].map((c) => c.name),
            ]),
          ]
        })
        setHasMore(res.data.results[0].length > 0)
        setLoadingUse(false)
      })
      .catch(setErrorUse(true))
  }, [pageNumb])
  return { loadingUse, errorUse, chars, hasMore }
}
