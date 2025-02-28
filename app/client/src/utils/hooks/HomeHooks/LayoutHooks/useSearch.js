import { useContext } from 'react';
import { SearchContext } from '../../../contexto/HomeContext/SearchContext';
import { MessageContext } from '../../../contexto/GeneralContext/MessageContext';
import { SongContext } from '../../../contexto/HomeContext/SongContext';
import { LoginContext } from '../../../contexto/GeneralContext/LoginContext';
import { toast } from 'react-toastify';
import { Bounce } from "react-toastify";
import useFetch from '../../GeneralHooks/useFetch';

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
            toast.error('Debes iniciar sesión para poder reproducir música', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
        }
    }

    return { search, message, handleSong }
}