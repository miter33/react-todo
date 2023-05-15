import { createSelector } from "reselect";
import { TodoState } from "../slices/todoSlice";
import { ITodo } from "../../types/todo";
import { TodoFilter } from "../../types/todoFilter";

export const filterTodos = createSelector(
    [(state: TodoState) => state.data, (_state: TodoState, filter: TodoFilter) => filter],
    (todos: ITodo[], filter: TodoFilter) => {
        if (filter === "active") {
            return todos.filter(_ => !_.completed);
        }
        if (filter === "completed") {
            return todos.filter(_ => _.completed);
        }
        return todos;
    }
);

export const activeTodosCount = createSelector(
    (state: TodoState) => state.data,
    (todos: ITodo[]) => {
        return todos.filter(_ => !_.completed).length;
    }
);