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
			SELECT * from payment;
		`;
    const data = await this.pool.query(query);
    return data.rows;
  }

  async getByEmployee(reqData) {
    const query = `
			SELECT * from payment
			WHERE payment.employeeId = '${reqData.employeeId}';
		`;
    const data = await this.pool.query(query);
    return data.rows;
  }

  async create(reqData) {
    const query = `
			INSERT INTO payment(employeeId, dateStart, dateFinish, value, workDays, sickLeaveDays) 
			VALUES ('${reqData.employeeId}', '${reqData.dateStart}', '${reqData.dateFinish}', '${reqData.value}', '${reqData.workDays}', '${reqData.sickLeaveDays}') 
			RETURNING *;
		`;
    const data = await this.pool.query(query);
    return data.rows;
  }

  async delete(reqData) {
    const query = `
			DELETE FROM payment 
			WHERE id = '${reqData.id}' 
			RETURNING *;`;
    const data = await this.pool.query(query);
    return data.rows;
  }
}
module.exports = Repository;
