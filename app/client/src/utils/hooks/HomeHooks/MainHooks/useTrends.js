import { useState, useEffect } from 'react';
import useFetch from '../../GeneralHooks/useFetch';
import { usePlayPlaylist } from '../../GeneralHooks/usePlayPlaylist';

export const useTrends = () => {
    const [playlist, setPlaylist] = useState([]);
    const { fetchData, fetchError } = useFetch();
    const { handlePlaylist } = usePlayPlaylist();

    useEffect(() => {
        const fetchPlaylist = async () => {
            try {
                const response = await fetchData({
                    endpoint: '/playlists'
                })

                response?.length > 0 ? setPlaylist(response) : console.log('Ha habido un problema en la solicitud de las playlist: ', fetchError);
            } catch (e) {
                console.log('Error en la solicitud: ', e)
            }
        }
        fetchPlaylist();
    }, [])

    return { playlist, handlePlaylist }
}