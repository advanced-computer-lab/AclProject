const express = require('express');
const router = express.Router();

const Flight = require('../../models/UserFlight');
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'aclprojectguc@gmail.com',
      pass: 'ASDfgh123123'
    }
  });


router.get('/', (req, res) => {
  UserFlight.find()
    .then(flights => res.json(flights))
    .catch(err => res.status(404).json({ noflightsfound: 'No Flights found' }));
});

router.post('/sendemail', (req, res) => {
	try {
		var mailOptions = {
			from: 'aclprojectguc@gmail.com',
			to: req.body.email,
			subject: 'Reservation deleted',
			text: 'You deleted your reservation successfully'
		  };
		  
		  console.log('Email sent')
		  
		  
		  transporter.sendMail(mailOptions, function(error, info){
			if (error) {
			  console.log(error);
			} else {
			  console.log('Email sent: ' + info.response);
			}
		  })
		res.json({ status: 'ok' })
	} catch (err) {
		res.json({ status: 'error', error: 'Duplicate email' })
	}
})

router.delete('/:id', (req, res) => {
  Flight.findByIdAndRemove(req.params.id, req.body)
    .then(flight => res.json({ mgs: 'Flight entry deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No such a flight' }));
});

router.put('/deletedflight', (req, res) => {
	Flight.remove({flight_id: req.body.flight_id})
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
			seats_booked: req.body.seats_booked,
			cabin: req.body.cabin,
			price: req.body.price,
			booking_reference: req.body.booking_reference
		})
		res.json({ status: 'ok' })
	} catch (err) {
		res.json({ status: 'error', error: 'Duplicate email' })
	}
})

module.exports = router;