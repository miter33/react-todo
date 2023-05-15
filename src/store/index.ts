import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./slices/todoSlice";
import themeReducer from "./slices/themeSlice";
import LocalStorageRepositoryMiddleware from "./middlewares/localStorageRepositoryMiddleware";


export const store = configureStore({
	reducer: {
		todo: todoReducer,
		theme: themeReducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(LocalStorageRepositoryMiddleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;