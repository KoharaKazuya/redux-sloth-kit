import { createModule } from "redux-sloth-kit";

const initialState = [{ text: "Example", completed: false, id: 0 }];

export default createModule({
  initialState,
  reducers: {
    addTodo(text: string) {
      const id = this.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1;
      this.push({ text, completed: false, id });
    },
    deleteTodo(id: number) {
      return this.filter(todo => todo.id !== id);
    },
    editTodo(id: number, text: string) {
      const target = this.find(todo => todo.id === id);
      if (target) target.text = text;
    },
    completeTodo(id: number) {
      const target = this.find(todo => todo.id === id);
      if (target) target.completed = !target.completed;
    },
    completeAllTodos() {
      const areAllMarked = this.every(todo => todo.completed);
      this.forEach(todo => (todo.completed = !areAllMarked));
    },
    clearCompleted() {
      return this.filter(todo => todo.completed === false);
    }
  },
  selectors: {
    getCompletedTodoCount() {
      return state =>
        state.reduce((count, todo) => (todo.completed ? count + 1 : count), 0);
    }
  }
});
