import React, { useState, useEffect } from 'react';
import useFetch from '../../utils/hooks/useFetch';
import Player from "@madzadev/audio-player";
import "@madzadev/audio-player/dist/index.css";
import '../../styles/home/Home.css';

export const Player1 = () => {
    const tracks = [
        {
          url: "https://audioplayer.madza.dev/Madza-Chords_of_Life.mp3",
          title: "Madza - Chords of Life",
          tags: ["house"],
        },
        {
          url: "https://audioplayer.madza.dev/Madza-Late_Night_Drive.mp3",
          title: "Madza - Late Night Drive",
          tags: ["dnb"],
        },
        {
          url: "https://audioplayer.madza.dev/Madza-Persistence.mp3",
          title: "Madza - Persistence",
          tags: ["dubstep"],
        },
      ];

    return (
            <Player 
                 trackList = {tracks} 
                 includeTags={false}
                 includeSearch={false}
                 showPlaylist={false}
                 sortTracks={false}
                 autoPlayNextTrack={false}
             />
    )
}