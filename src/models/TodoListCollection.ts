import TodoList from "./TodoList"
import { IOriginator } from "./Memento"
import Todo from "./Todo"

class TodoListCollection implements IOriginator<TodoListCollection> {
  private todoList: TodoList[] = []

  constructor(list: TodoList[] | null) {
    if (list) this.todoList = list
  }

  setTodoList(list: TodoList[]) {
    this.todoList = list
  }

  getTodoList() {
    return this.todoList
  }

  createMemento(): TodoListCollection {
    return new TodoListCollection(this.todoList.map(list => {
      const todoList = new TodoList(list.getTodos().map(todo => new Todo(todo.getMessage())))
      return todoList
    }))
  }

  restoreMemento(memento: TodoListCollection): void {
    this.todoList = memento.getTodoList()
  }
}

export default TodoListCollection