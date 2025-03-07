import bcrypt from 'bcryptjs';
import fs from 'fs';

// Datos de ejemplo (esto puedes reemplazarlo con tus propios usuarios o leer un archivo CSV)
const data = [
    ['Francesco Giovani', 'prueba_00@gmail.com', 'prueba1', '15-01-2000', 'hombre'],
    ['Francesco Giovani', 'prueba_01@gmail.com', 'prueba2', '16-01-2000', 'mujer'],
    ['Francesco Giovani', 'prueba_02@gmail.com', 'prueba3', '17-01-2000', 'hombre'],
    ['Francesco Giovani', 'prueba_03@gmail.com', 'prueba4', '18-01-2000', 'mujer'],
    ['Francesco Giovani', 'prueba_04@gmail.com', 'prueba5', '19-01-2000', 'hombre'],
    ['Francesco Giovani', 'prueba_05@gmail.com', 'prueba6', '20-01-2000', 'mujer'],
    ['Francesco Giovani', 'prueba_06@gmail.com', 'prueba7', '21-01-2000', 'hombre'],
    ['Francesco Giovani', 'prueba_07@gmail.com', 'prueba8', '22-01-2000', 'mujer'],
    ['Francesco Giovani', 'prueba_08@gmail.com', 'prueba9', '23-01-2000', 'hombre'],
    ['Francesco Giovani', 'prueba_09@gmail.com', 'prueba10', '24-01-2000', 'mujer'],
    ['Francesco Giovani', 'prueba_10@gmail.com', 'prueba11', '25-01-2000', 'hombre'],
    ['Francesco Giovani', 'prueba_11@gmail.com', 'prueba12', '26-01-2000', 'mujer'],
    ['Francesco Giovani', 'prueba_12@gmail.com', 'prueba13', '27-01-2000', 'hombre'],
    ['Francesco Giovani', 'prueba_13@gmail.com', 'prueba14', '28-01-2000', 'mujer'],
    ['Francesco Giovani', 'prueba_14@gmail.com', 'prueba15', '29-01-2000', 'hombre'],
    ['Francesco Giovani', 'prueba_15@gmail.com', 'prueba16', '30-01-2000', 'mujer'],
    ['Francesco Giovani', 'prueba_16@gmail.com', 'prueba17', '31-01-2000', 'hombre'],
    ['Francesco Giovani', 'prueba_17@gmail.com', 'prueba18', '01-02-2000', 'mujer'],
    ['Francesco Giovani', 'prueba_18@gmail.com', 'prueba19', '02-02-2000', 'hombre'],
    ['Francesco Giovani', 'prueba_19@gmail.com', 'prueba20', '03-02-2000', 'mujer'],
    ['Francesco Giovani', 'prueba_20@gmail.com', 'prueba21', '04-02-2000', 'hombre'],
    ['Francesco Giovani', 'prueba_21@gmail.com', 'prueba22', '05-02-2000', 'mujer'],
    ['Francesco Giovani', 'prueba_22@gmail.com', 'prueba23', '06-02-2000', 'hombre'],
    ['Francesco Giovani', 'prueba_23@gmail.com', 'prueba24', '07-02-2000', 'mujer'],
    ['Francesco Giovani', 'prueba_24@gmail.com', 'prueba25', '08-02-2000', 'hombre'],
    ['Francesco Giovani', 'prueba_25@gmail.com', 'prueba26', '09-02-2000', 'mujer'],
    ['Francesco Giovani', 'prueba_26@gmail.com', 'prueba27', '10-02-2000', 'hombre'],
    ['Francesco Giovani', 'prueba_27@gmail.com', 'prueba28', '11-02-2000', 'mujer'],
    ['Francesco Giovani', 'prueba_28@gmail.com', 'prueba29', '12-02-2000', 'hombre'],
    ['Francesco Giovani', 'prueba_29@gmail.com', 'prueba30', '13-02-2000', 'mujer'],
    ['Francesco Giovani', 'prueba_30@gmail.com', 'prueba31', '14-02-2000', 'hombre'],
    ['Francesco Giovani', 'prueba_31@gmail.com', 'prueba32', '15-02-2000', 'mujer'],
    ['Francesco Giovani', 'prueba_32@gmail.com', 'prueba33', '16-02-2000', 'hombre'],
    ['Francesco Giovani', 'prueba_33@gmail.com', 'prueba34', '17-02-2000', 'mujer'],
    ['Francesco Giovani', 'prueba_34@gmail.com', 'prueba35', '18-02-2000', 'hombre'],
    ['Francesco Giovani', 'prueba_35@gmail.com', 'prueba36', '19-02-2000', 'mujer'],
    ['Francesco Giovani', 'prueba_36@gmail.com', 'prueba37', '20-02-2000', 'hombre'],
    ['Francesco Giovani', 'prueba_37@gmail.com', 'prueba38', '21-02-2000', 'mujer'],
    ['Francesco Giovani', 'prueba_38@gmail.com', 'prueba39', '22-02-2000', 'hombre'],
    ['Francesco Giovani', 'prueba_39@gmail.com', 'prueba40', '23-02-2000', 'mujer'],
    ['Francesco Giovani', 'prueba_40@gmail.com', 'prueba41', '24-02-2000', 'hombre'],
    ['Francesco Giovani', 'prueba_41@gmail.com', 'prueba42', '25-02-2000', 'mujer'],
    ['Francesco Giovani', 'prueba_42@gmail.com', 'prueba43', '26-02-2000', 'hombre'],
    ['Francesco Giovani', 'prueba_43@gmail.com', 'prueba44', '27-02-2000', 'mujer'],
    ['Francesco Giovani', 'prueba_44@gmail.com', 'prueba45', '28-02-2000', 'hombre'],
    ['Francesco Giovani', 'prueba_45@gmail.com', 'prueba46', '29-02-2000', 'mujer'],
    ['Francesco Giovani', 'prueba_46@gmail.com', 'prueba47', '01-03-2000', 'hombre'],
    ['Francesco Giovani', 'prueba_47@gmail.com', 'prueba48', '02-03-2000', 'mujer'],
    ['Francesco Giovani', 'prueba_48@gmail.com', 'prueba49', '03-03-2000', 'hombre'],
    ['Francesco Giovani', 'prueba_49@gmail.com', 'prueba50', '04-03-2000', 'mujer']
];

async function encryptPasswords() {
    const encryptedData = [];
    for (const [name, email, password, birthdate, gender] of data) {
        const hashedPassword = await bcrypt.hash(password, 10);
        encryptedData.push([name, email, hashedPassword, birthdate, gender]);
    }

    // Convertir los datos a formato CSV
    const csv = encryptedData.map(row => row.join(',')).join('\n');

    // Guardar los datos en un archivo CSV (con contraseñas encriptadas)
    fs.writeFileSync('encrypt_users.csv', csv);
    console.log('Archivo CSV generado: encrypt_users.csv');
}

encryptPasswords();
