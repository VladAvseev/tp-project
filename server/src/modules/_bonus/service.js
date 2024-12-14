const Repository = require("./repository");

const service = {
  get: async () => {
    const repository = new Repository();
    const data = await repository.get();
    repository.disconnent();
    return data;
  },

  getByEmployee: async (reqData) => {
    const repository = new Repository();
    const data = await repository.getByEmployee(reqData);
    repository.disconnent();
    return data;
  },

  create: async (reqData) => {
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

  edit: async (reqData) => {
    const repository = new Repository();

    if (
      reqData.employeeId === undefined ||
      reqData.value === undefined ||
      reqData.date === undefined
    ) {
      throw Error("Не заплонены обязательные поля");
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
