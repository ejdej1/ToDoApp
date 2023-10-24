import React,  { useState } from "react";
import CreateTask from "./modals/createTask";
import { collection, query, onSnapshot, doc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";
import { db } from '../firebase';
import Card from "./Card";

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
                <h3>TO DO LIST</h3>
                <button className="btn btn-primary bt-lg mt-2" onClick={() => setModal(true)}> Create Task</button>
            </div>
            <div className="todo-container mt-3 text-left">
                <h4>To do tasks</h4>
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
            <div className="completed-container text-left">
                <h4>tasks completed</h4>
            </div>

            <CreateTask toggle = {toggle} modal = {modal}/>
        </>
            
    );

};

export default ToDoList;