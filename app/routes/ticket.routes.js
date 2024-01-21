const express = require("express");
const router = new express.Router();
const ticket = require("../controllers/ticket.controller.js");

router.post('/', ticket.create);
router.get('/', ticket.get);

module.exports = router;