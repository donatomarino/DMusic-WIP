import { useContext } from 'react';
import { SearchContext } from '../../../contexto/HomeContext/SearchContext';
import { MessageContext } from '../../../contexto/GeneralContext/MessageContext';
import useFetch from '../../GeneralHooks/useFetch';
import {SongContext} from '../../../contexto/HomeContext/SongContext';
import { LoginContext } from '../../../contexto/GeneralContext/LoginContext';

export const useSearch = () => {
    const { search } = useContext(SearchContext);
    const { message } = useContext(MessageContext);
    const { login } = useContext(LoginContext);
    const { fetchData } = useFetch();
    const { toggleSong } = useContext(SongContext);

    const handleSong = async (id) => {
        if (login === 1) {
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
            alert('No tienes permisos para escuchar música');
        }
    }

    return{search, message, handleSong}
}