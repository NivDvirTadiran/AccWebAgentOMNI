package tadiran.accagentapi.model;
 
import java.io.Serializable;
import lombok.*;
@Data 

public class EmployeeVO implements Serializable
{
    private static final long serialVersionUID = 1L;
 
    private Integer id;
     
    private String firstName;
     
    private String lastName;
     
    private String email;
     
    public EmployeeVO(Integer id, String firstName, String lastName, String email) {
        super();
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }
     
    public EmployeeVO(){
         
    }
 
    public Integer getId() {
        return id;
    }

 
    @Override
    public String toString() {
        return "EmployeeVO [id=" + id + ", firstName=" + firstName
                + ", lastName=" + lastName + ", email=" + email + "]";
    }
}