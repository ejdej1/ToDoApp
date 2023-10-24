import React, {useState} from 'react';
import EditTask from './modals/EditTask';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import UndoIcon from '@mui/icons-material/Undo';

const Card = ({todo, deleteTask, updateTodo, completeTask, undoTask}) => {
    const [modal, setModal] = useState(false);

    const toggle = () => {
        setModal(!modal);
    }

    const updateTask = (tempTodo, todo) => {
        updateTodo(tempTodo, todo);
    }

    const handleDelete = () => {
        deleteTask(todo.index);
    }

    const handleComplete = () => {
        completeTask(todo.index);
    }

    const handleUndo = () => {
        undoTask(todo.index);
    }

    const colors = [
        {
            primaryColor : "#5D93E1",
            secondaryColor : "#ECF3FC"
        },
        {
            primaryColor : "#F9D288",
            secondaryColor : "#FEFAF1"
        },
        {
            primaryColor : "#5DC250",
            secondaryColor : "#F2FAF1"
        },
        {
            primaryColor : "#F48687",
            secondaryColor : "#FDF1F1"
        },
        {
            primaryColor : "#B964F7",
            secondaryColor : "#F3F0FD"
        }
    ]

    return (
        <div className="card-wrapper mr-5">
            <div className="card-top" style={{"backgroundColor": colors[0].primaryColor}}></div>
            <div className="task-holder">
                <span className="card-header" style={{"backgroundColor": colors[0].secondaryColor}}>{todo.title}</span>
                <p className="card-content">{todo.description}</p>

                <div style={{"position": "absolute", "right" : "10px", "bottom" : "10px"}}>
                    {!todo.completed && (
                        <CheckCircleIcon className="check-icon" onClick={handleComplete}/>
                    )}
                    {!todo.completed && (
                        <EditIcon  className="edit-icon" onClick={() => setModal(true)}/>
                    )}
                    {todo.completed && (
                        <UndoIcon className="undo-icon" onClick={handleUndo}/>
                    )}
                    {todo.completed && (
                        <DeleteIcon className="delete-icon" onClick={handleDelete} />
                    )}
                </div>
        </div>
        <EditTask 
            modal={modal} 
            toggle= {toggle} 
            updateTask={updateTask}
            todo = {todo}
        />
        </div>
    );
};

export default Card;