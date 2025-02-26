import { useState, useEffect, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';
import useFetch from '../../GeneralHooks/useFetch';
import {usePlaySong} from '../../GeneralHooks/usePlaySong'
import { LoginContext } from '../../../contexto/GeneralContext/LoginContext';

export const useExplore = () => {
    const [songs, setSongs] = useState([]);
    const { fetchData, fetchError } = useFetch();
    const { handleSong } = usePlaySong();
    const { login } = useContext(LoginContext);

    useEffect(() => {
        const fetchSongs = async () => {
            try {
                const response = await fetchData({
                    endpoint: '/songs'
                })

                if (response && response.length > 0) {
                    setSongs(response)
                } else {
                    console.log('Ha habido un problema en la solicitud de las playlist: ', fetchError);
                }
            } catch (e) {
                console.log('Error en la solicitud: ', e)
            }
        }
        fetchSongs();
    }, [])

    const handleFavorite = async (id) => {
        try {
            const user = localStorage.getItem('token');
            const id_u = jwtDecode(user).id_user;
            const formData = {
                id_user: id_u,
                id_song: id
            }

            const response = await fetchData({
                endpoint: '/add-favoritesongs',
                method: 'POST',
                body: formData
            });

            if (response.length === 0) {
                alert('La canción ya está en tus favoritos')
            } else {
                alert('Canción añadida a favoritos')
            }
        } catch (e) {
            console.log('Ha habido un problema en la solicitud: ', e);
        }
    }

    return {songs, handleSong, login, handleFavorite}
}