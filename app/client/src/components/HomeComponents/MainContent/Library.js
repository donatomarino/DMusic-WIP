import { useLibrary } from "../../../utils/hooks/HomeHooks/MainHooks/useLibrary";
import { FaPlay, FaHeart } from "react-icons/fa";
import '../../../styles/home/Content.css';

export const Library = () => {
    const {library, handleSong, deleteSong} = useLibrary();
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
                            <span><strong>{e.title}</strong></span>
                            <span>{e.full_name}</span>
                            <FaPlay size={18} color="white" onClick={() => handleSong(e.id_song)} />
                            <span>{e.duration}</span>
                            <FaHeart size={18} color="red" onClick={() => deleteSong(e.id_song)}/>
                        </li>
                    ))}
                </ol>

            </div>
        </div>)
}