import { useCallback, useEffect } from "react";
import "./styles/styles.scss";
import Home from "./pages/Home";
import Header from "./components/Header";
import { Theme } from "./types/theme";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { toggleTheme as toggleTodoTheme } from "./store/slices/themeSlice";

const LIGHT_THEME_CLASS = "theme-light";
const DARK_THEME_CLASS = "theme-dark";

const App = () => {
	const dispatch = useAppDispatch();
	const theme = useAppSelector((state) => state.theme.theme);

	const themeClass = theme === "dark" ? DARK_THEME_CLASS : LIGHT_THEME_CLASS;

	useEffect(() => {
		document.body.className = "";
		document.body.classList.add(themeClass);
	}, [theme]);

	const toggleTheme = useCallback(() => {
		const newTheme: Theme = theme === "light" ? "dark" : "light";
		dispatch(toggleTodoTheme(newTheme));
	}, [theme]);

	return (
		<div className="container-app">
			<Header toggleTheme={toggleTheme} />
			<Home />
		</div>
	);
};

export default App;
