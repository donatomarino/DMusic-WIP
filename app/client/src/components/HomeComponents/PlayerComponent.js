import React, { useState, useEffect } from 'react';
import useFetch from '../../utils/hooks/useFetch';
import Player from "@madzadev/audio-player";
import "@madzadev/audio-player/dist/index.css";

export const PlayerComponent = () => {
    const [tracks, setTracks] = useState();
    const { fetchData, fetchError } = useFetch();

    useEffect(() => {
        const fetchSongs = async () => {
            try {
                const response = await fetchData({
                    endpoint: '/songs'
                })

                if (response && response.length > 0) {
                    // Construimos el formato que quiere recibir la libreria del reproductor
                    const formattedTracks = await response.map(e => ({
                        url: `http://localhost:5001/${e.url}`,
                        title: `${e.full_name} - ${e.title}`,
                        tags: ["music"]
                    }));
                    
                    setTracks(formattedTracks);

                } else {
                    console.log('Ha habido un problema en sacar las canciones: ', fetchError);
                }
            } catch (e) {
                console.log('Error en la solicitud: ', e);
            }
        }
        fetchSongs();
    }, []);

    return (
        <Player
            trackList={tracks}
            includeTags={false}
            includeSearch={false}
            showPlaylist={false}
            sortTracks={false}
            autoPlayNextTrack={false}
        />)
}