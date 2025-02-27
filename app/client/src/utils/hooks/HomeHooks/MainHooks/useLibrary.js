import { useState, useEffect, useContext } from 'react';
import { SongContext } from '../../../contexto/HomeContext/SongContext';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';
import { Bounce } from 'react-toastify';
import useFetch from '../../GeneralHooks/useFetch';

export const useLibrary = () => {
    const [library, setLibrary] = useState([]);
    const { toggleSong } = useContext(SongContext);
    const { fetchData, fetchError } = useFetch();

    const user = localStorage.getItem('token');
    const id = jwtDecode(user).id_user;
    // const columns = [{
    //     "": "",
    //     title: "Titulo canción",
    //     name: "Artist Name",
    //     time: "Duración cancion",
    //     play: "Start music",
    //     favorite: "Favorite canción"
    // }]

    useEffect(() => {
        const fetchLibrary = async () => {
            try {
                const response = await fetchData({
                    endpoint: '/favoritesongs',
                    method: 'POST',
                    body: { id }
                })

                response?.length > 0 ? setLibrary(response[0]) : console.log('Ha habido un problema: ', fetchError);
            } catch (e) {
                console.log('Error en la solicitud: ', e)
            }
        }
        fetchLibrary();
    }, [library])

    const handleSong = async (value) => {
        try {
            const formData = {
                id_user: id,
                id_song: value
            }

            const response = await fetchData({
                endpoint: '/play-library',
                method: 'POST',
                body: formData
            })

            console.log(response)
            if (response.length !== 0) {
                const formattedTracks = [];
                response.map(e => {
                    e.map(e => {
                        formattedTracks.push({
                            url: `http://localhost:5001/${e.url}`,
                            title: `${e.title}`,
                            tags: ["music"]
                        });
                    });
                });
                toggleSong(formattedTracks);
            }
        } catch (e) {
            console.log('Ha habido un problema en la solicitud: ', e);
        }
    }

    const deleteSong = async (value) => {
        const formData = {
            id_user: id,
            id_song: value
        };

        await fetchData({
            endpoint: '/delete-favoritesongs',
            method: 'DELETE',
            body: formData
        });

        toast.success('Canción eliminada correctamente de tus favoritos', {
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

    return { library, handleSong, deleteSong }
}