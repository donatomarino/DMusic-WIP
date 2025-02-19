import sql from '../../database/mysql.connection.js';

const connection = await sql.mySQLConnection();

export default {
    getArtists: async (value) => {
        const query = 'SELECT * FROM ??';
        const [result] = await connection.query(query, value);
        
        return result;
    },
    getSongs: async(values) => {
        // SELECT a.full_name, s.title, s.score, s.image, s.url FROM Songs s INNER JOIN Artists a ON a.id_artist = s.id_artist;
        const query = 'SELECT ??, ??, ??, ??, ??, ?? FROM ?? AS ?? INNER JOIN ?? AS ?? ON ?? = ??';
		const [result] = await connection.query(query, [...values])

        return result;
    },
    getFavoritesSongs: async(values) => {
        // SELECT s.image, s.title, a.full_name FROM users_songs us JOIN Users u ON u.id_user = us.id_user JOIN Songs s ON s.id_song = us.id_song JOIN artists a ON a.id_artist = s.id_artist WHERE us.id_user = ? ;
        const query = 'SELECT ??, ??, ??, ?? FROM ?? AS ?? JOIN ?? AS ?? ON ?? = ?? JOIN ?? AS ?? ON ?? = ?? JOIN ?? AS ?? ON ?? = ?? WHERE ?? = ?';
		const [result] = await connection.query(query, [...values]);

        return [result];
    },
    searchSong: async(values) => {
        // SELECT s.image, s.title, a.full_name FROM songs s JOIN artists a ON s.id_artist = a.id_artist WHERE title = 'Despacito';
        const query = 'SELECT ??, ??, ?? FROM ?? AS ?? JOIN ?? AS ?? ON ?? = ?? WHERE s.title = ?';
        const result = await connection.query(query, [...values]);
        
        return result;
    },
    // searchArtist: async (values) => {
    //     // SELECT s.image, s.title, a.full_name FROM songs s JOIN Artists a ON s.id_artist = a.id_artist WHERE a.full_name = 'Bad Bunny';
    //     const query = 'SELECT ??, ??, ?? FROM ?? AS ?? JOIN ?? AS ?? ON ?? = ?? WHERE a.full_name = ?';
    //     const [result] = await connection.query(query, [...values]);
        
    //     return [result];
    // }
    playSong: async(values) => {
        // SELECT s.url, CONCAT (a.full_name, ' - ', s.title), s.genre FROM songs s JOIN artists a ON a.id_artist = s.id_artist WHERE s.id_song = 1;
        const query = `SELECT ??, CONCAT(??, ' - ', ??) ??, ?? ?? FROM ?? ?? JOIN ?? ?? ON ?? = ?? WHERE ?? = ?;`;
            const [result] = await connection.query(query, [...values]);

        return [result];
    },
}