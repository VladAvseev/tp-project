const TicketsRepository = require("../_tickets/repository");
const { cancelByUser } = require("./controller");

const service = {
  isTicketsLessThanLimit: async (place_id, date, time) => {
    const repository = new TicketsRepository();
    const limit = await repository.getPlaceLimit(place_id);
    const ticketsCount = await repository.getTicketsByDateTime({ date, time });

    repository.disconnent();
    return Number(ticketsCount) < limit;
  },

  getByUser: async (user_id) => {
    const repository = new TicketsRepository();

    const data = await repository.getTicketsByUser(user_id);
    repository.disconnent();
    return data;
  },

  getByAdmin: async (ticketData) => {
    const repository = new TicketsRepository();

    const data = await repository.getTicketsByAdmin(ticketData);
    repository.disconnent();
    return data;
  },

  create: async (ticketData) => {
    const repository = new TicketsRepository();

    const tickets = await repository.getTicketsByUserDateTimePlace(ticketData);
    if (tickets.length) {
      throw Error("Вы уже записаны");
    }

    const limit = await repository.getPlaceLimit(ticketData.place_id);
    const ticketsCount = await repository.getTicketsByDateTime(ticketData);

    if (ticketsCount && ticketsCount.length >= limit) {
      throw Error("Свободных мест нет");
    }

    const data = await repository.createTicket(ticketData);
    repository.disconnent();
    return data;
  },

  async cancelByUser(ticket_id) {
    const repository = new TicketsRepository();
    const data = await repository.cancelTicketByUser(ticket_id);
    repository.disconnent();
    return data;
  },

  async cancelByAdmin(ticket_id) {
    const repository = new TicketsRepository();
    const data = await repository.cancelTicketByAdmin(ticket_id);
    repository.disconnent();
    return data;
  },

  async acceptByAdmin(ticket_id) {
    const repository = new TicketsRepository();
    const data = await repository.acceptTicketByAdmin(ticket_id);
    repository.disconnent();
    return data;
  },
};

module.exports = service;
