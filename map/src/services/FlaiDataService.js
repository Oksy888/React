class FlaiDataService {
  _baseURL = 'https:sys-datapoint.flaidata.com/api/app/MusicExtendedData_v2?'
  headers = {
    securityKey:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZWNyZXQiOiJ3b3JkIiwibmJmIjoxNjc0ODA5MjE2LCJleHAiOjE5OTA0Mjg0MTYsImlhdCI6MTY3NDgwOTIxNiwiaXNzIjoiU2VydmVyIiwiYXVkIjoiQ2xpZW50In0.6i_jgx_kOn0_PR1IJXfgj4JggNDeNvbLgLHZ-8N7TOE',
    applicationId: 1,
    appVersion: 1,
    deviceId: '7a9d25d1-5a7d-40df-b58d-be8adb02ca8b',
  }
  id = '7283588810008742688'
  getResource = async (url, headers) => {
    let res = await fetch(url, headers)
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`)
    }
    return await res.json()
  }

  getAllCharacters = async () => {
    const res = await this.getResource(
      `${this._baseURL}characters?limit=9&offset=${offset}`
    )
    return res.data.results.map(this._transformCharacter)
  }
  getItem = async (id, headers) => {
    const res = await this.getResource(
      `${this._baseURL}musicId=${id}&showrelated=false&showInCharts=false&period=365&withNegativeTrend=false&cutStates=true&limitVideos=1`,
      { headers: headers }
    )
    return this._transformItem(res.data.musicLocationExtended)
  }
  _transformItem = (item) => {
    return {
      id: item.locationCode,
      name: item.locationCode,
      value: item.rate,
      fill: am4core.color('#7367F0'),
    }
  }
}

export default FlaiDataService
