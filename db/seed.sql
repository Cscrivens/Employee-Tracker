INSERT INTO department (name) VALUES
('Sales'),
('Engineering'),
('Finance'),
('Accountant');

INSERT INTO role (title, salary, department_id) VALUES
  ('Sales Manager', 80000, 1),
  ('Sales Representative', 50000, 1),
  ('Software Engineer', 90000, 2),
  ('Accountant', 60000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
  ('John', 'Doe', 1, NULL), -- Sales Manager
  ('Jane', 'Smith', 2, 1),   -- Sales Representative with John as manager
  ('Bob', 'Johnson', 3, NULL), -- Software Engineer
  ('Alice', 'Williams', 4, NULL); -- Accountant
