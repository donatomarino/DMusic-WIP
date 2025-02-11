import useFetch from '../../utils/hooks/useFetch';
import { useState, useEffect } from 'react';
import '../../styles/home/Library.css';

export const Library = () => {
    const [library, setLibrary] = useState([]);
    const { fetchData, fetchError } = useFetch();
    const columns = [{
        "": "",
        title: "Titulo canción",
        name: "Artist Name",
        time: "Duración cancion",
        play: "Start music",
        favorite: "Favorite canción"
    }]

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

    return (
        <div className="">

            <div className='Explore__Section'>
                <img src="https://i.pinimg.com/736x/4e/b2/bc/4eb2bcc47c479fbaa623bb6fc9080847.jpg" className='Explore__Section--Image' alt='Page Image' />
                <h3 className='Explore__Section--Title Trends__Section--Title'>MI BIBLIOTECA</h3>
            </div>

            <div className="Library__ContainerList">
                
                <ol className='Library__Ol'>
                    {library
                        .map((e, i) => {
                            return (
                                <div className='Library__Item' key={i}>
                                    <li style={{display: 'flex', alignItems: 'center'}}>
                                        <img className='Library__Ol--Image' src={e.image}></img>
                                        <span>{e.title}</span>
                                        <span>{e.full_name}</span>
                                        <span className='Library__Ol--play'></span>
                                        <span className='Library__Ol--heart'></span>
                                    </li>
                                </div>
                            );
                        })}
                </ol>
            </div>
        </div>)
}