INSERT INTO departments
  (department)
VALUES
('Directors'),
('Management'),
('Team')

INSERT INTO roles
  (title, salary, department_id)
VALUES
('Store Director', 100000, 1)
('Department Lead',50000, 1)

('Softlines Manager', 30000, 2)
('Hardlines Manager', 30000, 2)
('Grocery Manager', 30000, 2)

('Cart Attendant', 20000, 3)
('Guest Advocate', 20000, 3)
('DU Captain', 20000, 3)

INSERT INTO employees
  (first_name, last_name, roles_id, manager_id)
VALUES
('Sarah', 'Grabbe', 1, NULL),
('Glenn', 'Mccoy', 2, 1),
('Surrey', 'Valdez', 2, 1),
('Zack', 'Bell', 2, 1),
('Manny', 'Lopez', 3, 2),
('Morgan', 'Bro', 3, 2),
('Jaer', 'Medina', 3, 4),
('Joe', 'Hughes', 3, 3)