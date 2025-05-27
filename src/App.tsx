import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { useEffect } from 'react';
import { getTodos } from './api';
import { todosSlice } from './features/todos';

export const App = () => {
  const dispatch = useAppDispatch();
  const { actions: todoActions } = todosSlice;

  const currentTodo = useAppSelector(state => state.currentTodo);
  const todosList = useAppSelector(state => state.todos);

  useEffect(() => {
    getTodos().then(fetchedTodos => {
      dispatch(todoActions.setTodos(fetchedTodos));
    });
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter />
            </div>

            <div className="block">
              {todosList.length > 0 ? <TodoList /> : <Loader />}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
