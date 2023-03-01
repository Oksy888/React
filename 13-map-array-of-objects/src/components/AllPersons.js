import './Person.css'
import persons from './data/persons'
import Person from './Person'
function AllPersons() {
  return (
    <div className="cards">
      {persons.map((person) => {
        return <Person key={person.id} {...person} />
      })}
    </div>
  )
}
export default AllPersons
