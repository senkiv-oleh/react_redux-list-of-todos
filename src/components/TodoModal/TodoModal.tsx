import React, { useEffect } from 'react';
import { Loader } from '../Loader';
import { currentTodoSlice } from '../../features/currentTodo';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { currentUserSlice } from '../../features/currentUser';
import { getUser } from '../../api';

export const TodoModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const { actions: currentTodoActions } = currentTodoSlice;
  const { actions: currentUserActions } = currentUserSlice;

  const currentTodo = useAppSelector(state => state.currentTodo);

  const currentUser = useAppSelector(state => state.currentUser);

  useEffect(() => {
    if (currentTodo) {
      getUser(currentTodo.userId).then(user => {
        dispatch(currentUserActions.setCurrentUser(user));
      });
    }
  }, [dispatch, currentTodo, currentUserActions]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {currentTodo && currentUser ? (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${currentTodo?.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => {
                dispatch(currentTodoActions.clearCurrentTodo());
                dispatch(currentUserActions.clearCurrentUser());
              }}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {currentTodo?.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}
              <a href="mailto:Sincere@april.biz">{currentUser?.name}</a>
            </p>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};
