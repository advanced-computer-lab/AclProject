const express = require('express');
const router = express.Router();

const Flight = require('../../models/UserFlight');


router.get('/', (req, res) => {
  UserFlight.find()
    .then(flights => res.json(flights))
    .catch(err => res.status(404).json({ noflightsfound: 'No Flights found' }));
});

module.exports = router;