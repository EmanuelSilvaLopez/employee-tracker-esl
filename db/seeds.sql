INSERT INTO departments (name)
VALUES
  ('Director'),
  ('Management'),
  ('Team');

INSERT INTO roles (title, salary, department_id)
VALUES
    
  ('Store Director', 30000, 1),

  ('Softlines', 25000, 2),
  ('Hardlines', 35000, 2),
  ('Grocery', 27500, 2),

  ('Cart Attendant', 27500, 3),
  ('Stocker', 25000, 3),
  ('Folder', 50000, 3);

INSERT INTO employees (first_name, last_name, roles_id, manager_id)
VALUES 
  ('Francis', 'Smith', 1, NULL),

  ('Jasmine', 'Rodriguez', 2, 1),

  ('Lucille', 'Brown', 3, 1),

  ('Khadeeja', 'Simmons', 4, 1),

  ('Evelyn', 'Sanchez', 5, 2),

  ('Buba', 'Smith', 6, 3),

  ('Chad', 'Gilbert', 7, 4);