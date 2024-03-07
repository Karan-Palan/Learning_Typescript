import "./styles.css"

interface Props {
    todo: string;
    setTodo: React.Dispatch<React.SetStateAction<string>>;
    handleAdd: (e: React.FormEvent) => void;
}

const InputFeild: React.FC<Props> = ({ todo, setTodo, handleAdd }) => {
    return (
        <form className="input">
            <input type="input" placeholder="Enter a Task" className="input__box" onSubmit={handleAdd} />
            <button className="input_submit" type="submit">Go</button>
        </form> 
    )
}

export default InputFeild