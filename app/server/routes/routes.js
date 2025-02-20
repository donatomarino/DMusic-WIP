import {Router} from 'express';
import generic from '../controllers/mysql/generics.controllers.js';
import users from '../controllers/mysql/users.controllers.js';
import mongo from '../controllers/mongo/generics.controllers.js';

const router = Router();

// Rutas para el login MySQL
router.post('/dmusic/login', users.login);
router.post('/dmusic/recovery-password', users.recoveryPass);
router.post('/dmusic/confirm-recovery/:token', users.confirmRecovery);
router.post('/dmusic/register', users.register);

// Rutas MySQL sacar tablas

// Ruta para sacar playlist y lopd mongoDB
router.get('/dmusic/playlists', mongo.getPlaylists);
router.get('/dmusic/lopd', mongo.getLopd);
router.post('/dmusic/playlist', mongo.getPlaylist);

// Rutas para sacar Artistas MySQL
router.get('/dmusic/artists', generic.getArtists);

// Ruta para añadir canciones
router.get('/dmusic/songs', generic.getSongs);

// Ruta para sacar canciones favoritas MySQL
router.get('/dmusic/favoritesongs', generic.getFavoritsSongs)

// Endpoint buscar por cancion o artista
router.post('/dmusic/search', generic.searchSong);

// Endpoint para reproducir cancion
router.post('/dmusic/play-song', generic.playSong);

// Endpoint para reproducir canciones de un artista singolo
router.post('/dmusic/play-artist', generic.playArtist);

// Endpoint para reproducir canciones de tu libreria
router.post('/dmusic/play-library', generic.playLibrary);

export {router};