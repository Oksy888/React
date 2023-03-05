import { useEffect } from 'react'
import { useState } from 'react'
import Post from './Post'
const API_URL = 'https://jsonplaceholder.typicode.com/posts'
export default function Posts() {
  const [posts, setPosts] = useState([])
  const [error, setError] = useState('')
  const [loader, setLoader] = useState(true)

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const res = await fetch(API_URL)
  //       const posts = await res.json()
  //       setPosts(posts)
  //     } catch (error) {
  //       setError(error.message)
  //     }
  //     setLoader(false)
  //   }
  //   fetchData()
  // }, [])

  //2nd variant with IIFE invoked function
  useEffect(() => {
    ;(async function () {
      try {
        const res = await fetch(API_URL)
        const posts = await res.json()
        setPosts(posts)
      } catch (error) {
        setError(error.message)
      }
      setLoader(false)
    })()
  }, [])

  //3d variant
  // useEffect(() => {
  //   fetch(API_URL)
  //     .then((response) => response.json())
  //     .then((posts) => {
  //       setPosts(posts)
  //     })
  //     .catch((err) => setError(err.message))
  //     .finally(() => setLoader(false))
  // }, [])

  if (error) {
    return <h1> Error : {error}</h1>
  } else {
    return (
      <>
        <h1>Posts</h1>
        <hr />
        {loader ? (
          <h1> Loading...</h1>
        ) : (
          posts.map((somePost) => <Post key={somePost.id} {...somePost} />)
        )}
      </>
    )
  }
}
