INSERT INTO department (department_name)
VALUES
  ('Director'),
  ('Management'),
  ('Team');

INSERT INTO role (title, salary, department_id)
VALUES
    
  ('Store Director', 30000, 1),

  ('Softlines', 25000, 2),
  ('Hardlines', 35000, 2),
  ('Grocery', 27500, 2),

  ('Cart Attendant', 27500, 3),
  ('Stocker', 25000, 3),
  ('Folder', 50000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
  ('Sarah', 'Grabbe', 1, NULL),

  ('Glenn', 'Mccoy', 2, 1),

  ('Surrey', 'Valdez', 3, 1),

  ('Bryce', 'Tiller', 4, 1),

  ('Manny', 'Lopez', 5, 2),

  ('Matthew', 'King', 6, 3),

  ('Rebecca', 'English', 7, 4);