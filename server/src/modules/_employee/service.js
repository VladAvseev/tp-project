const Repository = require("./repository");

const service = {
  async get() {
    const repository = new Repository();
    const data = await repository.get();
    repository.disconnent();
    return data;
  },

  async getById(reqData) {
    const repository = new Repository();
    const data = await repository.getById(reqData);
    repository.disconnent();
    return data;
  },

  async create(reqData) {
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

    const data = await repository.create(reqData);
    repository.disconnent();
    return data;
  },

  async edit(reqData) {
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

  async delete(reqData) {
    const repository = new Repository();
    const data = await repository.delete(reqData);
    repository.disconnent();
    return data;
  },
};

module.exports = service;
