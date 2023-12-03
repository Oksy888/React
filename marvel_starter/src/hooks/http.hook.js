import { useState, useCallback } from 'react'
import axios from 'axios'

export const useHttp = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const request = useCallback(
    async (
      url,
      method = 'GET',
      body = null,
      headers = { 'Content-Type': 'application/json' }
    ) => {
      setLoading(true)
      try {
        const response = await axios.get(url, { method, body, headers })

        if (response.status !== 200) {
          throw new Error(`Could not fetch ${url}, status: ${response.status}`)
        }
        const data = response.data.data

        setLoading(false)
        return data
      } catch (e) {
        setLoading(false)
        setError(e.message)
        throw e
      }
    },
    []
  )
  const clearError = useCallback(() => setError(null), [])
  return { loading, error, request, clearError }
}
