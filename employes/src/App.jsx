import './App.css'
import AppFilter from './components/app-filter/app-filter'
import AppInfo from './components/app-info/app-info'
import EmployeesAddForm from './components/employes-add-form/employes-add-form'
import EmployesList from './components/employes-list/employes-list'
import SearchPannel from './components/search-panel/search-panel'

function App() {
  const data = [
    { name: 'John', salary: 800, increase: true, id: 1 },
    { name: 'Alex', salary: 3000, increase: false, id: 2 },
    { name: 'Karl', salary: 50000, increase: true, id: 3 },
  ]
  return (
    <div className="app">
      <AppInfo />
      <div className="search-panel">
        <SearchPannel />
        <AppFilter />
      </div>
      <EmployesList data={data} />
      <EmployeesAddForm />
    </div>
  )
}

export default App
