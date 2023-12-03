import { useHttp } from '../hooks/http.hook'

const useMarvelService = () => {
  const { loading, request, error, clearError } = useHttp()
  const _baseURL = 'https://gateway.marvel.com:443/v1/public/'
  const _apikey = 'apikey=a86b63f1c5e5603d37a06e815ed44aa8'
  const _baseOffset = 210

  const getAllCharacters = async (offset = _baseOffset) => {
    const res = await request(
      `${_baseURL}characters?limit=9&offset=${offset}&${_apikey}`
    )
    return res.results.map(_transformCharacter)
  }
  const getCharacter = async (id) => {
    const res = await request(`${_baseURL}characters/${id}?${_apikey}`)
    return _transformCharacter(res.results[0])
  }
  const getComics = async (offset = _baseOffset) => {
    const res = await request(
      `${_baseURL}comics?issueNumber=25&limit=8&offset=${offset}&${_apikey}`
    )
    return res.results.map(_transformComics)
  }
  const _transformCharacter = (char) => {
    return {
      id: char.id,
      name: char.name,
      description: char.description
        ? `${char.description.slice(0, 220)} ...`
        : 'This character has no data',
      thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics: char.comics.items,
    }
  }
  const _transformComics = (char) => {
    return {
      id: char.id,
      title: char.title,
      description: char.textObjects.text
        ? `${char.textObjects.text.slice(0, 220)} ...`
        : 'This character has no data',
      thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
      price: char.prices.prise,
      pages: char.pageCount,
      language: char.textObjects.language,
    }
  }
  return {
    loading,
    error,
    getAllCharacters,
    getCharacter,
    _transformCharacter,
    clearError,
    getComics,
  }
}

export default useMarvelService
