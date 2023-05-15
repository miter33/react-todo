import Input from "../../components/Input";
import Board from "./Board";
import { useAppDispatch } from "../../store/hooks";
import { addTodo } from "../../store/slices/todoSlice";
import Label from "../../components/Label";
import "./styles.scss";

const Home = () => {
    const dispatch = useAppDispatch();

    const addNewTodo = (todoTitle: string): void => {
        dispatch(addTodo(todoTitle));
    };

    return (
        <>
            <Input placeholder="Add a new task" setData={addNewTodo} />
            <Board />
            <Label value="Drag and drop to reorder list" className="label" />
        </>
    );
};

export default Home;
