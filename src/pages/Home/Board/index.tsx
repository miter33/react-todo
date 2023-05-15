import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import ActionPanel from "../ActionPanel";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { removeTodo, toggleTodo, updateTodos } from "../../../store/slices/todoSlice";
import { filterTodos } from "../../../store/selectors/filterTodosSelector";
import { ITodo } from "../../../types/todo";
import "./styles.scss";


const Board = () => {
    const filter = useAppSelector((state) => state.todo.filterBy);
    let filteredTodos = useAppSelector(state => filterTodos(state.todo, filter));
    const todos = useAppSelector(state => filterTodos(state.todo, "all"));
    const dispatch = useAppDispatch();

    const toggleTodoStatus = (id: string) => {
        dispatch(toggleTodo(id));
    };

    const reorder = (list: any, startIndex: any, endIndex: any) => {
        const result = Array.from(list);

        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result;

        if (!destination) {
            return;
        }

        let sourceIndex = source.index;
        let destinationIndex = destination.index;

        let newState: any = [];

        if (filter !== 'all') {
            const sourceTodoId = filteredTodos[source.index].id;
            const destinationTodoId = filteredTodos[destination.index].id;
            
            sourceIndex = todos.findIndex(_ => _.id === sourceTodoId);
            destinationIndex = todos.findIndex(_ => _.id === destinationTodoId);
            
            filteredTodos = todos;
        }
        
        const items = reorder(filteredTodos, sourceIndex, destinationIndex);
        newState = items;

        dispatch(updateTodos(newState));
    };

    const removeItem = (id: string) => dispatch(removeTodo(id));

    return (
        <div className="board">
            <div>

                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="list">
                        {
                            (provided: any) => (
                                <div
                                    className="list"
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    {
                                        (filteredTodos.length) ?
                                            filteredTodos.map((el: ITodo, index: any) => {
                                                return (
                                                    <Draggable
                                                        index={index}
                                                        draggableId={el.id}
                                                        key={el.id + el.title}
                                                    >
                                                        {
                                                            (providedInner: any) => (
                                                                <div
                                                                    className={el.completed ? "todo todo-completed" : "todo"}
                                                                    ref={providedInner.innerRef}
                                                                    {...providedInner.draggableProps}
                                                                    {...providedInner.dragHandleProps}
                                                                >
                                                                    <button
                                                                        className="todo-button todo-button-checkbox"
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
            </div>
            <ActionPanel />
        </div>
    );
};

export default Board;