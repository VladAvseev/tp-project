const { Pool } = require("pg");

const pool = new Pool({
  connectionString:
    "postgres://byidfxxm:S1cQql65YbmWTrggAZJwRL1F05OJnE-A@kandula.db.elephantsql.com/byidfxxm",
});

pool.query(
  `
	drop table if exists leave;
	drop table if exists bonus;
	drop table if exists payment; 
	drop table if exists employee; 

	create table employee (
		id serial PRIMARY KEY,
		name varchar(256) not null,
		position varchar(256) not null,
		salary integer not null,
		status varchar(32) not null,
		childs integer not null
	);

	create table leave (
		id serial PRIMARY KEY,
		employeeId integer not null references employee(id),
		dateStart DATE not null,
		dateFinish DATE not null
	);

	create table bonus (
		id serial PRIMARY KEY,
		employeeId integer not null references employee(id),
		value integer not null,
		date DATE not null
	);
	
		create table payment (
		id serial PRIMARY KEY,
		employeeId integer not null references employee(id),
		dateStart DATE not null,
		dateFinish DATE not null,
		value integer not null,
		workDays integer not null,
		sickLeaveDays integer not null
	);

	insert into employee(name, position, salary, status, childs) values
		('Влад Авсеев', 'Преподаватель', 100000, 'Холост', 0),
		('Назар Шатило', 'Преподаватель', 110000, 'Холост', 1),
		('Саша Яковлев', 'Преподаватель', 120000, 'Холост', 2),
		('Артем Зеньков', 'Ассистент', 50000, 'Женат', 3),
		('Саша Маркуш', 'Ассистент', 60000, 'Женат', 4),
		('Саша Кухтеня', 'Декан', 999999, 'Женат', 99);

	insert into leave(employeeId, dateStart, dateFinish) values
		(1, '2024-07-05', '2024-07-07'),
		(1, '2024-07-27', '2024-07-28'),
		(1, '2024-09-01', '2024-09-07'),
		(1, '2024-09-25', '2024-10-02'),
		(1, '2024-11-01', '2024-11-01'),
		(2, '2024-07-05', '2024-07-07'),
		(2, '2024-07-27', '2024-07-28'),
		(2, '2024-09-01', '2024-09-07'),
		(2, '2024-09-25', '2024-10-02'),
		(2, '2024-11-01', '2024-11-01'),
		(3, '2024-07-05', '2024-07-07'),
		(3, '2024-07-27', '2024-07-28'),
		(3, '2024-09-01', '2024-09-07'),
		(3, '2024-09-25', '2024-10-02'),
		(3, '2024-11-01', '2024-11-01'),
		(4, '2024-07-05', '2024-07-07'),
		(4, '2024-07-27', '2024-07-28'),
		(4, '2024-09-01', '2024-09-07'),
		(4, '2024-09-25', '2024-10-02'),
		(4, '2024-11-01', '2024-11-01'),
		(5, '2024-07-05', '2024-07-07'),
		(5, '2024-07-27', '2024-07-28'),
		(5, '2024-09-01', '2024-09-07'),
		(5, '2024-09-25', '2024-10-02'),
		(5, '2024-11-01', '2024-11-01'),
		(6, '2024-07-05', '2024-07-07'),
		(6, '2024-07-27', '2024-07-28'),
		(6, '2024-09-01', '2024-09-07'),
		(6, '2024-09-25', '2024-10-02'),
		(6, '2024-11-01', '2024-11-01');

	insert into bonus(employeeId, value, date) values
		(1, 10000, '2024-07-07'),
		(1, 150000, '2024-11-01'),
		(2, 11000, '2024-07-07'),
		(2, 165000, '2024-11-01'),
		(3, 12000, '2024-07-07'),
		(3, 180000, '2024-11-01'),
		(4, 5000, '2024-07-07'),
		(4, 75000, '2024-11-01'),
		(5, 6000, '2024-07-07'),
		(5, 90000, '2024-11-01'),
		(6, 1000000, '2024-07-07'),
		(6, 9999999, '2024-11-01');
`,
  (err, result) => {
    if (err) {
      console.error("Error creating database", err);
    } else {
      console.log("Database created successfully");
    }
  }
);
