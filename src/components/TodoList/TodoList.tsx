/* eslint-disable */
import React, {useEffect} from 'react';
import {todosSlice} from '../../features/todos'
import {Todo} from '../../types/Todo';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {getTodos} from '../../api'

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const {actions} = todosSlice;
  const todoList = useAppSelector((state) => state.todos);
  const { query, status } = useAppSelector(state => state.filter);

  useEffect(() => {
    getTodos().then(fetchedTodos => {
      dispatch(actions.setTodos(fetchedTodos));
    })
    .catch(error => { 
      console.error('Failed to fetch todos:', error);
    });
  }, [dispatch]);

  const filteredTodos = todoList.filter((todo) => {
  const matchesQuery = todo.title.toLowerCase().includes(query.toLowerCase());
    const matchesStatus =
      status === 'all' ||
      (status === 'completed' && todo.completed) ||
      (status === 'active' && !todo.completed);

    return matchesQuery && matchesStatus;
  });
    
  
  // useAppSelector((state) => {
  //   const filter = state.filter;
  //   if (filter.status === 'all') {
  //     return todoList;
  //   }
  //   return todoList.filter((todo) => {
  //     if (filter.status === 'active') {
  //       return !todo.completed;
  //     } else if (filter.status === 'completed') {
  //       return todo.completed;
  //     }
  //     return true; // Default case, should not happen
  //   });
  // });

  // const add = () => {
  //   dispatch(actions.addTodo({
  //     id: todoList.length + 1,
  //     title: `Todo ${todoList.length + 1}`,
  //     completed: false,
  //   } as Todo));
  // }
  // const remove = (id: number) => {
  //   dispatch(actions.removeTodo(id));
  // }
  // const update = (todo: Todo) => {
  //   dispatch(actions.updateTodo(todo));
  // } 
  // const setTodos = (todos: Todo[]) => {
  //   dispatch(actions.setTodos(todos));
  // }

  console.log
  ('TodoList rendered', todoList);

  return (
    <>
      {/* <p className="notification is-warning">
        There are no todos matching current filter criteria
      </p> */}

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
          {filteredTodos.map((todo) => {
          return (
            <tr data-cy="todo" key={todo.id}>
            <td className="is-vcentered">{todo.id}</td>
            <td className="is-vcentered">{todo.completed ?   <span className="icon" data-cy="iconCompleted">
                <i className="fas fa-check" />
              </span> : null}</td>

            <td className="is-vcentered is-expanded">
              <p className={todo.completed ? "has-text-success": "has-text-danger"}>{todo.title}</p>
            </td>

            <td className="has-text-right is-vcentered">
              <button data-cy="selectButton" className="button" type="button">
                <span className="icon">
                  <i className="far fa-eye" />
                </span>
              </button>
            </td>
          </tr>
          )})}
          
        </tbody>
      </table>
    </>
  );
};
