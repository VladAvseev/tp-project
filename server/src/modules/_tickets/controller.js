const service = require('./service');

const controller = {
	getByUser: async (req, res) => {
		try {
			const { user_id } = req.body;
			const data = await service.getByUser(user_id);
			res.json(data);
		} catch(e) {
			res.status(500).send({ message: e.message });
		}
	},

	getByAdmin: async (req, res) => {
		try {
			const ticktetsData = req.body;
			const data = await service.getByAdmin(ticktetsData);
			res.json(data);
		} catch(e) {
			res.status(500).send({ message: e.message });
		}
	},

	create: async (req, res) => {
		try {
			const ticketData = req.body;
			const data = await service.create(ticketData);
			res.json(data);
		} catch(e) {
			res.status(500).send({ message: e.message });
		}
	},

	cancelByUser: async (req, res) => {
		try {
			const { ticket_id } = req.body;
			const data = await service.cancelByUser(ticket_id);
			res.json(data);
		} catch(e) {
			res.status(500).send({ message: e.message });
		}
	},

	cancelByAdmin: async (req, res) => {
		try {
			const { ticket_id } = req.body;
			const data = await service.cancelByAdmin(ticket_id);
			res.json(data);
		} catch(e) {
			res.status(500).send({ message: e.message });
		}
	},

	acceptByAdmin: async (req, res) => {
		try {
			const { ticket_id } = req.body;
			const data = await service.acceptByAdmin(ticket_id);
			res.json(data);
		} catch(e) {
			res.status(500).send({ message: e.message });
		}
	},
};
module.exports = controller;