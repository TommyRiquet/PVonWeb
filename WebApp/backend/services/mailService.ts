var nodemailer = require('nodemailer')

require('dotenv').config()

import { User } from 'entity'

import { passwordEmailTemplate } from './templates/passwordMailTemplate'

export const sendPasswordMail = async (user: User, password: string) => {
		
	var transporter = nodemailer.createTransport({
	service: 'gmail',
	host: 'smtp.gmail.com',
	port: 465,
	secure: true,
	auth: {
		user: process.env.NODEMAILER_EMAIL,
		pass: process.env.NODEMAILER_PASSWORD
	}
	})

	var mailOptions = {
	from: process.env.NODEMAILER_MAIL,
	to: user.email,
	subject: 'Account Information',
	html: passwordEmailTemplate(user, password)
	}

	return await transporter.sendMail(mailOptions, async (error, info) => {
		if (error) {
			return (JSON.stringify({status: 500, message: error}))
		} else if (info) {
			return (JSON.stringify({status: 200, message: 'Email sent'}))
		}
	})

}