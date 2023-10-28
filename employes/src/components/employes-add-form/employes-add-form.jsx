import { Component } from 'react'
import './employees-add-form.css'

class EmployeesAddForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      salary: '',
    }
  }

  onValueChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }
  onSubmit = (e) => {
    e.preventDefault()
    const { name, salary } = this.state
    if (name.length < 3 || !salary) return
    const { onAdd } = this.props
    onAdd(name, salary)
    this.setState({
      name: '',
      salary: '',
    })
  }
  render() {
    const { name, salary } = this.state
    const newItem = {
      name: name,
      salary: salary,
    }

    return (
      <div className="app-add-form">
        <h3>Add new employee</h3>
        <form className="add-form d-flex" onSubmit={this.onSubmit}>
          <input
            type="text"
            name="name"
            value={name}
            className="form-control new-post-label"
            placeholder="His name?"
            onChange={this.onValueChange}
          />
          <input
            type="number"
            name="salary"
            value={salary}
            className="form-control new-post-label"
            placeholder="Salary in $?"
            onChange={this.onValueChange}
          />

          <button type="submit" className="btn btn-outline-light">
            Add
          </button>
        </form>
      </div>
    )
  }
}

export default EmployeesAddForm
