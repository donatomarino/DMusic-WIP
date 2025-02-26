import { LoginContext } from "../../contexto/GeneralContext/LoginContext";
import { useContext } from 'react';
import { SongContext } from "../../contexto/HomeContext/SongContext";
import { toast } from "react-toastify";
import { Bounce } from "react-toastify";
import useFetch from "./useFetch";

export const usePlayPlaylist = () => {
    const {login} = useContext(LoginContext);
    const {fetchData} = useFetch();
    const { toggleSong } = useContext(SongContext);

    const handlePlaylist = async (id) => {
        if (login === 1) {
            try {
                const response = await fetchData({
                    endpoint: '/play-playlist',
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

    return {handlePlaylist}
}