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
			SELECT * from bonus;
		`;
    const data = await this.pool.query(query);
    return data.rows[0];
  }

  async getByEmployee(reqData) {
    const query = `
			SELECT * from bonus
			WHERE bonus.employeeId = '${reqData.employeeId}';
		`;
    const data = await this.pool.query(query);
    return data.rows[0];
  }

  async create(reqData) {
    const query = `
			INSERT INTO bonus(employeeId, value, date) 
			VALUES ('${reqData.employeeId}', '${reqData.value}', '${reqData.date}') 
			RETURNING *;
		`;
    const data = await this.pool.query(query);
    return data.rows[0];
  }

  async edit(reqData) {
    const query = `
			UPDATE bonus 
			SET value = '${reqData.value}', date = '${reqData.date}'
			WHERE id = '${reqData.id}' 
			RETURNING *;`;
    const data = await this.pool.query(query);
    return data.rows[0];
  }

  async delete(reqData) {
    const query = `
			DELETE FROM bonus 
			WHERE id = '${reqData.id}' 
			RETURNING *;`;
    const data = await this.pool.query(query);
    return data.rows[0];
  }
}
module.exports = Repository;
