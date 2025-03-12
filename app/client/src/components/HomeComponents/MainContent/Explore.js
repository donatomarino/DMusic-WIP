import Button from '../../GeneralComponents/Button';
import { useExplore } from '../../../utils/hooks/HomeHooks/MainHooks/useExplore';
import { FaPlay, FaHeart } from "react-icons/fa";
import '../../../styles/home/Content.css';
import { ToastContainer } from 'react-toastify';

export const Explore = () => {
    const {songs, handleSong, login, handleFavorite} = useExplore();
    
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
                    <ToastContainer />
            </div>
        </div>
    )
}