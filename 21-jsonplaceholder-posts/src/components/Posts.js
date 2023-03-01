import { useEffect } from 'react'
import { useState } from 'react'
import Post from './Post'

export default function Posts() {
  const [posts, setPosts] = useState([])
  const [error, setError] = useState('')
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((posts) => {
        setPosts(posts)
      })
      .catch((err) => setError(err.message))
  }, [])
  if (error) {
    return <h1> Error : {error}</h1>
  } else {
    return (
      <div>
        {posts.map((somePost) => (
          <Post key={somePost.id} {...somePost} />
        ))}
      </div>
    )
  }
}
