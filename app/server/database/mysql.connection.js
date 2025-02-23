import * as mysql from 'mysql2/promise'

const my_host = "127.0.0.1";
const my_user = 'root';
const my_pass = 'root1234';
const my_db = "DMusic"; // Nombre datebase

export default {

	/**
	 * Connection to the MySQL database.
	 * @returns {Promise<Pool>}
	 */
	mySQLConnection: async () => {

		const pool = mysql.createPool({
			host: my_host,
			user: my_user,
			password: my_pass,
			database: my_db,
			waitForConnections: true,
			connectionLimit: 20,
			queueLimit: 0
		})

		return pool
	}
}