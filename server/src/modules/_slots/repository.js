const { Pool } = require("pg");

class Repository {
  constructor() {
    this.pool = new Pool({
      connectionString:
        "postgres://byidfxxm:S1cQql65YbmWTrggAZJwRL1F05OJnE-A@kandula.db.elephantsql.com/byidfxxm",
    });
  }

  async disconnect() {
    this.pool.end();
  }

  async getSlotsByWeekday(place_id, day) {
    const query = `
			SELECT * FROM session WHERE session.place_id = '${place_id}' AND session.weekday = '${day}'
			ORDER BY session.time;
		`;
    const data = await this.pool.query(query);
    return data.rows;
  }

  async delete(id) {
    const query = `
			DELETE FROM session WHERE session.id = '${id}'
		`;
    const data = await this.pool.query(query);
    return data;
  }

  async create(place_id, weekday, time) {
    const query = `
			INSERT INTO session(place_id, weekday, time) 
			VALUES ('${place_id}', '${weekday}', '${time}');
		`;
    const data = await this.pool.query(query);
    return data;
  }

  async getPlaceLimit(place_id) {
    const query = `
			SELECT students_limit FROM place WHERE place.id = '${place_id}'
		`;
    const data = await this.pool.query(query);
    return data.rows[0];
  }

  async setPlaceLimit(place_id, limit) {
    const query = `
			UPDATE public.place SET students_limit = ${limit} WHERE place.id = '${place_id}'
		`;
    await this.pool.query(query);
  }
}
module.exports = Repository;
