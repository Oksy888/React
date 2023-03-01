function Post(props) {
  const { id, title, userId, body } = props

  return (
    <div>
      <small>{id} </small>
      <h1>{title} </h1>
      <p>{body} </p>
      <h3>{userId} </h3>
    </div>
  )
}

export default Post
