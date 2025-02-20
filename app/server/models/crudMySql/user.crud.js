import sql from '../../database/mysql.connection.js';

const connection = await sql.mySQLConnection();

export default {
	/**
	  * Función para obtener usuario con email
	  * @param {Array} values - valores para la consulta
	  * @returns {Array} - Todos los datos del usuario si existe, sino devuelve un array vacío
	  */
	getUser: async (values) => {
		const query = 'SELECT * FROM ?? WHERE ?? = ?';
		const result = await connection.query(query, values)
		return result || [];
	},

    /**
	* Actualiza la password del usuario
	* @param {Array} values - valores con los datos de la consulta
	* @returns {Number} - número de filas afectadas
	*/
	updatePass: async (values) => {
		const query = 'UPDATE ?? SET ?? = ? WHERE ?? = ?'
		const [result] = await connection.query(query, [...values])
		return result;
	},
    
    	/**
	  * Crear un nuevo item en la tabla especificada
	  * @param {Array} values - Valores a insertar en la tabla
	  * @returns {number} - ID del nuevo registro
	  */
	createUser: async (values) => {
		const query = 'INSERT INTO ?? (??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?)';
		const [result] = await connection.query(query, values);
		return result;
	}
}