import { useState, useEffect } from 'react'
import './style.css'
import TodoForm from './TodoForm'
import { TodoList } from './TodoList'

function App() {
  const [todos, SetTodos] = useState(() => {
    const localValue = localStorage.getItem('ITEMS')
    if (localValue == null) return []
    return JSON.parse(localValue)
  })

  useEffect(() => {
    localStorage.setItem('ITEMS', JSON.stringify(todos))
  }, [todos])

  function addTodo(title) {
    SetTodos((currentTodos) => {
      return [
        ...currentTodos,
        { id: crypto.randomUUID(), title, completed: false },
      ]
    })
  }
  function toggleTodo(id, completed) {
    SetTodos((currentTodos) => {
      return currentTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed }
        }
        return todo
      })
    })
  }
  function deleteTodo(id) {
    SetTodos((currentTodos) => {
      return currentTodos.filter((todo) => todo.id !== id)
    })
  }
  console.log(todos)
  return (
    <>
      <TodoForm onSubmit={addTodo} />
      <h1 className="header">Todo List</h1>
      <TodoList todos={todos} deleteTodo={deleteTodo} toggleTodo={toggleTodo} />
    </>
  )
}

export default App
