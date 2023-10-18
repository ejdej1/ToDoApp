import React, {useState} from 'react';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";


const Card = ({todo, index}) => {

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
            <div className="card-top" style={{"background-color": colors[index%5].primaryColor}}></div>
            <div className="task-holder">
                <span className="card-header" style={{"background-color": colors[index%5].secondaryColor}}>{todo.title}</span>
                <p className="mt-3">{todo.description}</p>

                <div style={{"position": "absolute", "right" : "20px", "bottom" : "20px"}}>
                    <EditIcon  className="edit-icon" onClick = {() => setModal(true)}/>
                    <DeleteIcon className="delete-icon"/>
                </div>
        </div>
        </div>
    );
};

export default Card;