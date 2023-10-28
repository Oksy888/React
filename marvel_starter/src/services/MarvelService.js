class MarvelService {
  _baseURL = 'https://gateway.marvel.com:443/v1/public/'
  _apikey = 'apikey=a86b63f1c5e5603d37a06e815ed44aa8'
  getResource = async (url) => {
    let res = await fetch(url)
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`)
    }
    return await res.json()
  }

  getAllCharacters = async () => {
    const res = await this.getResource(
      `${this._baseURL}characters?limit=9&offset=210&${this._apikey}`
    )
    return res.data.results.map(this._transformCharacter)
  }
  getCharacter = async (id) => {
    const res = await this.getResource(
      `${this._baseURL}characters/${id}?${this._apikey}`
    )
    return this._transformCharacter(res.data.results[0])
  }
  _transformCharacter = (char) => {
    return {
      name: char.name,
      description: char.description
        ? `${char.description.slice(0, 220)} ...`
        : 'This character has no data',
      thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
    }
  }
}

export default MarvelService
