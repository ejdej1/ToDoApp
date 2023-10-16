package pl.agh.backend.model;
import jakarta.persistence.*;

@Entity
@Table(name = "tasks")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name="title")
    private String title;

    @Column(name="done")
    private boolean done;

    public Task() {

    }

    public Task(String title, boolean done) {
        this.title = title;
        this.done = done;
    }

    public long getId(){
        return id;
    }

    public String getTitle(){
        return title;
    }
    public void setTitle(String title){
        this.title = title;
    }
    public boolean isDone(){
        return done;
    }
    public void setDone(boolean done){
        this.done = done;
    }

    @Override
    public String toString(){
        return "Task [id =" + id + ", title= " + title + " isDone= " + done;
    }

}