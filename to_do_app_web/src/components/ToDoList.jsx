import React,  { useState } from "react";
import CreateTask from "./modals/createTask";
import { collection, query, onSnapshot, doc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";
import { db } from '../firebase';
import Card from "./Card";
import EditTask from "./modals/EditTask";

const ToDoList = () => {
    const [modal, setModal] = useState(false);

    const [todos, setTodos] = React.useState([]);

    React.useEffect(() => {
        const q = query(collection(db, "todos"));
        const unsub = onSnapshot(q, (querySnapshot) => {
            let todosArray = [];
        querySnapshot.forEach((doc) => {
            todosArray.push({ ...doc.data(), index: doc.id});
        });
        setTodos(todosArray);
        });
    return () => unsub();
    }, []);
    
    const toggle =  () => {
        setModal(!modal);
    }

    const deleteTask = async (index) => {
        await deleteDoc(doc(db, "todos", doc.id=index));
        window.location.reload();
    };

    const updateTodo = async (tempTodo, todo) => {
        await updateDoc(doc(db, "todos", doc.id=todo.index), { 
            title: tempTodo.newName,
            description: tempTodo.newDescription,
        });
        window.location.reload();
    }

    return (
        <>
            <div className="header text-center">   
                <h3>To Do List</h3>
                <button className="btn btn-primary mt-2" onClick={() => setModal(true)}> Create Task</button>
            </div>
            <div className="task-container">
                {todos.map((todo, index) => 
                    <Card 
                        key={index}
                        todo={todo}
                        deleteTask = {deleteTask}
                        updateTodo={updateTodo}
                    />
                )}
            </div>

            <CreateTask toggle = {toggle} modal = {modal}/>
        </>
            
    );

};

export default ToDoList;