import React from 'react';
import './App.css';
import Main from "./components/Main";
import AddToDo from './components/AddToDo';
import ToDo from './components/todo';
import { collection, query, onSnapshot, doc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";
import { db } from './firebase';

function App() {
  const [todos, setTodos] = React.useState([]);

  React.useEffect(() => {
    const q = query(collection(db, "todos"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let todosArray = [];
      querySnapshot.forEach((doc) => {
        todosArray.push({ ...doc.data(), id: doc.id});
      });
      setTodos(todosArray);
    });
    return () => unsub();
  }, []);

  const handleEdit = async (todo, title) => {
    await updateDoc(doc(db, "todos", todo.id), {title: title });
  };

  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), {
      completed: !todo.completed
    });
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };

  return (
      <div className='App'>
          <div>
            <Main/>
          </div>
          <div>
            <AddToDo/>
          </div>
          <div className='todo_container'>
            {todos.map((todo) => (
              <ToDo
              key={todo.id}
              todo={todo}
              toggleComplete={toggleComplete}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              />
            ))}
          </div>
      </div>
  );
}

export default App
