const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../../models/User');
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'aclprojectguc@gmail.com',
		pass: 'ASDfgh123123'
	}
});


router.get('/', (req, res) => {
	User.find()
		.then(user => res.json(user))
		.catch(err => res.status(404).json({ nouserfound: 'No User found' }));

});

router.post('/registration', async (req, res) => {
	console.log(req.body)
	try {
		const user = await User.findOne({
			username: req.body.username.toLowerCase(),
		})
		const email = await User.findOne({
			email: req.body.email.toLowerCase(),
		})



		if (user) {
			return res.json("Username already taken")
		}
		if (email) {

			return res.json("Another account is registered by this email")
		}

		else {
			const newPassword = await bcrypt.hash(req.body.password, 10)
			await User.create({
				username: req.body.username.toLowerCase(),
				firstname: req.body.firstname,
				lastname: req.body.lastname,
				email: req.body.email.toLowerCase(),
				address: req.body.address,
				countrycode: req.body.countrycode,
				telenumber1: req.body.telenumber1,
				telenumber2: req.body.telenumber2,
				telenumber3: req.body.telenumber3,
				password: newPassword,
				passport: req.body.passport,
			})
		}
		return res.json("User Created")
	} catch (err) {
		res.json({ status: 'error', error: 'Duplicate email' })
	}
})

router.post('/login', async (req, res) => {
	var user;
	if (req.body.username === "Administrator" || req.body.username === "administrator")
		user = await User.findOne({
			username: "Administrator",
		})
	else {
		user = await User.findOne({
			username: req.body.username.toLowerCase(),
		})
	}

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

router.post('/forgotpassword', async (req, res) => {
	var user;
	user = await User.findOne({
		email: req.body.email.toLowerCase(),
	})

	if (!user) {
		return res.json("User not found")
	}
	transporter.sendMail(req.body.mailOptions, function (error, info) {
		if (error) {
			console.log(error);
		} else {
			console.log('Email sent: ' + info.response);
		}
		return res.json("sss")
	})
})

router.put('/:id', (req, res) => {

	User.findByIdAndUpdate(req.params.id, req.body)
		.then(user => res.json({ msg: 'Updated successfully' }))
		.catch(err =>
			res.status(400).json({ error: 'Unable to update the Database' })
		);
});

router.put('/password/:id', async (req, res) => {

	const newPassword = await bcrypt.hash(req.body.password, 10)
	var datapassword = { password: newPassword }

	User.findByIdAndUpdate(req.params.id, datapassword)
		.then(user => res.json({ msg: 'Updated successfully' }))
		.catch(err =>
			res.status(400).json({ error: 'Unable to update the Database' })
		);
});

router.post('/:id', async (req, res) => {
	try {
		const user = await User.findById(req.params.id)
		const isPasswordValid = await bcrypt.compare(
			req.body.oldpassword,
			user.password
		)
		if (isPasswordValid) {
			return res.json('Match')
		}

	}
	catch (err) {
		res.json({ status: 'error', error: 'Error Old Password' })
	}
});



module.exports = router;