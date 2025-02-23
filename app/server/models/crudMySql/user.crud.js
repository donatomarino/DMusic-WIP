import sql from '../../database/mysql.connection.js';

const connection = await sql.mySQLConnection();

export default {
	/**
	  * Obtener todos los datos de un usuario
	  * @param {Array} values 
	  * @returns {Array}
	  */
	getUser: async (values) => {
		const query = 'SELECT * FROM ?? WHERE ?? = ?';
		const result = await connection.query(query, values)
		return result || [];
	},

    /**
	* Actualiza la password del usuario
	* @param {Array} values
	* @returns {Number}
	*/
	updatePass: async (values) => {
		const query = 'UPDATE ?? SET ?? = ? WHERE ?? = ?'
		const [result] = await connection.query(query, [...values])
		return result;
	},
    /**
	  * Registración nuevo usuario
	  * @param {Array} values -
	  * @returns {number}
	  */
	createUser: async (values) => {
		const query = 'INSERT INTO ?? (??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?)';
		const [result] = await connection.query(query, values);
		return result;
	}
}