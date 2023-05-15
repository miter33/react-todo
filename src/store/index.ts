import { Middleware, configureStore } from "@reduxjs/toolkit";
import todoReducer from "./slices/todoSlice";
import { ITodo } from "../types/todo";
import { LOCAL_STORAGE_TODOS_NAME } from "../constants";

const setLocalStorage = (todos: ITodo[]) => {
	localStorage.setItem(LOCAL_STORAGE_TODOS_NAME, JSON.stringify(todos));
};


const localStorageRepositoryMiddleware: Middleware = ({ getState }) => (next: any) => (action: any) => {
	const returnValue = next(action);
	const { todo } = getState();
	setLocalStorage(todo.data);
	return returnValue;
};

export const store = configureStore({
	reducer: {
		todo: todoReducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageRepositoryMiddleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;