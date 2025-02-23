import sql from '../../database/mysql.connection.js';

const connection = await sql.mySQLConnection();

export default {
    /**
     * Obtener todos los artistas de la base de datos.
     * @param {String} value 
     * @returns {Array}
     */
    getArtists: async (value) => {
        const query = 'SELECT * FROM ??';
        const [result] = await connection.query(query, value);

        return result;
    },
    /**
     * Obtener todas las canciones de la base de datos.
     * @param {Array} values 
     * @returns {Array}
     */
    getSongs: async (values) => {
        // SELECT a.full_name, s.title, s.score, s.image, s.url FROM Songs s INNER JOIN Artists a ON a.id_artist = s.id_artist;
        const query = 'SELECT ??, ??, ??, ??, ??, ?? FROM ?? AS ?? INNER JOIN ?? AS ?? ON ?? = ??';
        const [result] = await connection.query(query, [...values])

        return result;
    },
    /**
     * Obtener todas las canciones favoritas de un usuario.
     * @param {Array} values 
     * @returns {Array}
     */
    getFavoritesSongs: async (values) => {
        // SELECT s.image, s.title, DATE_FORMAT(s.duration, "%H:%i") AS duration, a.full_name FROM users_songs us JOIN Users u ON u.id_user = us.id_user JOIN Songs s ON s.id_song = us.id_song JOIN artists a ON a.id_artist = s.id_artist WHERE us.id_user = 1 ;
        const query = `SELECT ??, ??, ??, DATE_FORMAT(??, "%i:%s") AS ??, ??, ?? FROM ?? AS ?? JOIN ?? AS ?? ON ?? = ?? JOIN ?? AS ?? ON ?? = ?? JOIN ?? AS ?? ON ?? = ?? WHERE ?? = ?`;
        const [result] = await connection.query(query, [...values]);

        return [result];
    },
    /**
     * Buscar canción tramite su titulo.
     * @param {Array} values 
     * @returns {Array}
     */
    searchSong: async (values) => {
        // SELECT s.image, s.title, a.full_name FROM songs s JOIN artists a ON s.id_artist = a.id_artist WHERE title = 'Despacito';
        const query = 'SELECT ??, ??, ??, ?? FROM ?? AS ?? JOIN ?? AS ?? ON ?? = ?? WHERE s.title = ?';
        const result = await connection.query(query, [...values]);

        return result;
    },
    // searchArtist: async (values) => {
    //     // SELECT s.image, s.title, a.full_name FROM songs s JOIN Artists a ON s.id_artist = a.id_artist WHERE a.full_name = 'Bad Bunny';
    //     const query = 'SELECT ??, ??, ?? FROM ?? AS ?? JOIN ?? AS ?? ON ?? = ?? WHERE a.full_name = ?';
    //     const [result] = await connection.query(query, [...values]);

    //     return [result];
    // }
    /**
     * Reproducir canción tramite su id.
     * @param {Array} values 
     * @returns {Array} 
     */
    playSong: async (values) => {
        // SELECT s.url, CONCAT (a.full_name, ' - ', s.title) title FROM songs s JOIN artists a ON a.id_artist = s.id_artist ORDER BY s.id_song = 3 DESC, s.id_song;
        const query = `SELECT ??, CONCAT(??, ' - ', ??) ?? FROM ?? ?? JOIN ?? ?? ON ?? = ?? ORDER BY ?? = ? DESC, ??;`;
        const [result] = await connection.query(query, [...values]);

        return [result];
    },
    /**
     * Reproducir canciones de la biblioteca del usuario.
     * @param {Array} values 
     * @returns {Array}
     */
    playLibrary: async (values) => {
        // SELECT s.url, CONCAT(a.full_name, ' - ', s.title) title from users_songs us JOIN songs s ON us.id_song = s.id_song JOIN artists a ON s.id_artist = a.id_artist WHERE id_user = 1 ORDER BY s.id_song = 3 DESC, s.id_song;
        const query = `SELECT ??, CONCAT(??, ' - ', ??) ?? FROM ?? ?? JOIN ?? ?? ON ?? = ?? JOIN ?? ?? ON ?? = ?? WHERE ?? = ? ORDER BY ?? = ? DESC, ??;`;
        const [result] = await connection.query(query, [...values]);

        return [result];
    },
    /**
     * Añadir canción a la biblioteca del usuario.
     * @param {Array} values 
     * @returns {Array}
     */
    addFavoritsSongs: async(values) => {
        // INSERT INTO users_songs VALUES(1, 1);
        const query = 'INSERT INTO ?? VALUES(?, ?)';
        const result = await connection.query(query, [...values]);

        return result;
    },
    /**
     * Obtener canción de la biblioteca del usuario tramite id usuario e id canción.
     * @param {Array} values 
     * @returns {Array}
     */
    getSong: async(values) => {
        // SELECT * FROM users_songs WHERE id_user = 1 && id_song = 1;
        const query = 'SELECT * FROM ?? WHERE ?? = ? && ?? = ?';
        const result = await connection.query(query, [...values]);

        return result;
    },
    /**
     * Eliminar canción de la biblioteca del usuario tramite id usuario e id canción.
     * @param {Array} values 
     * @returns {Array}
     */
    deleteFavoritsSongs: async(values) => {
        // DELETE FROM users_songs WHERE id_user = 1 AND id_song = 1;
        const query = 'DELETE FROM ?? WHERE ?? = ? AND ?? = ?';
        const result = await connection.query(query, [...values]);

        return result;
    }
}