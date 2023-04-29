import "../styles/App.scss";

type FormProps = {
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFormSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  inputInValue: string;
};

export const Form = ({ onInputChange, onFormSubmit, inputInValue }: FormProps) => {
  return (
    <div>
      <h1>Add Todo</h1>
    <form
    className="new-task-form"
      onSubmit={(event) => {
        onFormSubmit(event);
      }}
    >
      <input
        id="todo-title"
        type="text"
        value={inputInValue}
        placeholder="Do something..."
        onChange={(event) => {
          onInputChange(event);
        }}
      />
      <button type="submit" id="todo-submit">Add todo</button>
    </form>
    </div>
  );
};
