import React, { useEffect } from 'react';
import { ErrorType } from '../../types/ErrorType';
import classNames from 'classnames';

type Props = {
  errorMessageTodo: ErrorType;
  setError: (value: ErrorType) => void;
};

export const ErrorMessage: React.FC<Props> = ({
  errorMessageTodo,
  setError,
}) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: !errorMessageTodo },
      )}
    >
      <button data-cy="HideErrorButton" type="button" className="delete" />
      {/* show only one message at a time */}
      {errorMessageTodo}
    </div>
  );
};
