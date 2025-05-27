import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { todosSlice } from '../features/todos';
import { currentTodoSlice } from '../features/currentTodo';
import { filterSlice } from '../features/filter';
import { currentUserSlice } from '../features/currentUser';

const rootReducer = combineSlices({
  [todosSlice.name]: todosSlice.reducer,
  [currentTodoSlice.name]: currentTodoSlice.reducer,
  [filterSlice.name]: filterSlice.reducer,
  [currentUserSlice.name]: currentUserSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
