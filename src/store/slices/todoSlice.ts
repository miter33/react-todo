import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITodo } from "../../types/todo";
import { TodoFilter } from "../../types/todoFilter";
import { LOCAL_STORAGE_TODOS_NAME } from "../../constants";

export interface TodoState {
    data: ITodo[];
    filterBy: TodoFilter;
}

let initialTodos: ITodo[] = [];

const localStorageTodos = localStorage.getItem(LOCAL_STORAGE_TODOS_NAME);

if (localStorageTodos) {
    initialTodos = JSON.parse(localStorageTodos.toString()) as ITodo[];
}

const initialState: TodoState = {
    data: initialTodos,
    filterBy: "all",
};

const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTodo(state: TodoState, action: PayloadAction<string>) {
            const title = action.payload;
            if (title) {
                const todo: ITodo = { id: crypto.randomUUID(), title, completed: false };
                state.data.push(todo);
            }
        },

        toggleTodo(state: TodoState, action: PayloadAction<string>) {
            const toggleTodoItem: ITodo | undefined = state.data.find(
                (todo) => todo.id === action.payload,
            );

            if (toggleTodoItem) {
                toggleTodoItem.completed = !toggleTodoItem?.completed;
            }
        },

        removeTodo(state: TodoState, action: PayloadAction<string>) {
            state.data = state.data.filter((todo) => todo.id !== action.payload);
        },

        filterBy(state: TodoState, action: PayloadAction<TodoFilter>) {
            state.filterBy = action.payload;
        },

        clearCompletedTodos(state: TodoState) {
            state.data = state.data.filter((todo) => !todo.completed);
        },

        updateTodos: (state, action: PayloadAction<ITodo[]>) => {
            state.data = action.payload;
        },
    },
});

export const { addTodo, toggleTodo, filterBy, clearCompletedTodos, removeTodo, updateTodos } =
    todoSlice.actions;
export default todoSlice.reducer;
