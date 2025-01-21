/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';

import { Todo } from './types/Todo';
import { SortType } from './types/SortType';

import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/Footer/Footer';
import { ErrorMessage } from './components/ErrorMessage/ErrorMessage';
import { ErrorType } from './types/ErrorType';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>(todos);
  const [errorMessageTodo, setErrorMessageTodo] = useState<ErrorType>(
    ErrorType.ERROR_DEFAULT,
  );
  const [sortTodoBy, setSortTodoBy] = useState<SortType>(SortType.SORT_ALL);

  useEffect(() => {
    setTimeout(() => {
      getTodos()
        .then(data => setTodos(data))
        .catch(() => setErrorMessageTodo(ErrorType.ERROR_LOADING));
    }, 200);
  }, []);

  useEffect(() => {
    const newTodo = todos.filter(todo => {
      if (SortType.SORT_ACTIVE === sortTodoBy) {
        return !todo.completed;
      }

      if (SortType.SORT_COMPLETED === sortTodoBy) {
        return todo.completed;
      }

      return todo;
    });

    setFilteredTodos(newTodo);
  }, [todos, sortTodoBy]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <TodoList filteredTodos={filteredTodos} />

        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <Footer
            todos={todos}
            sortTodoBy={sortTodoBy}
            onClick={setSortTodoBy}
          />
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <ErrorMessage
        errorMessageTodo={errorMessageTodo}
        setError={setErrorMessageTodo}
      />
    </div>
  );
};
