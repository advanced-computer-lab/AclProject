const express = require('express');
const router = express.Router();

const Flight = require('../../models/UserFlight');


router.get('/', (req, res) => {
  UserFlight.find()
    .then(flights => res.json(flights))
    .catch(err => res.status(404).json({ noflightsfound: 'No Flights found' }));
});

router.delete('/:id', (req, res) => {
  Flight.findByIdAndRemove(req.params.id, req.body)
    .then(flight => res.json({ mgs: 'Flight entry deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No such a flight' }));
});

router.post('/reserve', async (req, res) => {
	console.log(req.body)
	try {
		await UserFlight.create({
			username: req.body.username,
			flight_number: req.body.flight_number,
			flight_id: req.body.flight_id,
			seats_booked: req.body.seats_booked
		})
		res.json({ status: 'ok' })
	} catch (err) {
		res.json({ status: 'error', error: 'Duplicate email' })
	}
})

module.exports = router;