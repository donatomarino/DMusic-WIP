import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const server = process.env.MAIL_ROUTE;

// Crear un objeto de transporte
const transporter = nodemailer.createTransport({
    host: process.env.MAIL_SERVER,
    port: process.env.MAIL_PORT,
    secure: false,
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
    }
});

/**
 * Enviar mail de recupero contraseña a usuario registrado.
 * @async
 * @function mailToUser
 * @param {*} email - email usuario 
 * @param {*} token
 * @returns {Promise<void>}
 */
export const mailToUser = (email, token) => {
    // Configurar el objeto mailOptions
    const mailOptions = {
        from: process.env.MAIL_USERNAME,
        to: email,
        subject: 'Recupera tu contraseña',
        html: `<p>Accedes a este link para recuperar la <a href=${server}${token}>contraseña</a</p>`
    };
    
    // Enviar el email
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log('Error:', error);
        } else {
            console.log('Email enviado:', info.response);
        }
    });
}