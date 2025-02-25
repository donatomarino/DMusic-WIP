import sql from '../../database/mysql.connection.js';

const connection = await sql.mySQLConnection();

export default {
	/**
	  * Obtener todos los datos de un usuario.
	  * @constructor
	  * @param {Array} values - Nombre tabla y campo para buscar el usuario.
	  * @returns {Array}
	  */
	getUser: async (values) => {
		const query = 'SELECT * FROM ?? WHERE ?? = ?';
		const result = await connection.query(query, values)
		return result || [];
	},

    /**
	* Actualiza la password del usuario.
	* @constructor
	* @param {Array} values - Nombre tabla, campo a actualizar y campo para buscar el usuario.
	* @returns {Array}
	*/
	updatePass: async (values) => {
		const query = 'UPDATE ?? SET ?? = ? WHERE ?? = ?'
		const [result] = await connection.query(query, [...values])
		return result;
	},
    /**
	* Registración nuevo usuario
	* @constructor
	* @param {Array} values - Datos de registro.
	* @returns {Array}
	*/
	createUser: async (values) => {
		const query = 'INSERT INTO ?? (??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?)';
		const [result] = await connection.query(query, values);
		return result;
	}
}