import { useState, useEffect } from 'react';
import {usePlaySong} from '../../GeneralHooks/usePlaySong';
import { usePlayPlaylist } from '../../GeneralHooks/usePlayPlaylist';
import useFetch from '../../GeneralHooks/useFetch';

export const useContentHome = () => {
    const [playlist, setPlaylist] = useState([]);
    const [artists, setartists] = useState([]);
    const { fetchData, fetchError } = useFetch();
    const { handleSong } = usePlaySong();
    const {handlePlaylist} = usePlayPlaylist();

    useEffect(() => {
        const fetchs = async () => {
            try {
                const resPlaylist = await fetchData({
                    endpoint: '/playlists'
                })

                resPlaylist?.length > 0 ? setPlaylist(resPlaylist) : console.log('Ha habido un problema en la solicitud de las playlist: ', fetchError);

                const resArtists = await fetchData({
                    endpoint: '/artists'
                })

                resArtists?.length > 0 ? setartists(resArtists) : console.log('Ha habido un problema en la solicitud de los artistas: ', fetchError);

            } catch (e) {
                console.log('Error en la solicitud: ', e)
            }
        }
        fetchs();
    }, [])

    return {playlist, artists, handleSong, handlePlaylist}
}