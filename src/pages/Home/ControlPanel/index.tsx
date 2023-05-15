import React from "react";
import { useEffect, useState } from "react";
import { TodoFilter } from "../../../types/todoFilter";
import "./styles.scss";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { clearCompletedTodos, filterBy } from "../../../store/slices/todoSlice";
import { activeTodosCount } from "../../../store/selectors/activeTodosCountSelector";


const ControlPanel = () => {
	const [filter, setFilter] = useState<TodoFilter>("all");
	const dispatch = useAppDispatch();
	const remainingTasksCount = useAppSelector(state => activeTodosCount(state.todo));
    

	useEffect(() => {
		dispatch(filterBy(filter));
	}, [filter]);

	const removeCompletedTodos = () => {
		dispatch(clearCompletedTodos());
	};

	const getCategoryClassName = (todoFilter: TodoFilter): string => {
		return filter === todoFilter ? "category category--active" : "category";
	};

	return (
		<div className="control-panel">
			<span>{remainingTasksCount} items left</span>
			<div>
				<span
					className={getCategoryClassName("all")}
					onClick={() => setFilter("all")}
				>
                    All
				</span>
				<span
					className={getCategoryClassName("active")}
					onClick={() => setFilter("active")}
				>
                    Active
				</span>
				<span
					className={getCategoryClassName("completed")}
					onClick={() => setFilter("completed")}
				>
                    Completed
				</span>
			</div>
			<span
				className="clear"
				onClick={removeCompletedTodos}
			>
                Clear completed
			</span>
		</div>
	);
};

export default ControlPanel;