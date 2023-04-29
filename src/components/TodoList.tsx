import { useState } from "react";
import { Form } from "./Form";
import { TodoItem } from "./TodoItem";
import "../styles/App.scss";

export type Todo = {
  title: string;
  id: string;
  isDone: boolean;
  description?: string;
};

export const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="container">

      <Form
        inputInValue = {inputValue}
        onFormSubmit={(event) => {
          event.preventDefault();

          const newTodo: Todo = {
            title: inputValue,
            id: Math.random().toString(),
            isDone: false,
          };

          setTodos([...todos, newTodo]);

          setInputValue("");
        }}
        onInputChange={(event) => {
          const newValue = event.target.value;
          setInputValue(newValue);
        }}
      />

      <main>
        {todos.map((todo) => {
          return (
            <section className="task-list">
              <TodoItem
                onTodoSave={(newTitle) => {
                  const newTodos = todos.map((todoItem) => {
                    if (todoItem.id === todo.id) {
                      return {
                        ...todoItem,
                        title: newTitle,
                      };
                    }

                    return todoItem;
                  });

                  setTodos(newTodos);
                }}
                todo={todo}
                key={todo.id}
                onDelete={() => {
                  const newTodos = todos.filter((todoItem) => {
                    return todoItem.id !== todo.id;
                  });

                  setTodos(newTodos);
                }}
                onCheckBoxChange={() => {
                  const newTodos = todos.map((todoItem) => {
                    if (todoItem.id === todo.id) {
                      return {
                        ...todoItem,
                        isDone: !todoItem.isDone,
                      };
                    }

                    return todoItem;
                  });

                  setTodos(newTodos);
                }}
              />
            </section>
          );
        })}
      </main>
    </div>
  );
};
