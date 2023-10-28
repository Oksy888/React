import { Component } from 'react'
import { v4 as uuidv4 } from 'uuid'
import AppFilter from './components/app-filter/app-filter'
import AppInfo from './components/app-info/app-info'
import EmployeesAddForm from './components/employes-add-form/employes-add-form'
import EmployesList from './components/employes-list/employes-list'
import SearchPannel from './components/search-panel/search-panel'

export class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [
        { name: 'John', salary: 800, increase: true, rise: false, id: 1 },
        { name: 'Alex', salary: 3000, increase: false, rise: true, id: 2 },
        { name: 'Karl', salary: 50000, increase: true, rise: true, id: 3 },
      ],
    }
  }
  deletItem = (id) => {
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
    if (name !== '' || salary !== '') {
      if (name.length > 3) {
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
      } else {
        alert('Name must contain min 3 symbols')
      }
    }
    esle
    {
      alert('Empty data in the name and salary fields')
    }
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

  render() {
    const { data } = this.state
    const increased = data.filter((el) => el.increase).length

    return (
      <div className="app">
        <AppInfo countItems={data.length} countIncrease={increased} />
        <div className="search-panel">
          <SearchPannel />
          <AppFilter />
        </div>
        <EmployesList
          onToggleProp={this.onToggleProp}
          data={this.state.data}
          onDelete={this.deletItem}
        />
        <EmployeesAddForm onAdd={this.addItem} />
      </div>
    )
  }
}
