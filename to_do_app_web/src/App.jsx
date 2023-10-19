import React from 'react';
import './App.css';
import ToDoList from './components/ToDoList';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [todos, setTodos] = React.useState([]);

  return (
      <div className='App'>
          <div>
            <ToDoList/>
          </div>
      </div>
  );
}

export default App
