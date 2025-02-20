import useFetch from '../../utils/hooks/useFetch';
import { useState, useEffect, useContext } from 'react';
import { FaPlay, FaHeart } from "react-icons/fa";
import { SongContext } from '../../utils/contexto/SongContext';
import '../../styles/home/Library.css';

export const Library = () => {
    const [library, setLibrary] = useState([]);
    const { toggleSong } = useContext(SongContext);
    const { fetchData, fetchError } = useFetch();
    // const columns = [{
    //     "": "",
    //     title: "Titulo canción",
    //     name: "Artist Name",
    //     time: "Duración cancion",
    //     play: "Start music",
    //     favorite: "Favorite canción"
    // }]

    useEffect(() => {
        const fetchLibrary = async () => {
            try {
                const response = await fetchData({
                    endpoint: '/favoritesongs'
                })

                console.log(response[0]);

                if (response && response.length > 0) {
                    setLibrary(response[0]);
                } else {
                    console.log('Ha habido un problema: ', fetchError);
                }
            } catch (e) {
                console.log('Ha habido un problema: ', e)
            }
        }
        fetchLibrary();
    }, [])

    const handleSong = async (id) => {
        try {
            const response = await fetchData({
                endpoint: '/play-song',
                method: 'POST',
                body: { id }
            })

            console.log(response);

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
    }

    return (
        <div className="">

            <div className='Explore__Section'>
                <img src="https://i.pinimg.com/736x/4e/b2/bc/4eb2bcc47c479fbaa623bb6fc9080847.jpg" className='Explore__Section--Image' alt='Page Image' />
                <h3 className='Explore__Section--Title Trends__Section--Title'>MI BIBLIOTECA</h3>
            </div>

            <div className="Library__ContainerList">
                <ol className='Library__Ol'>
                    {library.map((e, i) => (
                        <li key={i} className='Library__Item'>
                            <img className='Library__Ol--Image' src={e.image} alt={e.title} />
                            <span>{e.title}</span>
                            <span>{e.full_name}</span>
                            <FaPlay size={18} color="white" onClick={() => handleSong(e.id_song)} />
                            <FaHeart size={18} color="red" />
                        </li>
                    ))}
                </ol>

            </div>
        </div>)
}