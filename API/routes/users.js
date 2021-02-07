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
* 		[ Devuelve el usuario logueado o 401 en caso contrario ]
* ================================================================================= */

/* server.get( '/me', isAuthenticated, ( request, response, next ) => {
	response.status( 200 ).send( request.user );
} ); */

/* =================================================================================
* 		[ Borra la sesión de un usuario ]
* ================================================================================= */

/* server.get( '/logout', isAuthenticated, ( request, response, next ) => {
	request.logout( );
	response.sendStatus( 200 );
} ); */


/* =================================================================================
* 		[ Obtención de un usuario particular ]
* ================================================================================= */

/* server.get( '/:id', hasAccessLevel( ), ( request, response ) => {
	let { id } = request.params;
	
	User.findByPk( id ).then( ( user ) => {
		if ( !user ) {
			return response.sendStatus( 404 );
		}
		
		response.status( 200 ).send( user );
	} );
} ); */

/* =================================================================================
* 		[ Obtención de todos los usuarios ]
* ================================================================================= */

/* server.get( '/', hasAccessLevel( ), ( request, response ) => {
	User.findAll( ).then( ( users ) => {
		response.status( 200 ).send( users );
	} );
} ); */

/* =================================================================================
* 		[ Modificación de un usuario ]
* ================================================================================= */

/* server.put( '/:id', hasAccessLevel( ), ( request, response ) => {
	const { id } = request.params;
	
	User.findByPk( id ).then( ( user ) => {
		if ( !user ) {
			return response.sendStatus( 404 );
		}
		
		return user.update( {
			...request.body
		}, {
			fields: [ 'firstName', 'lastName', 'email' ]
		} )
		.then( ( user ) => {
			response.status( 200 ).send( user );
		} );
	} );
} ); */

/* =================================================================================
* 		[ Eliminación de un usuario ]
* ================================================================================= */

/* server.delete( '/:id', hasAccessLevel( ), ( request, response ) => {
	let { id } = request.params;
	
	User.findByPk( id ).then( ( user ) => {
		if ( !user ) {
			return response.sendStatus( 404 );
		}
		
		user.destroy( ).then( ( ) => {
			response.sendStatus( 204 );
		} );
	} );
} ); */

/* =================================================================================
* 		[ Envía un mail al usuario para reestablecer su contraseña ]
* ================================================================================= */

/* server.post( '/forgot', ( request, response ) => {
	const { email } = request.body;
	
	if ( !email ) {
		return response.status( 400 ).send( 'Email is required' );
	}
	
	User.findOne( {
		where: {
			email
		}
	} )
	.then( ( user ) => {
		if ( !user ) {
			response.status( 404 ).send( 'Email does not exist' );
			
			return null;
		}
		
		return ResetToken.findOrCreate( {
			where: [ {
				userId: user.id,
				used: false,
				expiration: {
					[ Op.gt ]: Date.now( )
				}
			} ],
			defaults: {
				userId: user.id
			}
		} );
	} )
	.then( ( data ) => {
		if ( data === null ) {
			return;
		}
		
		const [ resetToken, created ] = data;
		
		if ( !created ) {
			const now = Date.now( );
			
			if ( ( now - resetToken.requested ) < 300000 ) {
				return response.status( 409 ).send( 'User already requested a password reset' );
			}
			
			resetToken.update( { request: now } );
		}
		
		const transporter = nodemailer.createTransport( {
			service: 'gmail',
			auth: {
				user: `${ process.env.GMAIL_USER }`,
				pass: `${ process.env.GMAIL_PASSWORD }`
			}
		} );

		const mailOptions = {
			from: `"Six Games" <${ process.env.GMAIL_USER }>`,
			to: email,
			subject: '[Six Games] Reinicio de clave',
			text: '¡Hola! Estás recibiendo este correo porque tú (o alguien más) requirió reestablecer la clave de tu cuenta.\n' +
				'Por favor, presiona en el siguiente enlace para reestablecer tu clave (tienes una hora):\n\n' +
				`${ process.env.FRONT_URL }/reset/${ resetToken.token }\n\n` +
				'Si no fuiste tú quien pidió el reestablecimiento de tu clave, por favor ignora este mensaje.\n'
		};
		
		transporter.sendMail( mailOptions, ( mailError, mailResponse ) => {
			mailError ?
				response.status( 409 ).send( 'Recovery email could not be sent' ) :
				response.status( 200 ).send( 'Recovery email was sent successfully' );
		} );
	} )
	.catch( ( error ) => {
		response.sendStatus( 500 );
	} );
} ); */

/* =================================================================================
* 		[ Exportamos nuestras rutas ]
* ================================================================================= */

module.exports = server;