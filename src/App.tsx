import React, { useCallback, useEffect, useState } from "react";
import "./styles/styles.scss";
import Home from "./pages/Home";
import Header from "./components/Header";
import { Theme } from "./types/theme";


const LIGHT_THEME_CLASS = "theme-light";
const DARK_THEME_CLASS = "theme-dark";
const DEFAULT_THEME: Theme = "dark";
const LOCAL_STORAGE_THEME_KEY = "theme";

const getThemeFromLocalStorage = (): Theme => {
	return localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme || DEFAULT_THEME;
};

const setThemeToLocalStorage = (theme: Theme): void => {
	localStorage.setItem(LOCAL_STORAGE_THEME_KEY, theme);
};

const App = () => {
	const [theme, setTheme] = useState<Theme>(getThemeFromLocalStorage());
	const themeClass = theme === "dark" ? DARK_THEME_CLASS : LIGHT_THEME_CLASS;

	useEffect(() => {
		setThemeToLocalStorage(theme);
		document.body.className = "";
		document.body.classList.add(themeClass);
	}, [theme]);

	const toggleTheme = useCallback(() => {
		const newTheme: Theme = theme === "light" ? "dark" : "light";
		setTheme(newTheme);
	}, [theme]);

	return (
		<div className="container-app">
			<Header toggleTheme={toggleTheme} />
			<Home />
		</div>
	);
};

export default App;