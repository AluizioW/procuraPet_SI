const express = require('express');
const router = express.Router();

const feedController = require("../controllers/feedController");

router.get('/home', feedController.getEveryPostagem);

module.exports = router;