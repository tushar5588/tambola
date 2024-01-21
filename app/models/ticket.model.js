module.exports = (sequelize, Sequelize) => {
  const Tickets = sequelize.define("tickets", {
    ticket: {
      type: Sequelize.JSON
    },
  });
  return Tickets;
};
