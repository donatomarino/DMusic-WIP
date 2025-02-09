import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from './config.js';

// Función para generar un token JWT
export async function createAccessToken(payload) {
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
