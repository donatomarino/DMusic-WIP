import React, { useState, useEffect, useContext } from 'react';
import { SongContext } from '../../utils/contexto/SongContext';
import Player from "@madzadev/audio-player";
import "@madzadev/audio-player/dist/index.css";

export const PlayerComponent = () => {
    const { search } = useContext(SongContext);

    return (
        <Player
            key={search[0]?.url}  // Usar el 'url' como clave para asegurarnos de que se vuelve a renderizar
            trackList={search}  // Pasamos la lista actualizada de canciones
            includeTags={false}
            includeSearch={false}
            showPlaylist={false}
            sortTracks={false}
            autoPlayNextTrack={false}
        />
    );
};
