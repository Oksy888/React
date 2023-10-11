import EmployesListItem from '../employes-list-item/employes-list-item'
import './employes-list.css'

const EmployesList = ({ data, onDelete, onToggleProp }) => {
  const elements = data.map((item) => {
    const { id, ...itemProps } = item
    return (
      <EmployesListItem
        key={id}
        {...itemProps}
        onToggleProp={(e) =>
          onToggleProp(id, e.currentTarget.getAttribute('data-toggle'))
        }
        onDelete={() => onDelete(id)}
      />
    )
  })
  //console.log(elements)
  return <ul className="app-list list-group">{elements}</ul>
}
export default EmployesList
