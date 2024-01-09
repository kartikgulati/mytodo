
import React, {useState} from 'react'

export const EditTodoForm = ({editTodo, task }) => {
    const [value,setValue] = useState(task.task)
    const handleSubmit = e =>{
        e.preventDefault();

        editTodo(value, task.id);
    }
  return (
    <form className='TodoForm' onSubmit={handleSubmit}>
        <input type='text' value={value} className='todo-input' placeholder='Update/Edit your task'onChange={(e) => setValue(e.target.value) } required/>
        <button type='submit' className='todo-btn'>Update</button>
    </form>
  )
}
