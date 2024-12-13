const { Pool } = require("pg");

class Repository {
  constructor() {
    this.pool = new Pool({
      connectionString:
        "postgres://byidfxxm:S1cQql65YbmWTrggAZJwRL1F05OJnE-A@kandula.db.elephantsql.com/byidfxxm",
    });
  }

  disconnent() {
    this.pool.end();
  }

  async get() {
    const query = `
			SELECT * from employee;
		`;
    const data = await this.pool.query(query);
    return data.rows[0];
  }

  async getById(reqData) {
    const query = `
			SELECT * from employee
			WHERE employee.id = '${reqData.id}';
		`;
    const data = await this.pool.query(query);
    return data.rows[0];
  }

  async create(reqData) {
    const query = `
			INSERT INTO employee(name, position, salary, status, childs) 
			VALUES ('${reqData.name}', '${reqData.position}', '${reqData.salary}', '${reqData.status}', '${reqData.childs}') 
			RETURNING *;
		`;
    const data = await this.pool.query(query);
    return data.rows[0];
  }

  async edit(reqData) {
    const query = `
			UPDATE ticket 
			SET name = '${reqData.name}', position = '${reqData.position}', salary = '${reqData.salary}', status = '${reqData.status}', childs = '${reqData.childs}'
			WHERE id = '${reqData.id}' 
			RETURNING *;`;
    const data = await this.pool.query(query);
    return data.rows[0];
  }

  async delete(reqData) {
    const query = `
			DELETE FROM ticket 
			WHERE id = '${reqData.id}' 
			RETURNING *;`;
    const data = await this.pool.query(query);
    return data.rows[0];
  }
}
module.exports = Repository;
