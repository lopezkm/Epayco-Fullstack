const server 		= require('express').Router();
const User   		= require('../models').user;
const nodemailer 	= require('nodemailer');

/* =================================================================================
* 		[ Registra una nueva cuenta de usuario ]
* ================================================================================= */

server.post('/register', (request, response) => {

	const { firstName, lastName, email, documentNumber, phoneNumber, password } = request.body;
	
	User.findOrCreate({
		where: {
			email
		},
		defaults: {
			firstName,
			lastName,
			documentNumber,
			phoneNumber,
			password,
			balance: 0
		}
	})
	.then(([ user, created ]) => {
		if (!created) {
			return response.status(409).send('User already exists');
		}
		response.status(200).send(user);
	})
	.catch((error) => {
		response.status(500).send(error);
	});
} );

/* =================================================================================
* 		[ Identifica un usuario con su cuenta ]
* ================================================================================= */

server.post('/login', (request, response) => {
	const { email, password } = request.body;
	
	User.findOne({
		where: {
			email,
		}
	})
	.then( user => {
		if (!user) {
			return response.status(404).send('User is not registered');
		} else if (user.password !== password) {
			return response.status(401).send('Wrong password');
		}
		response.status(200).send(user);
	})
	.catch((error) => {
		response.status(500).send(error);
	});
} ); 

/* =================================================================================
* 		[ Agregar dinero en cuenta ]
* ================================================================================= */

server.put('/addMoney', (request, response) => {
	const { documentNumber, phoneNumber, money, balance } = request.body;
	User.findOne({
		where: {
			documentNumber,
		}
	})
	.then( user => {
		if (!user) {
			return response.status(404).send('Wrong document number');
		} else if (user.phoneNumber !== phoneNumber) {
			return response.status(401).send('Wrong phone number');
		}
		return user.update({
			...user,
			balance: (parseFloat(money) + parseFloat(balance)).toFixed(2) 
		})
		.then(user => {
			response.status(200).send(user);
		} )
		.catch((error) => {
			response.status(500).send(error);
		});
	} );
} );

/* =================================================================================
* 		[ Descuento de saldo al realizar una compra ]
* ================================================================================= */

server.put('/substractMoney', (request, response) => {
	const { documentNumber, phoneNumber, shopAmount, balance } = request.body;
	User.findOne({
		where: {
			documentNumber,
		}
	})
	.then( user => {
		if (!user) {
			return response.status(404).send('Wrong document number');
		} else if (user.phoneNumber !== phoneNumber) {
			return response.status(401).send('Wrong phone number');
		}
		return user.update({
			...user,
			balance: (parseFloat(balance) - parseFloat(shopAmount)).toFixed(2) 
		})
		.then(user => {
			response.status(200).send(user);
		} )
		.catch((error) => {
			response.status(500).send(error);
		});
	} );
} );

/* =================================================================================
* 		[ Envía un mail al usuario para confirmar una compra ]
* ================================================================================= */

server.post('/confirm', (request, response) => {
	const { firstName, email, code } = request.body;
	
	if (!email) {
		return response.status(400).send('Email is required');
	}
	
	const htmlEmail = `
    <h3>Email enviado desde ePayco</h3>
    <p>${firstName} por favor, confirma tu compra con el código proporcionado</p>
    <h3> Tu código: ${code} </h3>`;
    
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'quesellotuc@gmail.com',
			pass: 'd1e9s8w3a'
        }
    });
	
	let mailOptions = {
		from:'ePayco',
        to: email,
        subject: 'Código de confirmación de compra',
        html: htmlEmail
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if(err) {
            return console.log("llegue aqui", err);
        }
        console.log("Mensaje enviado: %s", info);
    });
} ); 

/* =================================================================================
* 		[ Exportamos nuestras rutas ]
* ================================================================================= */

module.exports = server;