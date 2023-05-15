import { DragDropContext, Droppable, Draggable, DropResult, DraggableProvided, DroppableProvided } from "react-beautiful-dnd";
import ActionPanel from "../ActionPanel";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { removeTodo, toggleTodo, updateTodos } from "../../../store/slices/todoSlice";
import { filterTodos } from "../../../store/selectors/filterTodosSelector";
import { ITodo } from "../../../types/todo";
import "./styles.scss";
import { TodoFilter } from "../../../types/todoFilter";


const Board = () => {
    const dispatch = useAppDispatch();
    const filter: TodoFilter = useAppSelector((state) => state.todo.filterBy);
    const todos: ITodo[] = useAppSelector(state => filterTodos(state.todo, "all"));
    let filteredTodos: ITodo[] = useAppSelector(state => filterTodos(state.todo, filter));

    const toggleTodoStatus = (id: string): void => {
        dispatch(toggleTodo(id));
    };

    const reorder = (array: ITodo[], startIndex: number, endIndex: number): ITodo[] => {
        const result: ITodo[] = Array.from(array);

        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    const onDragEnd = (result: DropResult): void => {
        const { source, destination } = result;

        if (!destination) {
            return;
        }

        let sourceIndex: number = source.index;
        let destinationIndex: number = destination.index;

        let newState: ITodo[] = [];

        if (filter !== 'all') {
            const sourceTodoId: string = filteredTodos[source.index].id;
            const destinationTodoId: string = filteredTodos[destination.index].id;

            sourceIndex = todos.findIndex(_ => _.id === sourceTodoId);
            destinationIndex = todos.findIndex(_ => _.id === destinationTodoId);

            filteredTodos = todos;
        }

        const items: ITodo[] = reorder(filteredTodos, sourceIndex, destinationIndex);
        newState = items;

        dispatch(updateTodos(newState));
    };

    const removeItem = (id: string): void => {
        dispatch(removeTodo(id));
    }

    return (
        <div className="board">
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="list">
                    {
                        (provided: DroppableProvided) => (
                            <div
                                className="list"
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                {
                                    (filteredTodos.length) ?
                                        filteredTodos.map((el: ITodo, index: number) => {
                                            return (
                                                <Draggable
                                                    index={index}
                                                    draggableId={el.id}
                                                    key={el.id}
                                                >
                                                    {
                                                        (providedInner: DraggableProvided) => (
                                                            <div
                                                                className={el.completed ? "todo todo-completed" : "todo"}
                                                                ref={providedInner.innerRef}
                                                                {...providedInner.draggableProps}
                                                                {...providedInner.dragHandleProps}
                                                            >
                                                                <button
                                                                    className="todo-button todo-button-checked"
                                                                    onClick={() => toggleTodoStatus(el.id)}
                                                                />
                                                                <p className="text" title={el.title}>{el.title}</p>
                                                                <button className="delete" onClick={() => removeItem(el.id)} />
                                                            </div>
                                                        )
                                                    }
                                                </Draggable>
                                            );
                                        })
                                        : <div className='list empty-todo-text'>Fill your task board</div>
                                }
                                {provided.placeholder}
                            </div>
                        )
                    }
                </Droppable>
            </DragDropContext>
            <ActionPanel />
        </div>
    );
};

export default Board;