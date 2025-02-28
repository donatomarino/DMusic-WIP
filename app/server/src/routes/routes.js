import { Router } from 'express';
import generic from '../controllers/mysql/generics.controllers.js';
import users from '../controllers/mysql/users.controllers.js';
import mongo from '../controllers/mongo/generics.controllers.js';

const router = Router();

//---- MYSQL
router.post('/dmusic/login', users.login);
router.post('/dmusic/recovery-password', users.recoveryPass);
router.patch('/dmusic/confirm-recovery/:token', users.confirmRecovery);
router.post('/dmusic/register', users.register);

// Interacciones
router.get('/dmusic/artists', generic.getArtists);
router.get('/dmusic/songs', generic.getSongs);
router.post('/dmusic/search', generic.searchSong);
router.post('/dmusic/play-song', generic.playSong);
router.post('/dmusic/play-artist', generic.playArtist);
router.post('/dmusic/play-library', generic.playLibrary);
router.post('/dmusic/add-favoritesongs', generic.addFavoritsSongs);
router.delete('/dmusic/delete-favoritesongs', generic.deleteFavoritsSongs);
router.post('/dmusic/favoritesongs', generic.getFavoritsSongs)


//---- MONGO DB
router.get('/dmusic/playlists', mongo.getPlaylists);
router.get('/dmusic/lopd', mongo.getLopd);
router.post('/dmusic/play-playlist', mongo.playPlaylist);


export { router };