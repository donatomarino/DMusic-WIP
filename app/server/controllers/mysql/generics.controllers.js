import genericCrudMySQL from "../../models/crudMySql/generic.crud.js";
import dotenv from 'dotenv';
dotenv.config();

export default {
    /**
     * Sacar todos los artistas de la base de datos.
     * @param {*} req 
     * @param {*} res 
     */
    getArtists: async (req, res) => {
        try {
            const response = await genericCrudMySQL.getArtists(process.env.TAB_ARTISTS);

            if (response.length === 0) {
                res.status(400).json({ message: 'No hay artistas en la base de datos.' })
            } else {
                res.status(200).json(response);
            }
        } catch (error) {
            res.status(500).json({ message: 'Error inesperado al obtener los artistas: ', error });
        }
    },
    /**
     * Sacar todas las canciones de la base de datos.
     * @param {*} req 
     * @param {*} res 
     */
    getSongs: async (req, res) => {
        try {
            //SELECT a.full_name, s.title, s.score, s.image FROM Songs s INNER JOIN Artists a ON a.id_artist = s.id_artist;
            const values = ['a.full_name', 's.id_song', 's.title', 's.score', 's.image', 's.url', process.env.TAB_SONGS, 's', process.env.TAB_ARTISTS, 'a', 'a.id_artist', 's.id_artist'];
            const response = await genericCrudMySQL.getSongs(values);

            if (response.length === 0) {
                res.status(400).json({ message: 'No hay canciones en la base de datos.' })
            } else {
                res.status(200).json(response);
            }
        } catch (e) {
            res.status(500).json({ message: 'Error inesperado al obtener las canciones: ', e });
        }
    },
    /**
     * Sacar todas las canciones favoritas de un usuario.
     * @param {*} req 
     * @param {*} res 
     */
    getFavoritsSongs: async (req, res) => {
        try {
            // SELECT s.image, s.title, DATE_FORMAT(s.duration, "%H:%i") AS duration, a.full_name FROM users_songs us JOIN Users u ON u.id_user = us.id_user JOIN Songs s ON s.id_song = us.id_song JOIN artists a ON a.id_artist = s.id_artist WHERE us.id_user = 1 ;
            const values = ['us.id_user', 's.image', 's.title', 's.duration', 'duration', 's.id_song', 'a.full_name', process.env.TAB_US, 'us', process.env.TAB_USERS, 'u', 'u.id_user', 'us.id_user', process.env.TAB_SONGS, 's', 's.id_song', 'us.id_song', process.env.TAB_ARTISTS, 'a', 's.id_artist', 'a.id_artist', 'us.id_user', req.body.id];
            const response = await genericCrudMySQL.getFavoritesSongs(values);

            if (response.length === 0) {
                res.status(400).json({ message: 'No hay canciones favoritas en la base de datos.' })
            } else {
                res.status(200).json(response);
            }
        } catch (e) {
            res.status(500).json({ message: 'Error inesperado al obtener las canciones favoritas: ', e });
        }
    },
    /**
     * Buscar una canción por su nombre.
     * @param {*} req 
     * @param {*} res 
     */
    searchSong: async (req, res) => {
        try {
            // SELECT s.image, s.title, a.full_name FROM songs s JOIN artists a ON s.id_artist = a.id_artist WHERE title = 'Despacito';
            const values = ['s.image', 's.title', 'a.full_name', 's.id_song', process.env.TAB_SONGS, 's', process.env.TAB_ARTISTS, 'a', 's.id_artist', 'a.id_artist', req.body.song];
            const response = await genericCrudMySQL.searchSong(values);

            if (response) {
                res.status(200).json(response);
            } else {
                res.status(400).json({ error: 'No hay canciones con este titulo.' });
            }
        } catch (e) {
            res.status(500).json({ message: 'Error en la busqueda: ', e })
        }
    },
    /**
     * Reproducir una canción por su id.
     * @param {*} req 
     * @param {*} res 
     */
    playSong: async (req, res) => {
        try {
            // SELECT s.url, CONCAT (a.full_name, ' - ', s.title) title FROM songs s JOIN artists a ON a.id_artist = s.id_artist ORDER BY s.id_song = 3 DESC, s.id_song;
            const values = ['s.url', 'a.full_name', 's.title', 'title', process.env.TAB_SONGS, 's', process.env.TAB_ARTISTS, 'a', 'a.id_artist', 's.id_artist', 's.id_song', req.body.id, 's.id_song'];
            console.log(req.body.id);
            const response = await genericCrudMySQL.playSong(values);
            console.log(response);

            // No hay condiciones en cuanto se puede hacer esta solicitud solamente si la canción está en la base de datos y aparece en la app.
            res.status(200).json(response)
        } catch (e) {
            res.status(500).json({ message: 'Error inesperado al obtener las canciones: ', e });
        }
    },
    /**
     * Reproducir canciones de un artista predeterminado tramite su id.
     * @param {*} req 
     * @param {*} res 
     */
    playArtist: async (req, res) => {
        try {
            // SELECT s.url, CONCAT (a.full_name, ' - ', s.title) title FROM songs s JOIN artists a ON a.id_artist = s.id_artist ORDER BY s.id_artist = 3 DESC, s.id_artist;
            const values = ['s.url', 'a.full_name', 's.title', 'title', process.env.TAB_SONGS,, 's', process.env.TAB_ARTISTS, 'a', 'a.id_artist', 's.id_artist', 's.id_artist', req.body.id, 's.id_artist'];
            const response = await genericCrudMySQL.playSong(values);

            // No hay condiciones en cuanto se puede hacer esta solicitud solamente si el artista está en la base de datos y aparece en la app.
            res.status(200).json(response);
        } catch (e) {
            res.status(500).json({ message: 'Error inesperado al obtener las canciones: ', e });
        }
    },
    /**
     * Reproducir canciones de la biblioteca de un usuario.
     * @param {*} req 
     * @param {*} res 
     */
    playLibrary: async (req, res) => {
        try {
            // SELECT s.url, CONCAT(a.full_name, ' - ', s.title) title from users_songs us JOIN songs s ON us.id_song = s.id_song JOIN artists a ON s.id_artist = a.id_artist WHERE id_user = 1 ORDER BY s.id_song = 3 DESC, s.id_song;
            const values = ['s.url', 'a.full_name', 's.title', 'title', process.env.TAB_US, 'us', process.env.TAB_SONGS,, 's', 'us.id_song', 's.id_song', process.env.TAB_ARTISTS, 'a', 's.id_artist', 'a.id_artist', 'id_user', req.body.id_user, 's.id_song', req.body.id_song, 's.id_song'];
            const response = await genericCrudMySQL.playLibrary(values);

            // No hay condiciones en cuanto se puede hacer esta solicitud solamente si el artista está en la base de datos y aparece en la app.
            res.status(200).json(response);
        } catch (e) {
            res.status(500).json({ message: 'Error inesperado al obtener las canciones: ', e });
        }
    },
    /**
     * Añadir canción a favoritos tramite su id.
     * @param {*} req 
     * @param {*} res 
     */
    addFavoritsSongs: async (req, res) => {
        try {
            // SELECT * FROM users_songs WHERE id_user = 1 && id_song = 1;
            const values = [process.env.TAB_US, 'id_user', req.body.id_user, 'id_song', req.body.id_song];
            // Verificamos si la canción ya está en favoritos
            const response = await genericCrudMySQL.getSong(values);

            if (response[0].length > 0) {
                res.status(400).json({ message: 'La cancion ya esta en favoritos.' });
            } else {
                // INSERT INTO users_songs VALUES(1, 1);
                const values = ['users_songs', req.body.id_user, req.body.id_song];
                await genericCrudMySQL.addFavoritsSongs(values);
                res.status(200).json({ message: 'Cancion añadida correctamente' });
            }
        } catch (e) {
            res.status(500).json({ message: 'Error inesperado al añadir la cancion: ', e });
        }
    },
    /**
     * Eliminar canción de libreria de un usuario tramite id_song y id_user.
     * @param {*} req 
     * @param {*} res 
     */
    deleteFavoritsSongs: async (req, res) => {
        try {
            // DELETE FROM users_songs WHERE id_user = 1 AND id_song = 1;
            const values = [process.env.TAB_US, 'id_user', req.body.id_user, 'id_song', req.body.id_song];
            await genericCrudMySQL.deleteFavoritsSongs(values);

            // No hay condiciones en cuanto se puede hacer esta solicitud solamente si el artista está en la base de datos y aparece en la app.
            res.status(200).json({ message: 'Cancion eliminada correctamente.' });
        } catch (e) {
            res.status(500).json({ message: 'Error inesperado al eliminar la cancion: ', e });
        }
    }

}