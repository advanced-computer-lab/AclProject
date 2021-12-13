const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../../models/User');


router.get('/', (req, res) => {
	User.find()
	  .then(user => res.json(user))
	  .catch(err => res.status(404).json({ nouserfound: 'No User found' }));
	  
  });

router.post('/registration', async (req, res) => {
	console.log(req.body)
	try {
		const user = await User.findOne({
			username: req.body.username,
		})
		const email = await User.findOne({
			email: req.body.email,
		})
		

	
		if (user) {
			return res.json("Username already taken")
		}
		if(email){

     	return res.json("Another account is registered by this email")
		}

		else{
				const newPassword = await bcrypt.hash(req.body.password, 10)
		await User.create({
			username: req.body.username,
			firstname: req.body.firstname,
			lastname: req.body.lastname,
			email: req.body.email,
			address: req.body.address,
			countrycode: req.body.countrycode,
			telenumber1: req.body.telenumber1,
			telenumber2: req.body.telenumber2,
			telenumber3: req.body.telenumber3,
			password: newPassword,
			passport: req.body.passport,
		})}
		return res.json("User Created")
	} catch (err) {
		res.json({ status: 'error', error: 'Duplicate email' })
	}
})

router.post('/login', async (req, res) => {
	const user = await User.findOne({
		username: req.body.username,
	})

	if (!user) {
		return res.json("User not found")
	}

	const isPasswordValid = await bcrypt.compare(
		req.body.password,
		user.password
	)

	if (isPasswordValid) {
		console.log('User logged in')
		const token = jwt.sign(
			{
				id: user._id,
				username: user.username,
				email: user.email,
			},
			'secret123'
		)
		//console.log('token '+ token)

		return res.json(token)
	} else {
		return res.json("Wrong password")
	}
})

router.put('/:id', (req, res) => {
	User.findByIdAndUpdate(req.params.id, req.body)
	  .then(user => res.json({ msg: 'Updated successfully' }))
	  .catch(err =>
		res.status(400).json({ error: 'Unable to update the Database' })
	  );
  });

module.exports = router;