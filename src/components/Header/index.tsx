import React from "react";
import "./styles.scss";

interface IProps {
    toggleTheme: () => void;
}

const Header: React.FC<IProps> = ({ toggleTheme }) => {

	return (
		<div className="header">
			<h2 className="title">TODO</h2>
			<button
				className="theme-switcher-button"
				onClick={toggleTheme}
			/>
		</div>
	);
};

export default Header;