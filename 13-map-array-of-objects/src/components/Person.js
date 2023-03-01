import './Person.css'
function Person(props) {
  const { firstName, lastName, email, img } = props

  return (
    <div className="innerCard">
      <img src={img} alt={`myPhoto-${lastName}`} />
      <h2>
        {firstName} {lastName}
      </h2>
      <h4>{email}</h4>
    </div>
  )
}
export default Person
