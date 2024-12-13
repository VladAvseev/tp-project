const { Pool } = require("pg");

/* 
STATUS: active, accepted, canceled_by_student, canceled_by_admin
*/

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

  async createTicket(ticketData) {
    const query = `
			INSERT INTO ticket(user_id, place_id, date, time, status) 
			VALUES ('${ticketData.user_id}', '${ticketData.place_id}', '${ticketData.date}', '${ticketData.time}', 'active') 
			RETURNING *;
		`;
    const data = await this.pool.query(query);
    return data.rows[0];
  }

  async getPlaceLimit(place_id) {
    const query = `SELECT students_limit from place WHERE place.id = '${place_id}'`;
    const data = await this.pool.query(query);
    return data.rows[0].students_limit;
  }

  async getTicketsByDateTime(ticketData) {
    const query = `
			SELECT * FROM ticket 
			WHERE ticket.date = '${ticketData.date}' AND ticket.time = '${ticketData.time}';
		`;
    const data = await this.pool.query(query);
    return data.rows;
  }

  async getTicketsByUserDateTimePlace(ticketData) {
    const query = `
			SELECT * FROM ticket 
			WHERE 
				ticket.user_id = '${ticketData.user_id}' 
				AND ticket.date = '${ticketData.date}' 
				AND ticket.time = '${ticketData.time}'
				AND ticket.place_id = '${ticketData.place_id}';
		`;
    const data = await this.pool.query(query);
    return data.rows;
  }

  async getTicketsByUser(user_id) {
    const query = `
		SELECT ticket.id, ticket.date, ticket.time, ticket.user_id, ticket.status, place.name as place_name
		FROM ticket 
		JOIN place ON ticket.place_id = place.id
		WHERE ticket.user_id = ${user_id}
		ORDER BY
				CASE
						WHEN ticket.status = 'active' THEN 1
						ELSE 2
				END,
				ticket.date DESC,
				ticket.time DESC;
		`;
    const data = await this.pool.query(query);
    return data.rows;
  }

  async getTicketsByAdmin({ place_id, date, time }) {
    const query = `
		SELECT ticket.id, ticket.status, users.name as user_name, users.second_name as user_second_name, users.room
		FROM ticket 
		JOIN users ON ticket.user_id = users.id
		WHERE ticket.place_id = '${place_id}' AND ticket.date = '${date}' AND ticket.time = '${time}'
		ORDER BY
				CASE
						WHEN ticket.status = 'active' THEN 1
						ELSE 2
				END;
		`;
    const data = await this.pool.query(query);
    return data.rows;
  }

  async getActiveTicketsByUser(user_id) {
    const query = `SELECT 
* from ticket WHERE ticket.user_id = '${user_id}' AND ticket.status = 'active';`;
    const data = await this.pool.query(query);
    return data.rows;
  }

  async cancelTicketByUser(ticket_id) {
    const query = `UPDATE public.ticket SET status = 'canceled_by_student' WHERE id = ${ticket_id};`;
    const data = await this.pool.query(query);
    return data.rows[0];
  }

  async cancelTicketByAdmin(ticket_id) {
    const query = `UPDATE ticket SET status = 'canceled_by_admin' WHERE id = '${ticket_id}' RETURNING *;`;
    const data = await this.pool.query(query);
    return data.rows[0];
  }

  async acceptTicketByAdmin(ticket_id) {
    const query = `UPDATE ticket SET status = 'accepted' WHERE id = '${ticket_id}' RETURNING *;`;
    const data = await this.pool.query(query);
    return data.rows[0];
  }

  closeConnection() {
    this.pool.end();
  }
}
module.exports = Repository;
