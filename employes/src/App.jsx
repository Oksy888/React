import { Component } from 'react'
import { v4 as uuidv4 } from 'uuid'

import AppFilter from './components/app-filter/app-filter'
import AppInfo from './components/app-info/app-info'
import EmployeesAddForm from './components/employes-add-form/employes-add-form'
import EmployeesList from './components/employes-list/employes-list'
import SearchPanel from './components/search-panel/search-panel'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [
        { name: 'John', salary: 1200, increase: true, rise: false, id: 1 },
        { name: 'Alex', salary: 3000, increase: false, rise: true, id: 2 },
        { name: 'Karl', salary: 600, increase: true, rise: false, id: 3 },
      ],
      term: '',
      filter: 'all',
    }
  }
  deleteItem = (id) => {
    this.setState(({ data }) => {
      /*const index = data.findIndex((elem) => elem.id === id)
      const before = data.slice(0, index)
      const after = data.slice(index + 1)
      const NewData = [...before, ...after]*/
      const NewData = data.filter((el) => el.id !== id)
      return {
        data: NewData,
      }
    })
  }
  addItem = (name, salary) => {
    const Newdata = {
      name,
      salary,
      increase: false,
      rise: false,
      id: uuidv4(),
    }
    this.setState(({ data }) => {
      const newArr = [...data, Newdata]
      return {
        data: newArr,
      }
    })
  }
  onToggleProp = (id, prop) => {
    this.setState(({ data }) => ({
      data: data.map((item) => {
        if (item.id === id) {
          return { ...item, [prop]: !item[prop] }
        }
        return item
      }),
    }))
    /*this.setState(({ data }) => {
      const index = data.findIndex((el) => el.id === id)
      const old = data[index]
      const newItem = { ...old, increase: !old.increase }
      const newArr = [
        ...data.slice(0, index),
        newItem,
        ...data.slice(index + 1),
      ]
      return {
        data: newArr,
      }
    })*/
  }
  searchEmpl = (items, term) => {
    if (term.length === 0) {
      return items
    }
    return items.filter((el) => {
      return el.name.indexOf(term) > -1
    })
  }
  onUpdateSearch = (term) => {
    this.setState({ term })
  }
  filterPost = (items, filter) => {
    switch (filter) {
      case 'rise':
        return items.filter((el) => el.rise)
      case 'increase':
        return items.filter((el) => el.increase)
      case 'moreThan1000':
        return items.filter((el) => el.salary > 1000)
      default:
        return items
    }
  }
  onFilterSelect = (filter) => {
    this.setState({ filter })
  }
  render() {
    const { data, term, filter } = this.state
    const increased = data.filter((el) => el.increase).length
    const visibleData = this.filterPost(this.searchEmpl(data, term), filter)
    const countBonus = data.length - increased
    return (
      <div className="app">
        <AppInfo
          countItems={data.length}
          countIncrease={increased}
          countBonus
        />
        <div className="search-panel">
          <SearchPanel onUpdateSearch={this.onUpdateSearch} />
          <AppFilter filter={filter} onFilterSelect={this.onFilterSelect} />
        </div>
        <EmployeesList
          onToggleProp={this.onToggleProp}
          data={visibleData}
          onDelete={this.deleteItem}
        />
        <EmployeesAddForm onAdd={this.addItem} />
      </div>
    )
  }
}

export default App
