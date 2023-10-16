import React from "react";

export default function ToDo({
    todo,
    toggleComplete,
    handleDelete,
    handleEdit,
}) {
    const [newTitle, setNewTitle] = React.useState(todo.title);

    const handleChange = (e) => {
        e.prevetDefault();
        if(todo.complete === true){
            setNewTitle(todo.title);
        } else {
            todo.title = "";
            setNewTitle(e.target.value);
        }
    }


    return (   
        <div className="todo">
            <input
                type="text"
                value={todo.title === "" ? newTitle : todo.title}
                className="list" 
                onChange={handleChange} 
            />
            <div>
                <button
                    className="button-complete"
                    onClick={() => toggleComplete(todo)}
                >
                    complete
                </button>
                <button
                    className="button-edit"
                    onClick={() => handleEdit(todo, newTitle)}
                >
                    edit
                </button>
                <button
                    className="button-delete"
                    onClick={() => handleDelete(todo.id)}
                >
                    delete
                </button>
            </div>
        </div>
    );
}