/* eslint-disable */
import React, { useEffect } from 'react';
import { todosSlice } from '../../features/todos';
import { currentTodoSlice } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { getTodos, } from '../../api';
import { currentUserSlice } from '../../features/currentUser';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { actions: todoActions } = todosSlice;
  const { actions: currentTodoActions } = currentTodoSlice;
  const { todos } = useAppSelector(state => state.todos);
  const { query, status } = useAppSelector(state => state.filter);
  const currentTodo = useAppSelector(state => state.currentTodo);


  const selectTodo = (todo: Todo) => {
    dispatch(currentTodoActions.setCurrentTodo(todo));

  };

  useEffect(() => {
    if (!todos) {
      dispatch(todoActions.setLoading(true));
    }

    getTodos()
      .then(fetchedTodos => {
        dispatch(todoActions.setTodos(fetchedTodos));
        dispatch(todoActions.setLoading(false));
      })
      .catch(error => {
        console.error('Failed to fetch todos:', error);
      });
  }, []);

  const filteredTodos = todos.filter(todo => {
    const matchesQuery = todo.title.toLowerCase().includes(query.toLowerCase());
    const matchesStatus =
      status === 'all' ||
      (status === 'completed' && todo.completed) ||
      (status === 'active' && !todo.completed);

    return matchesQuery && matchesStatus;
  });

  return filteredTodos.length === 0 ? (
    <p className="notification is-warning">
      There are no todos matching current filter criteria
    </p>
  ) : (
    <table className="table is-narrow is-fullwidth">
      <thead>
        <tr>
          <th>#</th>

          <th>
            <span className="icon">
              <i className="fas fa-check" />
            </span>
          </th>

          <th>Title</th>
          <th> </th>
        </tr>
      </thead>

      <tbody>
        {filteredTodos.map(todo => {
          return (
            <tr data-cy="todo" key={todo.id}>
              <td className="is-vcentered">{todo.id}</td>
              <td className="is-vcentered">
                {todo.completed ? (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                ) : null}
              </td>

              <td className="is-vcentered is-expanded">
                <p
                  className={
                    todo.completed ? 'has-text-success' : 'has-text-danger'
                  }
                >
                  {todo.title}
                </p>
              </td>

              <td className="has-text-right is-vcentered">
                <button data-cy="selectButton" className="button" type="button" onClick={() => selectTodo(todo)}>
                  <span className="icon">
                    <i className={`far ${
                      currentTodo?.id === todo.id
                      ? 'fa-eye-slash' 
                      : 'fa-eye'
                    }`} />
                  </span>
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
