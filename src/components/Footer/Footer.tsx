import React from 'react';
import { SortType } from '../../types/SortType';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  sortTodoBy: SortType;
  onClick: (value: SortType) => void;
};

export const Footer: React.FC<Props> = ({ todos, sortTodoBy, onClick }) => {
  const visibileTodo = todos.filter(todo => !todo.completed);
  const disabledBtn = todos.some(todo => todo.completed);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {visibileTodo.length} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: sortTodoBy === SortType.SORT_ALL,
          })}
          data-cy="FilterLinkAll"
          onClick={() => onClick(SortType.SORT_ALL)}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: sortTodoBy === SortType.SORT_ACTIVE,
          })}
          data-cy="FilterLinkActive"
          onClick={() => onClick(SortType.SORT_ACTIVE)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: sortTodoBy === SortType.SORT_COMPLETED,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => onClick(SortType.SORT_COMPLETED)}
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!disabledBtn}
      >
        Clear completed
      </button>
    </footer>
  );
};
