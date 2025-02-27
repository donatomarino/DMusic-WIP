import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

// Crear un objeto de transporte
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
    }
});

export const mailToUser = (email, route) => {
    // Configurar el objeto mailOptions
    const mailOptions = {
        from: 'dmusic@dmusic.com',
        to: {email},
        subject: 'Recupera tu contraseña',
        html: `<p>Accedes a este link para recuperar la contraseña: ${route}</p>`
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