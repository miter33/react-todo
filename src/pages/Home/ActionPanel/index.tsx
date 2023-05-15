import { useEffect, useState } from "react";
import { TodoFilter } from "../../../types/todoFilter";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { clearCompletedTodos, filterBy } from "../../../store/slices/todoSlice";
import { activeTodosCount } from "../../../store/selectors/activeTodosCountSelector";
import "./styles.scss";

const ActionPanel = () => {
    const dispatch = useAppDispatch();
    const [filter, setFilter] = useState<TodoFilter>("all");
    const remainingTasksCount: number = useAppSelector((state) => activeTodosCount(state.todo));

    useEffect(() => {
        dispatch(filterBy(filter));
    }, [filter]);

    const removeCompletedTodos = (): void => {
        dispatch(clearCompletedTodos());
    };

    const getCategoryClassName = (todoFilter: TodoFilter): string => {
        return filter === todoFilter ? "category category-active" : "category";
    };

    return (
        <div className="action-panel">
            <span>{remainingTasksCount} items left</span>
            <div>
                <span className={getCategoryClassName("all")} onClick={() => setFilter("all")}>
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
            <span className="clear-completed" onClick={removeCompletedTodos}>
                Clear completed
            </span>
        </div>
    );
};

export default ActionPanel;
