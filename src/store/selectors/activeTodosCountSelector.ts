import { createSelector } from "@reduxjs/toolkit";
import { TodoState } from "../slices/todoSlice";
import { ITodo } from "../../types/todo";

export const activeTodosCount = createSelector(
	(state: TodoState) => state.data,
	(todos: ITodo[]) => {
		return todos.filter(_ => !_.completed).length;
	}
);