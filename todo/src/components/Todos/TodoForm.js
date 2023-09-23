function TodoForm() {
  return (
    <div>
      <form>
        <label>Todo App</label>
        <input
          type="text"
          id="todo"
          name="todo"
          placeholder="Enter new todo"
        ></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default TodoForm
