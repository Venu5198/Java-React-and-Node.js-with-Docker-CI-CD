package com.example.devops.controller;

import com.example.devops.model.Employee;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/employees")
@CrossOrigin(origins = "*")
public class EmployeeController {

    private static final List<Employee> SAMPLE_EMPLOYEES = List.of(
            new Employee(1L, "Alice Johnson", "DevOps Engineer", "Infrastructure", "alice.johnson@example.com"),
            new Employee(2L, "Bob Smith", "Backend Developer", "Engineering", "bob.smith@example.com"),
            new Employee(3L, "Carol Williams", "Frontend Developer", "Product Design", "carol.williams@example.com"),
            new Employee(4L, "David Brown", "Site Reliability Engineer", "Operations", "david.brown@example.com")
    );

    @GetMapping
    public ResponseEntity<List<Employee>> getEmployees() {
        return ResponseEntity.ok(SAMPLE_EMPLOYEES);
    }
}
