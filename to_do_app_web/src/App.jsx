import React from 'react';
import './App.css';
import ToDoList from './components/ToDoList';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  return (
      <div className='App'>
          <div>
            <ToDoList/>
          </div>
      </div>
  );
}
