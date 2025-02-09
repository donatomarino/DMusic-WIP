import useFetch from '../../utils/hooks/useFetch';
import { useState, useEffect } from 'react';
import '../../styles/home/Explore.css';

export const Trends = () => {
    const [songs, setSongs] = useState([]);
    const { fetchData, fetchError } = useFetch();

    useEffect(() => {
        const fetchPlaylist = async () => {
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
        fetchPlaylist();
    }, [])

    return (
        <div className="Explore__Container">

            <div className='Explore__Section'>
                <img src="https://i.pinimg.com/736x/86/e8/b8/86e8b85d661ad48df253371dca9de3ec.jpg" className='Explore__Section--Image' />
                <h3 className='Explore__Section--Title Trends__Section--Title'>2025 | TOP HITS TENDENCIAS NUEVAS</h3>
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