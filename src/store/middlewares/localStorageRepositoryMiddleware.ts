import { AnyAction, Dispatch, Middleware } from "@reduxjs/toolkit";
import { LOCAL_STORAGE_TODOS_NAME } from "../../constants";

const LocalStorageRepositoryMiddleware: Middleware =
    ({ getState }) =>
    (next: Dispatch<AnyAction>) =>
    (action: any) => {
        const returnValue = next(action);
        const { todo } = getState();
        localStorage.setItem(LOCAL_STORAGE_TODOS_NAME, JSON.stringify(todo.data));
        return returnValue;
    };

export default LocalStorageRepositoryMiddleware;
