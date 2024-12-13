const Repository = require("./repository");
const { cancelByUser } = require("./controller");

const service = {
  get: async () => {
    const repository = new Repository();
    const data = await repository.get();
    repository.disconnent();
    return data;
  },

  getById: async (reqData) => {
    const repository = new Repository();
    const data = await repository.getById(reqData);
    repository.disconnent();
    return data;
  },

  create: async (reqData) => {
    const repository = new Repository();

    if (
      reqData.name === undefined ||
      reqData.position === undefined ||
      reqData.salary === undefined ||
      reqData.status === undefined ||
      reqData.childs === undefined
    ) {
      throw Error("Не заплонены обязательные поля");
    }

    if (reqData.salary < 0) {
      throw Error("Зарплата не может быть < 0");
    }

    if (reqData.childs < 0) {
      throw Error("Количество детей не может быть < 0");
    }

    const data = await repository.createTicket(reqData);
    repository.disconnent();
    return data;
  },

  edit: async (reqData) => {
    const repository = new Repository();

    if (
      reqData.name === undefined ||
      reqData.position === undefined ||
      reqData.salary === undefined ||
      reqData.status === undefined ||
      reqData.childs === undefined
    ) {
      throw Error("Не заплонены обязательные поля");
    }

    if (reqData.salary < 0) {
      throw Error("Зарплата не может быть < 0");
    }

    if (reqData.childs < 0) {
      throw Error("Количество детей не может быть < 0");
    }

    const data = await repository.edit(reqData);
    repository.disconnent();
    return data;
  },

  delete: async (reqData) => {
    const repository = new Repository();
    const data = await repository.delete(reqData);
    repository.disconnent();
    return data;
  },
};

module.exports = service;
