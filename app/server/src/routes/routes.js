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
 *         description: Email enviado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de respuesta.
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
 *   patch:
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
router.patch('/dmusic/confirm-recovery/:token', users.confirmRecovery);

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

/**
 * @swagger
 * /dmusic/artists:
 *   get:
 *     summary: Obtiene todos los artistas
 *     description: Obtiene todos los artistas en la base de datos.
 *     responses:
 *       200:
 *         description: Lista de artistas obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                      type: object
 *       400:
 *         description: No hay artistas en la base de datos.
 *       500:
 *         description: Error de sistema.
 */
router.get('/dmusic/artists', generic.getArtists);

/**
 * @swagger
 * /dmusic/songs:
 *   get:
 *     summary: Obtiene todas las canciones
 *     description: Obtiene todas las canciones en la base de datos.
 *     responses:
 *       200:
 *         description: Lista de canciones obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                      type: object
 *       400:
 *         description: No hay canciones en la base de datos.
 *       500:
 *         description: Error de sistema.
 */
router.get('/dmusic/songs', generic.getSongs);

/**
 * @swagger
 * /dmusic/search:
 *   post:
 *     summary: Buscar canción.
 *     description: Buscar canción tramite su título.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - song
 *             properties:
 *               song:
 *                 type: string
 *                 description: Título de la canción
 *     responses:
 *       200:
 *         description: Canción obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *       400:
 *         description: No hay canciones con este titulo.
 *       500:
 *         description: Error de sistema.
 */
router.post('/dmusic/search', generic.searchSong);

/**
 * @swagger
 * /dmusic/play-song:
 *   post:
 *     summary: Reproducir una canción.
 *     description: Reproducir una canción tramite su id.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_song
 *             properties:
 *               id_song:
 *                 type: string
 *                 description: id de la canción
 *     responses:
 *       200:
 *         description: Canción reproduciendo exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *       500:
 *         description: Error de sistema.
 */
router.post('/dmusic/play-song', generic.playSong);

/**
 * @swagger
 * /dmusic/play-artist:
 *   post:
 *     summary: Reproducir canciones de un artista.
 *     description: Reproducir canciones de un artista predefinido tramite su id.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_artist
 *             properties:
 *               id_artist:
 *                 type: string
 *                 description: id del artista
 *     responses:
 *       200:
 *         description: Artista reproduciendo exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *       500:
 *         description: Error de sistema.
 */
router.post('/dmusic/play-artist', generic.playArtist);

/**
 * @swagger
 * /dmusic/play-library:
 *   post:
 *     summary: Reproducir librería personal.
 *     description: Reproducir canciones que el usuario tiene entre los favoritos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_user
 *               - id_song
 *             properties:
 *               id_user:
 *                 type: string
 *                 description: id del usuario
 *               id_song:
 *                 type: string
 *                 description: id de la canción
 *     responses:
 *       200:
 *         description: Canciones favoritas reproduciendo exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *       500:
 *         description: Error de sistema.
 */
router.post('/dmusic/play-library', generic.playLibrary);

/**
 * @swagger
 * /dmusic/add-favoritesongs:
 *   post:
 *     summary: Añadir cancion a lista favoritos.
 *     description: Añadir canción a lista favoritos en la librería personal.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_user
 *               - id_song
 *             properties:
 *               id_user:
 *                 type: string
 *                 description: id del usuario
 *               id_song:
 *                 type: string
 *                 description: id de la canción
 *     responses:
 *       200:
 *         description: Canción añadida a favoritos exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: La cancion ya esta en tus favoritos.
 *       500:
 *         description: Error de sistema.
 */
router.post('/dmusic/add-favoritesongs', generic.addFavoritsSongs);

/**
* @swagger
* /dmusic/delete-favoritesongs:
*   delete:
*     summary: Eliminar canción de lista favoritos.
*     description: Eliminar canción de lista favoritos según su ID y el ID del usuario.
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             required:
*               - id_user
*               - id_song
*             properties:
*               id_user:
*                 type: string
*                 description: id del usuario
*               id_song:
*                 type: string
*                 description: id de la canción
*     responses:
*       200:
*         description: Canción eliminada exitosamente.
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*       500:
*         description: Error de sistema.
*/
router.delete('/dmusic/delete-favoritesongs', generic.deleteFavoritsSongs);

/**
* @swagger
* /dmusic/favoritesongs:
*   post:
*     summary: Lista canciones favoritas.
*     description: Obtiene la lista de todas las canciones añadidas a los favoritos.
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             required:
*               - id
*             properties:
*               id_user:
*                 type: string
*                 description: id del usuario
*     responses:
*       200:
*         description: Lista favoritos obtenida exitosamente.
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 data:
*                   type: array
*                   items:
*                     type: object
*       400:
*         description: No hay canciones favoritas en la base de datos.
*       500:
*         description: Error de sistema.
*/
router.post('/dmusic/favoritesongs', generic.getFavoritsSongs)


//---- MONGO DB
/**
 * @swagger
 * /dmusic/playlists:
 *   get:
 *     summary: Obtiene todas las playlists
 *     description: Obtiene todas las playlists en mongo.
 *     responses:
 *       200:
 *         description: Lista de playlist obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                      type: object
 *       400:
 *         description: No hay playlist en la base de datos.
 *       500:
 *         description: Error de sistema.
 */
router.get('/dmusic/playlists', mongo.getPlaylists);

/**
 * @swagger
 * /dmusic/lopd:
 *   get:
 *     summary: Obtiene los lopd
 *     responses:
 *       200:
 *         description: Lopd obtenidos exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                      type: object
 *       500:
 *         description: Error de sistema.
 */
router.get('/dmusic/lopd', mongo.getLopd);

/**
* @swagger
* /dmusic/play-playlist:
*   post:
*     summary: Reproducir playlist predeterminada.
*     description: Reproduce la playlist seleccionada por parte del usuario tramite su id.
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             required:
*               - id
*             properties:
*               id:
*                 type: string
*                 description: id playlist
*     responses:
*       200:
*         description: Playlist reproduciendo exitosamente.
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 data:
*                   type: array
*                   items:
*                     type: object
*       500:
*         description: Error de sistema.
*/
router.post('/dmusic/play-playlist', mongo.playPlaylist);


export { router };