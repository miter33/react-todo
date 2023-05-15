import React from "react";
import Input from "../../components/Input";
import Board from "./Board";
import { useAppDispatch } from "../../store/hooks";
import { addTodo } from "../../store/slices/todoSlice";

const Home = () => {
	const dispatch = useAppDispatch();

	const addNewTodo = (todoTitle: string): void => {
		dispatch(addTodo(todoTitle));
	};

	return (
		<>
			<Input placeholder="Add a new task" setData={addNewTodo} />
			<Board />
            <p className="component__label">Drag and drop to reorder list</p>
		</>
	);
};

export default Home;