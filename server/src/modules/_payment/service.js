const Repository = require("./repository");
const employeeService = require("../_employee/service");
const leaveService = require("../_leave/service");
const bonusService = require("../_bonus/service");

const service = {
  async calcPayment(data) {
    const [employee] = await employeeService.getById({ id: data.employeeId });
    const leaves = await leaveService.getByEmployee(data);
    const bonuses = await bonusService.getByEmployee(data);

    let workDays = 0;
    let sickLeaveDays = 0;

    const dateFinish = new Date(data.dateFinish);
    let tempDate = new Date(data.dateStart);

    while (tempDate <= dateFinish) {
      let isSickLeaveDay = false;
      leaves.forEach((leave) => {
        if (
          tempDate >= leave.dateStart &&
          tempDate <= leave.dateFinish &&
          tempDate.getDay() !== 0 &&
          tempDate.getDay() !== 6
        ) {
          isSickLeaveDay = true;
          sickLeaveDays++;
        }
      });

      if (
        !isSickLeaveDay &&
        tempDate.getDay() !== 0 &&
        tempDate.getDay() !== 6
      ) {
        workDays++;
      }

      bonuses.forEach((bonus) => {
        if (tempDate.getTime() === bonus.date.getTime()) {
          value += bonus.value;
        }
      });

      tempDate = new Date(tempDate.getTime() + 24 * 60 * 60 * 1000);
    }

    value +=
      (employee.salary / 20) * workDays +
      (employee.salary / 20) * 0.5 * sickLeaveDays;

    return {
      value,
      workDays,
      sickLeaveDays,
    };
  },

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
        "Дата начала периода оплаты не может быть позже даты окончания периода оплаты"
      );
    }

    const { value, workDays, sickLeaveDays } = this.calcPayment(reqData);

    const data = await repository.create({
      ...reqData,
      value,
      workDays,
      sickLeaveDays,
    });
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
