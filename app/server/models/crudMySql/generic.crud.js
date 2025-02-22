import sql from '../../database/mysql.connection.js';

const connection = await sql.mySQLConnection();

export default {
    getArtists: async (value) => {
        const query = 'SELECT * FROM ??';
        const [result] = await connection.query(query, value);

        return result;
    },
    getSongs: async (values) => {
        // SELECT a.full_name, s.title, s.score, s.image, s.url FROM Songs s INNER JOIN Artists a ON a.id_artist = s.id_artist;
        const query = 'SELECT ??, ??, ??, ??, ??, ?? FROM ?? AS ?? INNER JOIN ?? AS ?? ON ?? = ??';
        const [result] = await connection.query(query, [...values])

        return result;
    },
    getFavoritesSongs: async (values) => {
        // SELECT s.image, s.title, a.full_name FROM users_songs us JOIN Users u ON u.id_user = us.id_user JOIN Songs s ON s.id_song = us.id_song JOIN artists a ON a.id_artist = s.id_artist WHERE us.id_user = ? ;
        const query = `SELECT ??, ??, ??, DATE_FORMAT(??, "%i:%s") AS ??, ??, ?? FROM ?? AS ?? JOIN ?? AS ?? ON ?? = ?? JOIN ?? AS ?? ON ?? = ?? JOIN ?? AS ?? ON ?? = ?? WHERE ?? = ?`;
        const [result] = await connection.query(query, [...values]);

        return [result];
    },
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
    playSong: async (values) => {
        // SELECT s.url, CONCAT (a.full_name, ' - ', s.title) title FROM songs s JOIN artists a ON a.id_artist = s.id_artist ORDER BY s.id_song = 3 DESC, s.id_song;
        const query = `SELECT ??, CONCAT(??, ' - ', ??) ?? FROM ?? ?? JOIN ?? ?? ON ?? = ?? ORDER BY ?? = ? DESC, ??;`;
        const [result] = await connection.query(query, [...values]);

        return [result];
    },
    playLibrary: async (values) => {
        // SELECT s.url, CONCAT(a.full_name, ' - ', s.title) title from users_songs us JOIN songs s ON us.id_song = s.id_song JOIN artists a ON s.id_artist = a.id_artist WHERE id_user = 1 ORDER BY s.id_song = 3 DESC, s.id_song;
        const query = `SELECT ??, CONCAT(??, ' - ', ??) ?? FROM ?? ?? JOIN ?? ?? ON ?? = ?? JOIN ?? ?? ON ?? = ?? WHERE ?? = ? ORDER BY ?? = ? DESC, ??;`;
        const [result] = await connection.query(query, [...values]);

        return [result];
    },
    addFavoritsSongs: async(values) => {
        // INSERT INTO users_songs VALUES(1, 1);
        const query = 'INSERT INTO ?? VALUES(?, ?)';
        const result = await connection.query(query, [...values]);

        return result;
    },
    getSong: async(values) => {
        // SELECT * FROM users_songs WHERE id_user = 1 && id_song = 1;
        const query = 'SELECT * FROM ?? WHERE ?? = ? && ?? = ?';
        const result = await connection.query(query, [...values]);

        return result;
    },
    deleteFavoritsSongs: async(values) => {
        // // DELETE FROM users_songs WHERE id_user = 1 AND id_song = 1;
        const query = 'DELETE FROM ?? WHERE ?? = ? AND ?? = ?';
        const result = await connection.query(query, [...values]);

        return result;
    }
}