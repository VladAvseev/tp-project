const service = require("./service");

const controller = {
  get: async (req, res) => {
    try {
      const data = await service.get();
      res.json(data);
    } catch (e) {
      res.status(500).send({ message: e.message });
    }
  },

  getById: async (req, res) => {
    try {
      const reqData = req.body;
      const data = await service.getById(reqData);
      res.json(data);
    } catch (e) {
      res.status(500).send({ message: e.message });
    }
  },

  create: async (req, res) => {
    try {
      const reqData = req.body;
      const data = await service.create(reqData);
      res.json(data);
    } catch (e) {
      res.status(500).send({ message: e.message });
    }
  },

  edit: async (req, res) => {
    try {
      const reqData = req.body;
      const data = await service.edit(reqData);
      res.json(data);
    } catch (e) {
      res.status(500).send({ message: e.message });
    }
  },

  delete: async (req, res) => {
    try {
      const reqData = req.body;
      const data = await service.delete(reqData);
      res.json(data);
    } catch (e) {
      res.status(500).send({ message: e.message });
    }
  },
};
module.exports = controller;
