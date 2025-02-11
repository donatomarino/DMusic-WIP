import genericCrudMySQL from '../models/crudMySql/generic.crud.js';

export default {
    getArtists: async (req, res) => {
        try {
            const response = await genericCrudMySQL.getArtists('Artists');
            
            if(response.length === 0) {
                res.status(400).json({message: 'No existen artistas en la base de datos'} )
            } else {
                res.status(200).json(response);
            }
        } catch (error) {
            res.status(500).json({message : 'Error inesperado al obtener los artistas', error: error});
        }
    },
    getSongs: async (req, res) => {
        try {
            //SELECT a.full_name, s.title, s.score, s.image FROM Songs s INNER JOIN Artists a ON a.id_artist = s.id_artist;
            const values = ['a.full_name', 's.title', 's.score', 's.image', 'Songs', 's', 'artists', 'a', 'a.id_artist', 's.id_artist'];
            const response = await genericCrudMySQL.getSongs(values);

            if(response.length === 0) {
                res.status(400).json({message: 'No hay canciones en la base de datos'} )
            } else {
                res.status(200).json(response);
            }
        } catch(e) {
            res.status(500).json({message : 'Error inesperado al obtener las canciones', error: e});
        }
    },
    getFavoritesSongs: async (req, res) => {
        try {
            // SELECT s.image, s.title, a.full_name FROM users_songs us JOIN Users u ON u.id_user = us.id_user JOIN Songs s ON s.id_song = us.id_song JOIN Artists a ON s.id_artist = a.id_artist WHERE us.id_user = 1;
            const values = ['us.id_user', 's.image', 's.title', 'a.full_name', 'users_songs', 'us', 'Users', 'u', 'u.id_user', 'us.id_user', 'Songs', 's', 's.id_song', 'us.id_song', 'Artists', 'a', 's.id_artist', 'a.id_artist', 'us.id_user', parseInt(1)];
            const response = await genericCrudMySQL.getFavoritesSongs(values);

            if(response.length === 0) {
                res.status(400).json({message: 'No hay canciones favoritas en la base de datos'} )
            } else {
                res.status(200).json(response);
            }
        } catch(e) {
            res.status(500).json({message : 'Error inesperado al obtener las canciones favoritas', error: e});
        }
    },
    searchSong: async(req, res) => {
        try {
            // SELECT s.image, s.title, a.full_name FROM songs s JOIN artists a ON s.id_artist = a.id_artist WHERE title = 'Despacito';
            const values = ['s.image', 's.title', 'a.full_name', 'songs', 's', 'artists', 'a', 's.id_artist', 'a.id_artist', req.body.song];
            const response = await genericCrudMySQL.searchSong(values);
            
            if(response) {
                res.status(200).json(response);
            } else {
                res.status(400).json({error: 'No existen canciones o artistas con este titulo/nombre'});
            }
        } catch(e) {
            res.status(500).json({message: 'Error en la busqueda', e})
        }
    }
}