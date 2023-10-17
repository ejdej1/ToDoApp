import React from "react";
import { db } from "../firebase";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";
import AddIcon from '@mui/icons-material/Add';

export default function AddToDo() {
    const [title, setTitle] = React.useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (title != "") {
            await addDoc(collection(db, "todos"), {
                title,
                completed: false,
            });
            setTitle("");
        }
};

return (
    <form onSubmit={handleSubmit}>
        <div className="input_container">
            <input
                type="text"
                placeholder="Enter todo task..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
        </div>

        <div className="btn_container-add">
            <button className="button-add">
            <AddIcon id="i" />    
            </button>  
        </div>

    </form>

    );
}

