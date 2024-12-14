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
			SELECT * from leave;
		`;
    const data = await this.pool.query(query);
    return data.rows[0];
  }

  async getByEmployee(reqData) {
    const query = `
			SELECT * from leave
			WHERE leave.employeeId = '${reqData.employeeId}';
		`;
    const data = await this.pool.query(query);
    return data.rows[0];
  }

  async create(reqData) {
    const query = `
			INSERT INTO leave(employeeId, dateStart, dateFinish) 
			VALUES ('${reqData.employeeId}', '${reqData.dateStart}', '${reqData.dateFinish}') 
			RETURNING *;
		`;
    const data = await this.pool.query(query);
    return data.rows[0];
  }

  async edit(reqData) {
    const query = `
			UPDATE leave 
			SET dateStart = '${reqData.dateStart}', dateFinish = '${reqData.dateFinish}'
			WHERE id = '${reqData.id}' 
			RETURNING *;`;
    const data = await this.pool.query(query);
    return data.rows[0];
  }

  async delete(reqData) {
    const query = `
			DELETE FROM leave 
			WHERE id = '${reqData.id}' 
			RETURNING *;`;
    const data = await this.pool.query(query);
    return data.rows[0];
  }
}
module.exports = Repository;
