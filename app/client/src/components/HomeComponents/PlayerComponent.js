import React, { useState, useEffect } from 'react';
import useFetch from '../../utils/hooks/useFetch';
import Player from "@madzadev/audio-player";
import "@madzadev/audio-player/dist/index.css";

export const PlayerComponent = () => {
    const [tracks, setTracks] = useState([]);
    const {fetchData, fetchError} = useFetch();

    useEffect(() => {
        const fetchSongs = async() => {
            try{
                const response = await fetchData({
                    endpoint: '/play'
                })

                if(response && response.length > 0){
                    const formattedTracks = Array.isArray(response[0]) ? response[0] : response;

                    setTracks(formattedTracks);
        
                    console.log(tracks);
                } else {
                    console.log('Ha habido un problema en sacar las canciones: ', fetchError);
                }
            } catch (e) {
                console.log('Error en la solicitud: ', e );
            }
        }
        fetchSongs();
    }, []);

    return (
       <Player trackList = {tracks} />
    )
}