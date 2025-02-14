import jwt from "jsonwebtoken";
import userCrudMySQL from '../models/crudMySql/user.crud.js';
import { createAccessToken } from "../utils/createAccessToken.js";
import { TOKEN_SECRET } from "../utils/config.js";
const { sign, verify } = jwt;

export default {
	login: async (req, res) => {
		try {
			// Obtener los datos del cuerpo de la solicitud
			const { email, pass } = req.body

			// Verificar que no hayan campos en null
			if (!email || !pass) {
				res.status(400).json({ message: 'Faltan datos obligatorios' })
			}

			const values = ['users', 'email', email, 'pass', pass];
			const result = await userCrudMySQL.loginUser(values);
			
			if (result[0].length === 0) {
				res.status(400).json({message: `El usuario no está registrado`});
			} else {
				//Configuramos el objeto con el que construiremos el token
				const tokenFrom = { ...result[0][0]};
				console.log(tokenFrom)

				//Llamamos a la función para generar el token
				const token = await createAccessToken(tokenFrom);
				res.status(200).json(token);
			}
		} catch (error) {
			res.status(500).json({ message: 'Error al hacer login: ', error })
		}
	},
	recoveryPass: async (req, res) => {
		try {
			// Obtenemos el mail desde el cuerpo de la solicitud
			const { email } = req.body;
			
			if (!email) {
				res.status(400).json({ message: 'Faltan datos obligatorios' })
			};

			// Creamos arreglo para buscar el usuario
			const values = ['users', 'email', email];
			// Buscamos el mail en la tabla de usuarios
			const infoUser = await userCrudMySQL.getUser(values);
			
			// Si el email no existe devuelve el error 404
			if (infoUser[0].length === 0) {
				res.status(404).json({ message: 'El usuario no existe' })
			}

			// Configuramos el objeto con el que construiremos el token
			sign({ email }, TOKEN_SECRET, { expiresIn: '1h' }, (err, token) => {
				if (err) {
					res.status(401).json({ message: 'Error al generar el token' })
				}

				// Devolver el token
				res.status(200).json({message: 'Token generado correctamente', token: `Bearer: ${token}` });
			});

		} catch (e) {
			res.status(500).json({ message: 'Error al recuperar la contraseña: ', e })
		}
	},
	confirmRecovery: async (req, res) => {
		try {
			verify(req.params.token, TOKEN_SECRET, (err, decoded) => {

				// Si hay un error respondemos con el
				if (err) {
					res.status(401).json({ message: 'Error al validar el token', error: err });
				} else {
					// Extraemos el mail del payload
					const { email } = decoded;

					// UPDATE 'users' SET 'password' = 'nuevaPass' WHERE 'email' = 'email';
					const values = ['users', 'pass', req.body.pass, 'email', email];
					userCrudMySQL.updatePass(values);

					res.status(200).json({ message: 'Contraseña actualizada correctamente' });
				}
			});
		} catch (e) {
			res.status(500).json({ message: "Error en el servidor: ", error: e });
		}
	},
	register: async (req, res) => {
		try {
			// Obtenemos toda la información desde el cuerpo de la solicitud
			const { full_name, email, password, birthdate, gender } = req.body;
	
			if (!email || !full_name || !password || !birthdate || !gender) {
				res.status(400).json({ message: 'Faltan datos obligatorios' });
			}
	
			// Verificamos si el usuario ya existe
			const values = ['users', 'email', email];
			const verifyIfExist = await userCrudMySQL.getUser(values);
			console.log(verifyIfExist[0])
	
			// Si el usuario ya existe, devuelve un error
			if (verifyIfExist[0].length > 0) {
				res.status(401).json({ message: "El usuario ya está registrado" });
			} else {
				// Valores para insertar en la base de datos
				const createValues = ['users', 'full_name', 'email', 'pass', 'birthdate', 'gender', full_name, email, password, birthdate, gender];
				await userCrudMySQL.createUser(createValues);
	
				res.status(200).json({ message: `${email} registrado correctamente!` });
			}
		} catch (err) {
			res.status(500).json({ message: "Error en el registro", err });
		}
	}
}