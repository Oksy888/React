import './app-filter.css'
const AppFilter = ({ filter, onFilterSelect }) => {
  const buttonsData = [
    {
      name: 'all',
      label: 'All employes',
    },
    {
      name: 'rise',
      label: 'Employes to bonus',
    },
    {
      name: 'moreThan1000',
      label: 'Salary more than 1000$',
    },
  ]
  const buttons = buttonsData.map(({ name, label }) => {
    const active = filter === name
    const clazz = active ? 'btn-light' : 'btn-outline-light'
    return (
      <button
        type="button"
        key={name}
        className={`btn ${clazz}`}
        onClick={() => onFilterSelect(name)}
      >
        {label}
      </button>
    )
  })
  return <div className="btn-group">{buttons}</div>
}
export default AppFilter
