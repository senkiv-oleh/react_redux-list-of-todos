import React from 'react';
import './Loader.scss';
import { useAppSelector } from '../../app/hooks';

export const Loader: React.FC = () => {
  const todoList = useAppSelector(state => state.todos);

  return todoList ? (
    ''
  ) : (
    <div className="Loader" data-cy="loader">
      <div className="Loader__content" />
    </div>
  );
};
