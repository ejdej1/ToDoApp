import React from "react";
import { db } from "../../firebase";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ToDoList from "../ToDoList";

const CreateTask = ({modal, toggle}) => {
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');

    const handleSubmit = async (e) => {
        toggle();
        e.preventDefault();
        if (title != "") {
            await addDoc(collection(db, "todos"), {
                title,
                description,
                completed: false,
            });
            setTitle("");
            setDescription("");
        }
};


    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Create Task</ModalHeader>
                <ModalBody>
                    <form>
                        <div className="form-group">
                            <label>Task name</label>
                            <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)}></input>
                        </div>
                        <div className="form-group">
                            <label>Taks description</label>
                            <textarea rows = "5" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                        </div>
                    </form>
                </ModalBody>
                
                <ModalFooter>
                    <Button id="create-btn" color="primary" onClick={handleSubmit}>
                        Create
                    </Button>{' '}
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
    );

};

export default CreateTask;