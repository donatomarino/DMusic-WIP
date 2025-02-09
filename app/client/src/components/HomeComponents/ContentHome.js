import useFetch from '../../utils/hooks/useFetch';
import { useState, useEffect } from 'react';
import '../../styles/home/ContentHomeExplore.css';

export const ContentHome = () => {
    const [playlist, setPlaylist] = useState([]);
    const [artists, setartists] = useState([]);
    const { fetchData, fetchError } = useFetch();

    useEffect(() => {
        const fetchs = async () => {
            try {
                const resPlaylist = await fetchData({
                    endpoint: '/playlist'
                })

                if (resPlaylist && resPlaylist.length > 0) {
                    setPlaylist(resPlaylist)
                } else {
                    console.log('Ha habido un problema en la solicitud de las playlist: ', fetchError);
                }

                const resArtists = await fetchData({
                    endpoint: '/artists'
                })

                if (resArtists && resArtists.length > 0) {
                    setartists(resArtists)
                } else {
                    console.log('Ha habido un problema en la solicitud de las playlist: ', fetchError);
                }

            } catch (e) {
                console.log('Error en la solicitud: ', e)
            }
        }
        fetchs();
    }, [])

    return (
        <div className="ContentHome__Container">
            <div className="ContentHome__Playlist">
                <h3>Top Playlist</h3>
            </div>

            <div className="ContentHome__ContainerCard">
                {playlist
                    .sort((a, b) => b.popularity - a.popularity)
                    .slice(0, 5)
                    .map((e) => {
                        return (
                            <div class="ContentHome__Card">
                                <img className="ContentHome__Card--Image" src={e.image} alt="Card image cap" />
                                <div className="ContentHome__Card--Body">
                                    <p className="ContentHome__Card--Title">{e.title}</p>
                                </div>
                            </div>
                        );
                    })}
            </div>

            <div className="ContentHome__Artists">
                <h3>Artistas populares</h3>
            </div>

            <div className="ContentHome__ContainerCard">
            {artists
                    .sort((a, b) => b.score - a.score)
                    .slice(0, 5)
                    .map((e) => {
                        return (
                            <div className="ContentHome__Card ContentHome__Card--Artists">
                                <img className="ContentHome__Card--Image ContentHome__Card--Avatar" src={e.avatar} alt="Card image cap"/>
                                <div className="ContentHome__Card--Body">
                                    <p className="ContentHome__Card--Title">{e.full_name}</p>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    )
}