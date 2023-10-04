import EmployesListItem from '../employes-list-item/employes-list-item'
import './employes-list.css'

const EmployesList = ({ data }) => {
  const elements = data.map((item) => {
    const { id, ...itemProps } = item
    return <EmployesListItem key={id} {...itemProps} />
  })
  console.log(elements)
  return <ul className="app-list list-group">{elements}</ul>
}
export default EmployesList
