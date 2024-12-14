const Repository = require("./repository");

const service = {
  async get() {
    const repository = new Repository();
    const data = await repository.get();
    repository.disconnent();
    return data;
  },

  async getByEmployee(reqData) {
    const repository = new Repository();
    const data = await repository.getByEmployee(reqData);
    repository.disconnent();
    return data;
  },

  async create(reqData) {
    const repository = new Repository();

    if (
      reqData.employeeId === undefined ||
      reqData.value === undefined ||
      reqData.date === undefined
    ) {
      throw Error("Не заплонены обязательные поля");
    }

    const data = await repository.create(reqData);
    repository.disconnent();
    return data;
  },

  async edit(reqData) {
    const repository = new Repository();

    if (
      reqData.employeeId === undefined ||
      reqData.value === undefined ||
      reqData.date === undefined
    ) {
      throw Error("Не заплонены обязательные поля");
    }

    if (reqData.value <= 0) {
      throw Error("Премия не може быть отрицательной");
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
