const { get, create } = require("../../validations/ticket.validations");
const db = require("../models");
const Tickets = db.tickets;

function generateTambolaSet() {
  const set = [];
  const numberOfTicketsInSet = 6;

  // Generate N tickets for the set
  for (let ticketIndex = 0; ticketIndex < numberOfTicketsInSet; ticketIndex++) {
    const tambolaTicket = generateTambolaTicket();
    set.push({ ticket: tambolaTicket });
  }

  return set;
};

function generateTambolaTicket() {
  const ticket = [];
  const rows = 3;
  const columns = 9;

  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < columns; j++) {
      row.push(0); 
    }
    ticket.push(row);
  }

  for (let i = 0; i < rows; i++) {
    const rowNumbers = generateUniqueNumbersGreaterThanZero(1, 90, 5);

    for (let j = 0; j < Math.min(columns, rowNumbers.length); j++) {
      ticket[i][j] = rowNumbers[j];
    }
  }

  return ticket;
};

function generateUniqueNumbersGreaterThanZero(min, max, count) {
  const uniqueNumbers = new Set();

  while (uniqueNumbers.size < count) {
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    if (randomNumber > 0) {
      uniqueNumbers.add(randomNumber);
    }
  }

  return Array.from(uniqueNumbers);
};

function generateUniqueNumbers(min, max, count) {
  const uniqueNumbers = new Set();

  while (uniqueNumbers.size < count) {
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    uniqueNumbers.add(randomNumber);
  }

  return Array.from(uniqueNumbers);

};

exports.create = async (req, res) => {
  try {
    const { error } = create.validate(req.body);
    if (error) {
      res.send({ status: error?.message, code: 400 });
    } else {
      const { sets } = req?.body;
      let result = [];
      for (let setIndex = 0; setIndex < sets; setIndex++) {
        const tambolaSet = generateTambolaSet();
        const data = await Tickets.bulkCreate(tambolaSet, { returning: true });
        let obj = {}
        for (i = 0; i < data?.length; i++) {
          const { id, ticket } = data[i]?.dataValues;
          obj[id] = ticket;
          result?.push(obj);
        }
      }
      res.send({ status: "Success", code: 200, tickets: result });
    }
  } catch (err) {
    res.send({ status: "Error occured during execution", code: 500, err });
  }
};

exports.get = async (req, res) => {
  try {
    const { error } = get.validate(req?.query);
    if (error) {
      res.send({ status: error?.message, code: 400 });
    } else {
      let { page_size, page_number } = req?.query;
      page_size = Number(page_size) || 10;
      page_number = Number(page_number) || 0;
      let result = [];
      const { rows, count } = await Tickets.findAndCountAll({ offset: page_number * page_size, limit: page_size });
      for (i = 0; i < rows?.length; i++) {
        let obj = {}
        const { id, ticket } = rows[i]?.dataValues;
        obj[id] = ticket;
        result?.push(obj);
      }
      res.send({ status: "Success", code: 200, data: { tickets: result, count } });
    }
  } catch (err) {
    res.send({ status: "Error occured during execution", code: 500, err });
  }
};