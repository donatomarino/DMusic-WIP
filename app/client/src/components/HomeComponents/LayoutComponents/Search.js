import { useSearch } from '../../../utils/hooks/HomeHooks/LayoutHooks/useSearch';
import '../../../styles/home/Layout.css';
import Button from '../../GeneralComponents/Button';
import { FaPlay, FaHeart } from "react-icons/fa";

export const Search = () => {
    const { search, message, handleSong, login, handleFavorite } = useSearch();

    return (
        <div className="Explore__Container">

            <div className='Explore__Section'>
                <img src="https://i.pinimg.com/736x/bc/fb/4f/bcfb4f130a8b49ae314189f22e3c700b.jpg" className='Explore__Section--Image Search__Image' />
                <h3 className='Explore__Section--Title Trends__Section--Title'>RESULTADOS DE TU BUSQUEDA</h3>
            </div>

            <div className="Trends__ContainerCard">
                {search.map((e, i) => {
                    return (
                        <div className="ContentHome__Card Trends__Card" onClick={() => handleSong(e.id_song)}>
                            <img className="ContentHome__Card--Image" src={e.image} alt="Card image cap" />
                            <div className="ContentHome__Card--Body">
                                <p className='Trends__Card--NameArtist'>{e.full_name}</p>
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
                        </div>)
                })}
            </div>


            {message &&
                <div className='Search__Error'>{message}</div>
            }
        </div>
    )
}