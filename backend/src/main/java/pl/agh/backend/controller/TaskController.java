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

}
