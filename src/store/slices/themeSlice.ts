import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Theme } from "../../types/theme";


const DEFAULT_THEME: Theme = "dark";
const LOCAL_STORAGE_THEME_KEY = "theme";

export interface ThemeState {
    theme: Theme;
}

let initialTheme: Theme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme;

if (!initialTheme) {
    initialTheme = DEFAULT_THEME;
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, initialTheme);
}

const initialState: ThemeState = {
    theme: initialTheme
};

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        toggleTheme(state: ThemeState, action: PayloadAction<Theme>) {
            localStorage.setItem(LOCAL_STORAGE_THEME_KEY, action.payload);
            state.theme = action.payload
        }
    },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;