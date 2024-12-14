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
      reqData.dateStart === undefined ||
      reqData.dateFinish === undefined
    ) {
      throw Error("Не заплонены обязательные поля");
    }

    const dateStart = new Date(reqData.dateStart);
    const dateFinish = new Date(reqData.dateFinish);

    if (dateStart > dateFinish) {
      throw Error(
        "Дата начала отгула не может быть позже даты окончания отгула"
      );
    }

    const data = await repository.create(reqData);
    repository.disconnent();
    return data;
  },

  async edit(reqData) {
    const repository = new Repository();

    if (
      reqData.employeeId === undefined ||
      reqData.dateStart === undefined ||
      reqData.dateFinish === undefined
    ) {
      throw Error("Не заплонены обязательные поля");
    }

    const dateStart = new Date(reqData.dateStart);
    const dateFinish = new Date(reqData.dateFinish);

    if (dateStart > dateFinish) {
      throw Error(
        "Дата начала отгула не может быть позже даты окончания отгула"
      );
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
