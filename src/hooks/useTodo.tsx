import { useState } from 'react'
import TodoList from '../models/TodoList'

import { CareTaker } from '../models/Memento';
import TodoListCollection from '../models/TodoListCollection';

const careTaker = new CareTaker<TodoListCollection>()
const originator = new TodoListCollection([])

function useTodo() {
  const [todoListCollection, setTodoListCollection] = useState<TodoList[]>([])

  const reRender = (other: TodoList[] = []) => {
    setTodoListCollection(
      [...todoListCollection, ...other]
    )
  }

  const addTodoList = () => {
    originator.setTodoList(todoListCollection)
    careTaker.saving(originator)

    const todoList = new TodoList()

    reRender([todoList])
  }

  const addTodo = (TodoList: TodoList, message: string) => {
    originator.setTodoList(todoListCollection)
    careTaker.saving(originator)

    TodoList.add(message)
    reRender()
  }

  const allAddTodo = (message: string) => {
    originator.setTodoList(todoListCollection)
    careTaker.saving(originator)

    todoListCollection.forEach((list) => {
      list.add(message)
    })
    reRender()
  }

  const allRemoveTodo = () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      originator.setTodoList(todoListCollection)
      careTaker.saving(originator)

      console.log(originator)

      todoListCollection.forEach((list) => {
        list.getTodos().forEach(todo => {
          todo.remove()
        })
      })

      reRender()
    }
  }

  const rollback = () => {
    careTaker.restoring(originator)
    console.log(originator)
    setTodoListCollection(originator.getTodoList())
  }

  return {
    todoListCollection,
    addTodoList,
    addTodo,
    allAddTodo,
    allRemoveTodo,
    rollback
  }
}

export default useTodo