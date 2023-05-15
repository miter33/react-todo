import React, { useState } from "react";
import "./styles.scss";

interface IProps {
    placeholder?: string;
    setData: (value: string) => void;
}

const Input: React.FC<IProps> = ({ placeholder, setData }) => {
	const [value, setValue] = useState<string>("");

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
		if (event.key === "Enter") {
			setData(value);
			setValue("");
		}
	};

	const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		setValue(event.target.value);
	};

	return (
		<div className="input-container">
			<input
				className="input"
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				onKeyDown={handleKeyDown}
			/>
		</div>
	);
};

export default Input;