const inquirer = require('inquirer');
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', 
  database: 'employee_db'
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the employee_db database.');
  startApplication();
});

async function startApplication() {
  try {
    const answer = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
          'View all departments',
          'View all roles',
          'View all employees',
          'Add a department',
          'Add a role',
          'Add an employee',
          'Update an employee role',
          'Exit'
        ],
      },
    ]);

    switch (answer.action) {
      case 'View all departments':
        getAllDepartments();
        break;

      case 'View all roles':
        getAllRoles();
        break;

      case 'View all employees':
        getAllEmployees();
        break;

      case 'Add a department':
        addDepartment();
        break;

      case 'Add a role':
        addRole();
        break;

      case 'Add an employee':
        addEmployee();
        break;

      case 'Update an employee role':
        updateEmployeeRole();
        break;

      case 'Exit':
        console.log('Exiting the application.');
        // Close the database connection
        db.end(); 
        return;

      default:
        console.log('Invalid choice');
        break;
    }
  } catch (error) {
    console.error('Error in the application:', error);
  }
}

function getAllDepartments() {
  const query = 'SELECT * FROM department';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error retrieving departments:', err);
      return;
    }
    console.table(results);
    // Restart the application after displaying departments
    startApplication(); 
  });
}

function getAllRoles() {
  const query = 'SELECT * FROM role';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error retrieving roles:', err);
      return;
    }
    console.table(results);
    startApplication(); 
  });
}

function getAllEmployees() {
  const query = 'SELECT * FROM employee';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error retrieving employees:', err);
      return;
    }
    console.table(results);
    startApplication(); 
  });
}

function addDepartment() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Enter the name of the department:',
    },
  ]).then((answer) => {
    const query = 'INSERT INTO department (name) VALUES (?)';
    db.query(query, answer.name, (err, result) => {
      if (err) {
        console.error('Error adding department:', err);
        return;
      }
      console.log('Department added successfully!');
      startApplication(); // Restart the application after adding department
    });
  });
}

function addRole() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Enter the title of the role:',
    },
    {
      type: 'input',
      name: 'salary',
      message: 'Enter the salary for the role:',
    },
    {
      type: 'input',
      name: 'departmentId',
      message: 'Enter the department ID for the role:',
    },
  ]).then((answer) => {
    const query = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
    const params = [answer.title, answer.salary, answer.departmentId];
    db.query(query, params, (err, result) => {
      if (err) {
        console.error('Error adding role:', err);
        return;
      }
      console.log('Role added successfully!');
      startApplication(); // Restart the application after adding role
    });
  });
}

function addEmployee() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'firstName',
      message: 'Enter the first name of the employee:',
    },
    {
      type: 'input',
      name: 'lastName',
      message: 'Enter the last name of the employee:',
    },
    {
      type: 'input',
      name: 'roleId',
      message: 'Enter the role ID for the employee:',
    },
    {
      type: 'input',
      name: 'managerId',
      message: 'Enter the manager ID for the employee (if applicable):',
    },
  ]).then((answer) => {
    const query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
    const params = [answer.firstName, answer.lastName, answer.roleId, answer.managerId];
    db.query(query, params, (err, result) => {
      if (err) {
        console.error('Error adding employee:', err);
        return;
      }
      console.log('Employee added successfully!');
      startApplication(); // Restart the application after adding employee
    });
  });
}

function updateEmployeeRole() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'employeeId',
      message: 'Enter the ID of the employee you want to update:',
    },
    {
      type: 'input',
      name: 'roleId',
      message: 'Enter the new role ID for the employee:',
    },
  ]).then((answer) => {
    const query = 'UPDATE employee SET role_id = ? WHERE id = ?';
    const params = [answer.roleId, answer.employeeId];
    db.query(query, params, (err, result) => {
      if (err) {
        console.error('Error updating employee role:', err);
        return;
      }
      console.log('Employee role updated successfully!');
      startApplication(); // Restart the application after updating employee role
    });
  });
}
