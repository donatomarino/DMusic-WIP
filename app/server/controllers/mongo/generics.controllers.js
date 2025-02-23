import mongo from '../../database/mongo.connection.js';
import genericMongoCrud from '../../models/crudMongo/generic.crud.js';

export default {
	/**
	 * Obtener todas las playlists en mongo.
	 * @param {*} req 
	 * @param {*} res 
	 */
	getPlaylists: async (req, res) => {
		try {
			const result = await genericMongoCrud.getAll('playlists');
			
			if(result.length === 0){
				res.status(400).json({message: 'No hay playlist en la base de datos.'});
			} else {
				res.status(200).json(result);
			}
		} catch(e) {
			res.status(500).json({message: 'Error en la solicitud: ', e});
		} finally {
			await mongo.closeClient()
		}
	}, 
	/**
	 * Obtener los LOPD.
	 * @param {*} req 
	 * @param {*} res 
	 */
    getLopd: async (req, res) => {
        try{
			const result = await genericMongoCrud.getAll('lopd');
			
			res.status(200).json(result);
        } catch(e) {
			res.status(500).json({message: 'Error en la solicitud: ', e});
		} finally {
            await mongo.closeClient();
        }
    },
	/**
	 * Reproducir una playlist tramite su ID.
	 * @param {*} req 
	 * @param {*} res 
	 */
	playPlaylist: async(req, res) => {
		try {
			const result = await genericMongoCrud.getOne('playlists', req.body.id);

			res.status(200).json(result);
		} catch(e) {
			res.status(500).json({message: 'Error en la solicitud: ', e});
		}finally {
			await mongo.closeClient()
		}
	}
}