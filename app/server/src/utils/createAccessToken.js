import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from './config.js';

export default {
    /**
     * Crear un token de acceso. 
     * @param {Array} payload 
     * @returns {Promise}
     */
    createAccessToken: async (payload) => {
        return new Promise((resolve, reject) => {
            jwt.sign(payload, TOKEN_SECRET, { expiresIn: '10000s' }, (err, token) => {
                if (err) {
                    reject({ error: 'El usuario y/o contraseña no válido' });
                } else {
                    resolve({
                        message: '---- Usuario logueado correctamente ------',
                        token: 'Bearer ' + token
                    });
                }
            });
        });
    }
}
