import React, { useContext } from 'react';
import { SongContext } from '../../../utils/contexto/HomeContext/SongContext';
import Player from "@madzadev/audio-player";
import "@madzadev/audio-player/dist/index.css";

export const PlayerComponent = () => {
    const { song } = useContext(SongContext);

    return (
        <Player
            key={song[0]?.url}  // Usar el 'url' como clave para asegurarnos de que se vuelve a renderizar
            trackList={song}
            includeTags={false}
            includeSearch={false}
            showPlaylist={false}
            sortTracks={false}
            autoPlayNextTrack={false}
        />
    );
};
