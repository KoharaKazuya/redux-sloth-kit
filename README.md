# NO LONGER MAINTAINED

Use [Redux Toolkit](https://redux-toolkit.js.org/).

---

# redux-sloth-kit

Dear sloth, this is a Redux and TypeScript friendly tool.

## Motivation

Reducing Redux boilerplate.

We sometimes feel not good.

- encode action, dispatch, handle and decode action
- many times nested assignments for immutable update
- type annotations that seem obvious to me

Redux is a great tool, but we can feel troublesome because of so simple.

`redux-sloth-kit` was created to reduce the problem.

## Install

```console
$ npm install redux-sloth-kit
```

```console
$ yarn add redux-sloth-kit
```

## Usage

```typescript
import { createStore } from "redux";
import { createModule } from "redux-sloth-kit";

const initialState = [{ text: "Example", completed: false, id: 0 }];
const todos = createModule({
  initialState,
  reducers: {
    // define reducer as a just function
    addTodo(text: string) {
      // use state as `this`
      const id = this.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1;
      // mutation is automatically converted into immutable update by Immer
      this.push({ text, completed: false, id });
    }
  },
  selectors: {
    getCompletedTodoCount() {
      return state =>
        state.reduce((count, todo) => (todo.completed ? count + 1 : count), 0);
    }
  }
});

// combine modules into one
const { reducer, actionCreators, selectors } = combineModules({
  todos,
  visibilityFilte
});

// use module as a just reducer
const store = createStore(reducer);

// dispatch action like function call
store.dispatch(actionCreators.addTodo("Example 2"));

// actionCreators is well-type-defined so below code causes error
// store.dispatch(actionCreators.addTodo(3));
```

For more detail, see <./example/> directory.
