


import useFetch from '../../utils/hooks/useFetch';
import { useState, useEffect } from 'react';
import '../../styles/home/Explore.css';

export const Explore = () => {
    const [songs, setSongs] = useState([]);
    const { fetchData, fetchError } = useFetch();

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

    return (
        <div className="Explore__Container">

            <div className='Explore__Section'>
                <img src="https://i.pinimg.com/736x/8f/3b/1e/8f3b1eaa982f4f6d179e92c07cee99ea.jpg" className='Explore__Section--Image' />
                <h3 className='Explore__Section--Title Trends__Section--Title'>RECOMENDACIONES DE LOS USUARIOS</h3>
            </div>

            <div className="Trends__ContainerCard">
                {songs
                    .sort((a, b) => (b.score - a.score))
                    .map((e) => {
                        return (
                            <div className="ContentHome__Card Trends__Card">
                                <img className="ContentHome__Card--Image" src={e.image} alt="Card image cap" />
                                <div className="ContentHome__Card--Body">
                                    <p className='Trends__Card--NameArtist'>{e.full_name}</p>
                                    <p className="ContentHome__Card--Title Trends__Card--Title">{e.title}</p>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    )
}