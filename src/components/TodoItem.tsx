import "../styles/components/item.scss";
import { useState } from "react";
import { Todo } from "./TodoList";
import { Button } from "./Button";

type todoItemProps = {
  todo: Todo;
  onCheckBoxChange: () => void; 
  onDelete: () => void;
  onTodoSave: (newTitle: string) => void;
};

export const TodoItem = ({
  todo,
  onCheckBoxChange,
  onDelete,
  onTodoSave,
}: todoItemProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const [newInputValue, setNewInputValue] = useState(todo.title);

  return (
    <li className="task">
      <div className="content">
        {isEdit ? (
          <form
            className="item-form"
            onSubmit={(e) => {
              e.preventDefault();
              onTodoSave(newInputValue);
              setIsEdit(false);
            }}
          >
            <input
              type="text"
              className="item-title"
              value={newInputValue}
              onChange={(e) => {
                setNewInputValue(e.target.value);
              }}
            />
          </form>
        ) : (
          <h3 className="item-title">{todo.title}</h3>
        )}
      </div>

      <div className="actions">
        <Button
          variant={isEdit ? "primary" : "secondary"}
          onButtonClick={() => {
            setIsEdit(!isEdit);

            if (isEdit) {
              setNewInputValue(todo.title);
            }
          }}
        >
          {isEdit ? "Cancel" : "Edit"}
        </Button>
        <Button onButtonClick={onDelete} variant="black">
          Delete
        </Button>
      </div>
    </li>
  );
};
