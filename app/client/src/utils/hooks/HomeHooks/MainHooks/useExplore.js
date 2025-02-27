import { useState, useEffect, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';
import { usePlaySong } from '../../GeneralHooks/usePlaySong'
import { LoginContext } from '../../../contexto/GeneralContext/LoginContext';
import { toast } from 'react-toastify';
import { Bounce } from 'react-toastify';
import useFetch from '../../GeneralHooks/useFetch';

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

                response?.length > 0 ? setSongs(response) : console.log('Ha habido un problema en la solicitud de las playlist: ', fetchError);

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
                toast.error('La canción ya está en tus favoritos!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                });
            } else {
                toast.success('Canción añadida a favoritos!', {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
            }
        } catch (e) {
            console.log('Ha habido un problema en la solicitud: ', e);
        }
    }

    return { songs, handleSong, login, handleFavorite }
}