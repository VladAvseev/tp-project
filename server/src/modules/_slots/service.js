const SlotsRepository = require("./repository");
const WEEKDAYS = require("./constants/WEEKDAYS");

const service = {
  getByWeekday: async (place_id, weekday) => {
    const repository = new SlotsRepository();
    const data = await repository.getSlotsByWeekday(place_id, weekday);
    repository.disconnect();
    return data;
  },

  getByDateToStudent: async (place_id, date) => {
    const repository = new SlotsRepository();
    const dateObject = new Date(date);
    const data = await repository.getSlotsByWeekday(
      place_id,
      WEEKDAYS[dateObject.getDay()]
    );
    repository.disconnect();
    const filteredData =
      new Date(date).toLocaleDateString() === new Date().toLocaleDateString()
        ? data.filter((slot) => slot.time > new Date().toLocaleTimeString())
        : data;
    return filteredData;
  },

  getByDateToAdmin: async (place_id, date) => {
    const repository = new SlotsRepository();
    const dateObject = new Date(date);
    const data = await repository.getSlotsByWeekday(
      place_id,
      WEEKDAYS[dateObject.getDay()]
    );
    repository.disconnect();
    return data;
  },

  delete: async (id) => {
    const repository = new SlotsRepository();
    const data = await repository.delete(id);
    repository.disconnect();
    return data;
  },

  create: async (place_id, weekday, time) => {
    const repository = new SlotsRepository();
    const data = await repository.create(place_id, weekday, time);
    repository.disconnect();
    return data;
  },

  getPlaceLimit: async (place_id) => {
    const repository = new SlotsRepository();
    const data = await repository.getPlaceLimit(place_id);
    repository.disconnect();
    return data;
  },

  setPlaceLimit: async (place_id, limit) => {
    const repository = new SlotsRepository();
    await repository.setPlaceLimit(place_id, limit);
    repository.disconnect();
  },
};
module.exports = service;
