import { SongContext } from "../contexto/SongContext";
import { useContext } from 'react';
import useFetch from '../hooks/useFetch';
import { LoginContext } from "../contexto/LoginContext";

export const usePlaySong = () => {
    const {login} = useContext(LoginContext);
    const {fetchData} = useFetch();
    const { toggleSong } = useContext(SongContext);
    
    const handleSong = async (id) => {
        if(login === 1){
            try {
                const response = await fetchData({
                    endpoint: '/play-song',
                    method: 'POST',
                    body: { id }
                })
    
                if (response[0].length > 0) {
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
        } else {
            alert('Debes iniciar sesión para poder reproducir música');
        }
    }
    return { handleSong }
}