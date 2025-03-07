import mongo from '../../database/mongo.connection.js';
import genericMongoCrud from '../../models/crudMongo/generic.crud.js';
import dotenv from 'dotenv';
dotenv.config();

export default {
	/**
	 * Obtener todas las playlists en mongo.
	 * @async
	 * @function getPlaylists
	 * @param {Object} req - Objeto de solicitud Express.
	 * @param {Object} res - Objeto de respuesta Express.
	 * @returns {Promise<void>}
	 */
	getPlaylists: async (req, res) => {
		try {
			const result = await genericMongoCrud.getAll(process.env.COLL_PLAYLISTS);

			if (result.length === 0) {
				res.status(400).json({ message: 'No hay playlist en la base de datos.' });
			} else {
				res.status(200).json(result);
			}
		} catch (e) {
			res.status(500).json({ message: 'Error en la solicitud: ', e });
		} finally {
			await mongo.closeClient()
		}
	},
	/**
	 * Obtener los LOPD.
	 * @async
	 * @function getLopd
	 * @param {*} req 
	 * @param {*} res 
	 * @returns {Promise<void>}
	 */
	getLopd: async (req, res) => {
		try {
			const result = await genericMongoCrud.getAll(process.env.COLL_LOPD);

			res.status(200).json(result);
		} catch (e) {
			res.status(500).json({ message: 'Error en la solicitud: ', e });
		} finally {
			await mongo.closeClient();
		}
	},
	/**
	 * Reproducir una playlist tramite su ID.
	 * @async
	 * @function playPlaylist
	 * @param {*} req 
	 * @param {*} res 
	 * @returns {Promise<void>}
	 */
	playPlaylist: async (req, res) => {
		try {
			const result = await genericMongoCrud.getOne(process.env.COLL_PLAYLISTS, req.body.id);

			res.status(200).json(result);
		} catch (e) {
			res.status(500).json({ message: 'Error en la solicitud: ', e });
		} finally {
			await mongo.closeClient()
		}
	}
}