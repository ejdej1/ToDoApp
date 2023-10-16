package pl.agh.backend.controller;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.agh.backend.model.Task;
import pl.agh.backend.repository.TaskRepository;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api")
public class TaskController {
    @Autowired TaskRepository taskRepository;

    //Getting all tasks
    @GetMapping("/tasks")
    public ResponseEntity <List<Task>> getAllTasks () {
        try{
            List<Task> tasks = new ArrayList<Task>();
            taskRepository.findAll().forEach(tasks::add);
            if (tasks.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(tasks, HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //Getting only task that are done
    @GetMapping("/tasks/done")
    public ResponseEntity<List<Task>> getDoneTasks() {
        try{
            List<Task> tasks = taskRepository.findTaskByDone(true);
            if(tasks.isEmpty()){
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(tasks, HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //Getting only task that are undone
    @GetMapping("/tasks/undone")
    public ResponseEntity<List<Task>> getUnDoneTasks() {
        try{
            List<Task> tasks = taskRepository.findTaskByDone(false);
            if(tasks.isEmpty()){
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(tasks, HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //Creating a task
    @PostMapping("/tasks")
    public ResponseEntity<Task> createTask (@RequestBody Task task){
        try{
            Task _task = taskRepository
                    .save(new Task(task.getTitle(), false));
            return new ResponseEntity<>(_task, HttpStatus.CREATED);
        } catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //Updating a task
    @PutMapping("/tasks/{id}")
    public ResponseEntity<Task> updateTask (@PathVariable("id") long id, @RequestBody Task task){
        Optional<Task> taskData = taskRepository.findById(id);
        if (taskData.isPresent()){
            Task _task = taskData.get();
            _task.setTitle(task.getTitle());
            _task.setDone(task.isDone());
            return new ResponseEntity<>(taskRepository.save(_task), HttpStatus.OK);
        } else  {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    //Deleting a task
    @DeleteMapping("/tasks/{id}")
    public ResponseEntity<HttpStatus> deleteTask(@PathVariable("id") long id){
        try{
            taskRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //Deleting all tasks
    @DeleteMapping("/tasks")
    public ResponseEntity<HttpStatus> deleteAllTasks(){
        try{
            taskRepository.deleteAll();
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
