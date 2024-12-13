const { Pool } = require("pg");

const pool = new Pool({
  connectionString:
    "postgres://byidfxxm:S1cQql65YbmWTrggAZJwRL1F05OJnE-A@kandula.db.elephantsql.com/byidfxxm",
});

pool.query(
  `
	drop table if exists employee;

	create table employee (
		id serial PRIMARY KEY,
		name varchar(256) not null,
		position varchar(256) not null,
		salary integer not null,
		status varchar(32) not null,
		childs integer not null
	);

	insert into employee(name, position, salary, status, childs) values
		('Влад Авсеев', 'Преподаватель', 100000, 'Холост', 0),
		('Назар Шатило', 'Преподаватель', 110000, 'Холост', 1),
		('Саша Яковлев', 'Преподаватель', 120000, 'Холост', 2),
		('Артем Зеньков', 'Ассистент', 50000, 'Женат', 3),
		('Саша Маркуш', 'Ассистент', 60000, 'Женат', 4),
		('Саша Кухтеня', 'Декан', 999999, 'Женат', 99);
`,
  (err, result) => {
    if (err) {
      console.error("Error creating database", err);
    } else {
      console.log("Database created successfully");
    }
  }
);
