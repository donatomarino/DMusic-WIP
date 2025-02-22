


import useFetch from '../../../utils/hooks/useFetch';
import { useState, useEffect, useContext } from 'react';
import Button from '../../GeneralComponents/Button';
import { FaPlay, FaHeart } from "react-icons/fa";
import { jwtDecode } from 'jwt-decode';
import '../../../styles/home/Content.css';
import { usePlaySong } from '../../../utils/hooks/usePlaySong';
import { LoginContext } from '../../../utils/contexto/LoginContext';

export const Explore = () => {
    const [songs, setSongs] = useState([]);
    const { fetchData, fetchError } = useFetch();
    const { handleSong } = usePlaySong();
    const { login } = useContext(LoginContext);

    useEffect(() => {
        const fetchSongs = async () => {
            try {
                const response = await fetchData({
                    endpoint: '/songs'
                })

                if (response && response.length > 0) {
                    setSongs(response)
                } else {
                    console.log('Ha habido un problema en la solicitud de las playlist: ', fetchError);
                }
            } catch (e) {
                console.log('Error en la solicitud: ', e)
            }
        }
        fetchSongs();
    }, [])

    const handleFavorite = async (id) => {
        try {
            const user = localStorage.getItem('token');
            const id_u = jwtDecode(user).id_user;
            console.log(id_u);
            const formData = {
                id_user: id_u,
                id_song: id
            }

            const response = await fetchData({
                endpoint: '/add-favoritesongs',
                method: 'POST',
                body: formData
            });

            if (response.length === 0) {
                alert('La canción ya está en tus favoritos')
            } else {
                alert('Canción añadida a favoritos')
            }
        } catch (e) {
            console.log('Ha habido un problema en la solicitud: ', e);
        }
    }

    return (
        <div className="Explore__Container">
            <div className='Explore__Section'>
                <img src="https://i.pinimg.com/736x/8f/3b/1e/8f3b1eaa982f4f6d179e92c07cee99ea.jpg" className='Explore__Section--Image' />
                <h3 className='Explore__Section--Title Trends__Section--Title'>RECOMENDACIONES DE LOS USUARIOS</h3>
            </div>

            <div className="Trends__ContainerCard">
                {songs
                    .sort((a, b) => b.score - a.score)
                    .map((e, i) => {
                        return (
                            <div className="ContentHome__Card Trends__Card" key={i}>
                                <img
                                    className="ContentHome__Card--Image"
                                    src={e.image}
                                    alt="Card image cap"
                                />
                                <div className="ContentHome__Card--Body">
                                    <p className="Trends__Card--NameArtist">{e.full_name}</p>
                                    <p className="ContentHome__Card--Title Trends__Card--Title">{e.title}</p>

                                    {login === 1 &&
                                        <div className="Trends__Card--Buttons">
                                            <Button
                                                className="Trends__Card--PlayButton"
                                                onClick={() => handleSong(e.id_song)}
                                            >
                                                <FaPlay />
                                            </Button>

                                            <Button
                                                className="Trends__Card--FavButton"
                                                onClick={() => handleFavorite(e.id_song)}
                                            >
                                                <FaHeart />
                                            </Button>
                                        </div>

                                    }
                                </div>
                            </div>
                        )
                    })}
            </div>
        </div>
    )
}