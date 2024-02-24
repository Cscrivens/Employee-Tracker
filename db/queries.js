const connection = require('./connection');
class DB {
  constructor(connection){ 

    this.connection=connection
  }
}
class EmployeeTrackerDB {
  constructor(connection) {
    this.connection = connection;
  }
  getAllDepartments() {
    return this.connection.promise().query("SELECT department_id, department.name FROM department;");
  }

  // Static method to get all roles
  static async getAllRoles() {
    const query = 'SELECT * FROM role';
    const roles = await connection.query(query);
    return roles;
  }

  // Static method to get all employees
  static async getAllEmployees() {
    const query = 'SELECT * FROM employee';
    const employees = await connection.query(query);
    return employees;
  }

  // Static method to add a department
  static async addDepartment(name) {
    try {
      const query = 'INSERT INTO department (name) VALUES (?)';
      const result = await connection.query(query, [name]);
      return result;
    } catch (error) {
      console.error('Error adding department:', error);
      throw error;
    }
  }

  // Static method to add a role
  static async addRole(title, salary, departmentId) {
    const query = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
    const result = await connection.query(query, [title, salary, departmentId]);
    return result;
  }

  // Static method to add an employee
  static async addEmployee(firstName, lastName, roleId, managerId) {
    const query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
    const result = await connection.query(query, [firstName, lastName, roleId, managerId]);
    return result;
  }

  // Static method to update an employee's role
  static async updateEmployeeRole(employeeId, roleId) {
    const query = 'UPDATE employee SET role_id = ? WHERE id = ?';
    const result = await connection.query(query, [roleId, employeeId]);
    return result;
  }
}

// Export an instance of the Database class
module.exports = new DB(connection);