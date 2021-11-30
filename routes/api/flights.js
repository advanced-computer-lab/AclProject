const express = require('express');
const router = express.Router();

const Flight = require('../../models/Flight');

//Get all flights
router.get('/', (req, res) => {
  Flight.find()
    .then(flights => res.json(flights))
    .catch(err => res.status(404).json({ noflightsfound: 'No Flights found' }));
});

//Search for a flight
router.put('/search', (req, res) => {
	console.log(req.body)
  Flight.find(req.body)
    .then(flights => res.json(flights))
    .catch(err => res.status(404).json({ noflightsfound: 'No Flights found' }));
});


//Get a single flight by id
router.get('/:id', (req, res) => {
  Flight.findById(req.params.id)
    .then(flight => res.json(flight))
    .catch(err => res.status(404).json({ noflightfound: 'No Flight found' }));
});

//Create flight
router.post('/', async (req, res) => {
  const flight = await Flight.findOne({
		flight_number: req.body.flight_number,
	})

	if (flight) {
		return res.json("A flight with the same flight number already exists")
	}
  Flight.create(req.body)
    .then(flight => res.json({ msg: 'Flight added successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to add this flight' }));
});

//Update flight
router.put('/:id', (req, res) => {
  Flight.findByIdAndUpdate(req.params.id, req.body)
    .then(flight => res.json({ msg: 'Updated successfully' }))
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
});

//Delete flight by id
router.delete('/:id', (req, res) => {
  Flight.findByIdAndRemove(req.params.id, req.body)
    .then(flight => res.json({ mgs: 'Flight entry deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No such a flight' }));
});

module.exports = router;