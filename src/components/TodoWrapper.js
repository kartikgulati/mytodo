
import React, {useEffect, useState} from 'react'

import { TodoForm } from './TodoForm'
import {v4 as uuidv4 } from 'uuid';
import { Todo } from './Todo';

import { EditTodoForm } from './EditTodoForm';

// const getLocalTodos = () =>{
//   let todos = localStorage.getItem('todos');
//   console.log(todos);

//   if (todos){
//     return JSON.parse(localStorage.getItem('todos'));
//   }else{
//     return[];
//   }
// }

export const TodoWrapper = () => {
    const [todos, setTodos] = useState([])

    const addTodo = todo => {
        setTodos([...todos,{id: uuidv4(), task:todo, completed:false, isEditing:false}])
        console.log(todos)
        
    }

    const toggleComplete = (id) => {
        setTodos(
          todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          )
        );
      }

      const deleteTodo = id => {
        setTodos(todos.filter(todo => todo.id !== id))
      }

      const editTodo = (id) => {
        setTodos(
          todos.map((todo) =>
            todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
          )
        );
      }

      const editTask = (task, id) => {
        setTodos(
          todos.map(todo =>
            todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
          )
        )
      }

      const current = new Date();

      const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

      // eslint-disable-next-line no-unused-vars
      const today = new Date(),
    //  time = `${today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()}`;

     time  = new Date().toLocaleTimeString();
    const [currentTime, setCurrentTime] = useState(time);

    const updateTime = () => {
        let time = new Date().toLocaleTimeString();
        setCurrentTime(time);
    }

    setInterval(updateTime,1000);
     
    useEffect(() =>{
        localStorage.setItem('todos', JSON.stringify(todos))
    },[todos]);  

     
  return (
    <div className='box TodoWrapper'>
        <h1>My tasks For the day!</h1>
        <h3> {date} - {currentTime}</h3>

        <TodoForm addTodo={addTodo}/>
        {todos.map((todo, index) => (

            todo.isEditing ?(
                <EditTodoForm editTodo={editTask} task={todo}/>
            ) : (
            <Todo task = {todo} key={index}
            toggleComplete ={toggleComplete}
            deleteTodo={deleteTodo}
            editTodo={editTodo}/>
        )) )}
        
    </div>
    
  )
}
