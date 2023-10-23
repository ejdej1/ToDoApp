import React, { useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const EditTask = ({modal, toggle, updateTask, todo}) => {
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');

    useEffect(() => {
        setTitle(todo.title);
        setDescription(todo.description);
    },[]);

    const handleUpdate = (e) => {
        e.preventDefault();
        toggle();
        let tempTodo = {};
        tempTodo['newName'] = title;
        tempTodo['newDescription'] = description;
        updateTask(tempTodo, todo);
        
    }

    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Update Task</ModalHeader>
                <ModalBody>
                    <form>
                        <div className="form-group">
                            <label className="label">Task name</label>
                            <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)}></input>
                        </div>
                        <div className="form-group">
                            <label className="label">Taks description</label>
                            <textarea rows = "5" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                        </div>
                    </form>
                </ModalBody>
                
                <ModalFooter>
                    <Button id="create-btn" color="primary" onClick={handleUpdate}>
                        Update
                    </Button>{' '}
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
    );

};

export default EditTask;