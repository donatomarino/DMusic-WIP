import { LoginContext } from "../contexto/LoginContext";
import { useContext } from 'react';
import useFetch from "./useFetch";
import { SongContext } from "../contexto/SongContext";

export const usePlayPlaylist = () => {
    const {login} = useContext(LoginContext);
    const {fetchData} = useFetch();
    const { toggleSong } = useContext(SongContext);

    const handlePlaylist = async (id) => {
        if (login === 1) {
            try {
                const response = await fetchData({
                    endpoint: '/playlist',
                    method: 'POST',
                    body: { id }
                })

                if (response.length > 0) {
                    const formattedTracks = [{
                        url: `http://localhost:5001/${response[0].url}`,
                        title: `${response[0].title}`,
                        tags: ["music"]
                    }];

                    toggleSong(formattedTracks);
                }
            } catch (e) {
                console.log('Ha habido un problema en la solicitud: ', e);
            }
        } else {
            alert('Debes estar logueado para escuchar música');
        }
    }

    return {handlePlaylist}
}