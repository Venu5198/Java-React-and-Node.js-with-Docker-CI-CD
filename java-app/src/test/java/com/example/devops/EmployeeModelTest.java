package com.example.devops;

import com.example.devops.model.Employee;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class EmployeeModelTest {

    @Test
    public void testEmployeeGettersAndSetters() {
        Employee emp = new Employee();
        emp.setId(10L);
        emp.setName("DevOps Tester");
        emp.setRole("QA Automation");
        emp.setDepartment("Quality Engineering");
        emp.setEmail("tester@example.com");

        assertEquals(10L, emp.getId());
        assertEquals("DevOps Tester", emp.getName());
        assertEquals("QA Automation", emp.getRole());
        assertEquals("Quality Engineering", emp.getDepartment());
        assertEquals("tester@example.com", emp.getEmail());
    }

    @Test
    public void testEmployeeEqualsAndHashCode() {
        Employee emp1 = new Employee(1L, "Alice", "DevOps", "Infra", "alice@example.com");
        Employee emp2 = new Employee(1L, "Alice", "DevOps", "Infra", "alice@example.com");
        Employee emp3 = new Employee(2L, "Bob", "Dev", "Eng", "bob@example.com");

        assertEquals(emp1, emp2);
        assertNotEquals(emp1, emp3);
        assertEquals(emp1.hashCode(), emp2.hashCode());
        assertFalse(emp1.equals(null));
        assertFalse(emp1.equals(new Object()));
    }
}
