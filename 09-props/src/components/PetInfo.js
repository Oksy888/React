function PetInfo(props) {
  const { animal, age, hasAnimal } = props
  console.log(props)
  const text = hasAnimal
    ? `My ${animal} is ${age} years old`
    : 'You don`t have an animal'
  return hasAnimal ? (
    <h1>{`My ${animal} is ${age} years old`}</h1>
  ) : (
    <h1>You don`t have an animal</h1>
  )
}

export default PetInfo
