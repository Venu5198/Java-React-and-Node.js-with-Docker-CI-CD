import React from 'react';

export default function EmployeeTable({ employees }) {
  return (
    <div className="table-card">
      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Role</th>
            <th>Department</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>#{emp.id}</td>
              <td className="emp-name">{emp.name}</td>
              <td className="emp-role">{emp.role}</td>
              <td>
                <span className="badge-dept">{emp.department}</span>
              </td>
              <td>{emp.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
