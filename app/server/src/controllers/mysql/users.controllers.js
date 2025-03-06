import jwt from "jsonwebtoken";
import userCrudMySQL from '../../models/crudMySql/user.crud.js';
import tokenUtils from "../../utils/createAccessToken.js";
import bcrypt from 'bcryptjs';
import { TOKEN_SECRET } from "../../utils/config.js";
import { mailToUser } from "../../utils/email.js";
import dotenv from 'dotenv';
dotenv.config();
const { sign, verify } = jwt;

export default {
	/**
	 * Login usuario y obtención de token.
	 * @constructor
	 * @param {*} req 
	 * @param {*} res 
	 * @returns {Object}
	 */
	login: async (req, res) => {
		try {
			// Obtener los datos del cuerpo de la solicitud
			const { email, pass } = req.body

			// Verificar que no hayan campos en null
			if (!email || !pass) return res.status(400).json({ message: 'Faltan datos obligatorios' });

			// Verificar si el usuario existe
			const values = [process.env.TAB_USERS, 'email', email];
			const userFound = await userCrudMySQL.getUser(values);
			if (!userFound) return res.status(401).json({ message: 'El usuario no está registrado' });

			const isMatch = await bcrypt.compare(pass, userFound[0][0].pass);
			if (!isMatch) return res.status(402).json({ message: 'Contraseña incorrecta' });

			// Si el usuario existe, se procede a generar el token
			const tokenFrom = { ...userFound[0][0] };
			console.log(tokenFrom);

			//Llamamos a la función para generar el token
			const token = await tokenUtils.createAccessToken(tokenFrom);
			res.status(200).json( token);
		} catch (error) {
			res.status(500).json({ message: 'Error al hacer login: ', error })
		}
	},
	/**
	 * Pedir enlace para recuperar contraseña tramite email.
	 * @constructor
	 * @param {*} req 
	 * @param {*} res 
	 * @returns {Object} 
	 */
	recoveryPass: async (req, res) => {
		try {
			// Obtenemos el mail desde el cuerpo de la solicitud
			const { email } = req.body;

			if (!email) return res.status(400).json({ message: 'Faltan datos obligatorios' });

			// Creamos arreglo para buscar el usuario
			const values = [process.env.TAB_USERS, 'email', email];
			// Buscamos el mail en la tabla de usuarios
			const infoUser = await userCrudMySQL.getUser(values);

			// Si el email no existe devuelve el error 404
			if (infoUser[0].length === 0) return res.status(401).json({ message: 'El usuario no existe' });

			// Configuramos el objeto con el que construiremos el token
			sign({ email }, TOKEN_SECRET, { expiresIn: '1h' }, (err, token) => {
				if (err) res.status(402).json({ message: 'Error al generar el token' })

				mailToUser(email, token);

				res.status(200).json({ message: 'Email enviado correctamente'});
			});

		} catch (e) {
			res.status(500).json({ message: 'Error al recuperar la contraseña: ', e })
		}
	},
	/**
	 * Confirmar recuperación de contraseña.
	 * @constructor
	 * @param {*} req 
	 * @param {*} res 
	 */
	confirmRecovery: async (req, res) => {
		try {
			const decoded = verify(req.params.token, TOKEN_SECRET);
			// Extraemos el mail del payload
			const { email } = decoded;

			const passHash = await bcrypt.hash(req.body.pass, 10);

			// UPDATE 'users' SET 'password' = 'nuevaPass' WHERE 'email' = 'email';
			const values = [process.env.TAB_USERS, 'pass', passHash, 'email', email];
			userCrudMySQL.updatePass(values);

			res.status(200).json({ message: 'Contraseña actualizada correctamente' });
		} catch (e) {
			res.status(500).json({ message: "Error en el servidor: ", error: e });
		}
	},
	/**
	 * Registración de nuevo usuario.
	 * @constructor
	 * @param {*} req 
	 * @param {*} res 
	 * @returns {Object}
	 */
	register: async (req, res) => {
		try {
			// Obtenemos toda la información desde el cuerpo de la solicitud
			const { full_name, email, password, birthdate, gender } = req.body;

			if (!email || !full_name || !password || !birthdate || !gender) return res.status(400).json({ message: 'Faltan datos obligatorios' });

			// Verificamos si el usuario ya existe
			const values = [process.env.TAB_USERS, 'email', email];
			const verifyIfExist = await userCrudMySQL.getUser(values);

			// Si el usuario ya existe, devuelve un error
			if (verifyIfExist.length > 0) {
				return res.status(401).json({ message: "El usuario ya está registrado" });
			} else {
				// Incriptamos la password
				const passHash = await bcrypt.hash(password, 10);

				// Valores para insertar en la base de datos
				const createValues = [process.env.TAB_USERS, 'full_name', 'email', 'pass', 'birthdate', 'gender', full_name, email, passHash, birthdate, gender];
				await userCrudMySQL.createUser(createValues);

				res.status(200).json({ message: `${email} registrado correctamente!` });
			}
		} catch (err) {
			res.status(500).json({ message: "Error en el registro", err });
		}
	}
}