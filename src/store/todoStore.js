import { action, computed, makeObservable, observable } from 'mobx';
import uniqid from 'uniqid';

class ToDoStore {
  todos = [
    { id: uniqid(), title: 'Take a walk with the dog', completed: false },
    { id: uniqid(), title: 'Cook a meal', completed: false },
    { id: uniqid(), title: 'Learn react', completed: false },
  ];

  constructor() {
    makeObservable(this, {
      todos: observable,
      totalTodosCount: computed,
      completedTodosCount: computed,
      addTodo: action,
      remove: action,
      completedTodo: action,
    });
  }

  addTodo(todo) {
    this.todos.push({
      id: uniqid(),
      title: todo,
      completed: false,
    });
  }

  get completedTodosCount() {
    return this.todos.filter((todo) => todo.completed === true).length;
  }

  get totalTodosCount() {
    return this.todos.length;
  }

  remove(id) {
    this.todos = this.todos.filter((item) => item.id !== id);
  }

  completedTodo(id) {
    this.todos = this.todos.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item,
    );
  }
}

export default new ToDoStore();
