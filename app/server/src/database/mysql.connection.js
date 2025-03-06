import * as mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

export default {

	/**
	 * Connection to the MySQL database.
	 * @returns {Array}
	 */
	mySQLConnection: async () => {

		const pool = mysql.createPool({
			host: process.env.SQL_LOCALHOST,
			user: process.env.SQL_USER,
			password: process.env.SQL_MYPASS,
			database: process.env.SQL_DB,
			waitForConnections: true,
			connectionLimit: 20,
			queueLimit: 0
		})

		return pool
	}
}