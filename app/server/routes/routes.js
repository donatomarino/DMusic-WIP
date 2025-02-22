import { Router } from 'express';
import generic from '../controllers/mysql/generics.controllers.js';
import users from '../controllers/mysql/users.controllers.js';
import mongo from '../controllers/mongo/generics.controllers.js';

const router = Router();

//---- MYSQL
/**
 * @swagger
 * /dmusic/login:
 *   post:
 *     summary: Inicia sesión
 *     description: Realiza la autenticación de un usuario con email y contraseña.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email del usuario
 *               pass:
 *                 type: string
 *                 description: Contraseña del usuario
 *                 format: password
 *     responses:
 *       200:
 *         description: Autenticación exitosa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token de autenticación
 *       400:
 *         description: Faltan datos obligatorios
 *       401:
 *         description: El usuario no está registrado
 *       402:
 *         description: Contraseña incorrecta.
 *       500:
 *         description: Error de sistema.
 */
router.post('/dmusic/login', users.login);

/**
 * @swagger
 * /dmusic/recovery-password:
 *   post:
 *     summary: Recupera contraseña
 *     description: Envía un correo con un token de recuperación de contraseña.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email del usuario
 *     responses:
 *       200:
 *         description: Token de recuperación enviado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token generado correctamente.
 *       400:
 *         description: Faltan datos obligatorios.
 *       401:
 *         description: El usuario no existe.
 *       402:
 *         description: Error al generar el token.
 *       500:
 *         description: Error de sistema.
 */
router.post('/dmusic/recovery-password', users.recoveryPass);

/**
 * @swagger
 * /dmusic/confirm-recovery/{token}:
 *   post:
 *     summary: Confirma recupero de contraseña.
 *     description: Confirma recupero de contraseña insertando nueva password.
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         description: Token de recuperación de contraseña.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - pass
 *             properties:
 *               pass:
 *                 type: string
 *                 description: Nueva contraseña del usuario.
 *                 format: password
 *     responses:
 *       200:
 *         description: Contraseña actualizada correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de respuesta.
 *       500:
 *         description: Error de sistema.
 */
router.post('/dmusic/confirm-recovery/:token', users.confirmRecovery);

/**
 * @swagger
 * /dmusic/register:
 *   post:
 *     summary: Registración de nuevo usuario
 *     description: Registración de un nuevo usuario a la aplicación.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - full_name
 *               - password
 *               - email
 *               - birthdate
 *               - gendre
 *             properties:
 *               full_name:
 *                 type: string
 *                 description: Nombre completo del usuario.
 *               email:
 *                 type: string
 *                 description: Email del usuario.
 *                 format: password
 *               password:
 *                 type: string
 *                 description: Password del usuario.
 *                 format: password
 *               birthdate:
 *                 type: string
 *                 description: Fecha de nachimiento del usuario.
 *               gender:
 *                 type: string
 *                 description: Genero del usuario.
 *     responses:
 *       200:
 *         description: Usuario registrado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Usuario registrado correctamente.
 *       400:
 *         description: Faltan datos obligatorios.
 *       401:
 *         description: El usuario ya está registrado
 *       500:
 *         description: Error de sistema.
 */
router.post('/dmusic/register', users.register);

// Endpoint para sacar artistas
router.get('/dmusic/artists', generic.getArtists);
// Endpoint para sacar canciones
router.get('/dmusic/songs', generic.getSongs);

// Endpoint buscar por cancion o artista
router.post('/dmusic/search', generic.searchSong);

// Endpoint para reproducir cancion
router.post('/dmusic/play-song', generic.playSong);
// Endpoint para reproducir canciones de un artista singolo
router.post('/dmusic/play-artist', generic.playArtist);
// Endpoint para reproducir canciones de tu libreria
router.post('/dmusic/play-library', generic.playLibrary);

// Endpoints para añadir, borrar y sacar canciones favoritas MySQL
router.post('/dmusic/add-favoritesongs', generic.addFavoritsSongs);
router.delete('/dmusic/delete-favoritesongs', generic.deleteFavoritsSongs);
router.get('/dmusic/favoritesongs', generic.getFavoritsSongs)


//---- MONGO DB
// Endpoints para sacar playlist y lopd mongoDB
router.get('/dmusic/playlists', mongo.getPlaylists);
router.get('/dmusic/lopd', mongo.getLopd);
router.post('/dmusic/playlist', mongo.getPlaylist);


export { router };