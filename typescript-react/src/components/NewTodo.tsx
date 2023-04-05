import React, { useRef } from 'react';

import './NewTodo.css';

interface NewTodoProps {
  onAddTodo: (todoText: string) => void;
}

const NewTodo: React.FC<NewTodoProps> = (props) => {
  const textInputRef = useRef<HTMLInputElement>(null);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    const enteredText = textInputRef.current!.value;

    props.onAddTodo(enteredText);
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="form-control">
        <label htmlFor="todo-text">Todo text</label>
        <input ref={textInputRef} type="text" id="todo-text" />
      </div>
      <button type="submit">Add todo</button>
    </form>
  );
};

export default NewTodo;
