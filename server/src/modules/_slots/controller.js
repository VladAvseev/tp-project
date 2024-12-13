const service = require('./service');

const controller = {
	getByDateToStudent: async (req, res) => {
		const { place_id, date } = req.body;
		const data = await service.getByDateToStudent(place_id, date);
		res.json(data);
	},

	getByDateToAdmin: async (req, res) => {
		const { place_id, date } = req.body;
		const data = await service.getByDateToAdmin(place_id, date);
		res.json(data);
	},

	getByWeekday: async (req, res) => {
		const { place_id, weekday } = req.body;
		const data = await service.getByWeekday(place_id, weekday);
		res.json(data);
	},

	delete: async (req, res) => {	
		const { id } = req.body;
		const data = await service.delete(id);
		res.json(data);
	},

	create: async (req, res) => {
		const { place_id, weekday, time } = req.body;
		const data = await service.create(place_id, weekday, time);
		res.json(data);
	},

	getPlaceLimit: async (req, res) => {
		const { place_id } = req.body;
		const data = await service.getPlaceLimit(place_id);
		res.json(data);
	},

	setPlaceLimit: async (req, res) => {
		const { place_id, limit } = req.body;
		const data = await service.setPlaceLimit(place_id, limit);
		res.json(data);
	},
};
module.exports = controller;