package pl.agh.backend.repository;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import pl.agh.backend.model.Task;

public interface TaskRepository extends  JpaRepository<Task, Long>{
    List <Task> findTaskByDone(boolean done);
    List <Task>findByDoneNot(boolean done);
}
