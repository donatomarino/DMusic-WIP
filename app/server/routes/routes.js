import {Router} from 'express';
import generic from '../controllers/mysql/generics.controllers.js';
import users from '../controllers/mysql/users.controllers.js';
import mongo from '../controllers/mongo/generics.controllers.js';

const router = Router();

//---- MYSQL
// Endpoints login
router.post('/dmusic/login', users.login);
router.post('/dmusic/recovery-password', users.recoveryPass);
router.post('/dmusic/confirm-recovery/:token', users.confirmRecovery);
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


export {router};