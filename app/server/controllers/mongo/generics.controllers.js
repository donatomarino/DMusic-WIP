import mongo from '../../database/mongo.connection.js';
import genericMongoCrud from '../../models/crudMongo/generic.crud.js';

export default {
	getPlaylists: async (req, res) => {
		try {
			const result = await genericMongoCrud.getAll('playlists');


			res.json(result)
		} finally {
			await mongo.closeClient()
		}
	}, 
    getLopd: async (req, res) => {
        try{
			const result = await genericMongoCrud.getAll('lopd');
			
            res.json(result);
        } finally {
            await mongo.closeClient();
        }
    },
	getPlaylist: async(req, res) => {
		try {
			const result = await genericMongoCrud.getOne('playlists', req.body.id);

			res.json(result);
		} finally {
			await mongo.closeClient()
		}
	}
}