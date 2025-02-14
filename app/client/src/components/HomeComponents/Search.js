import { useContext } from 'react';
import { SongContext } from '../../utils/contexto/SongContext';
import { MessageContext } from '../../utils/contexto/MessageContext';
import '../../styles/home/Explore.css';

export const Search = () => {
    const { search } = useContext(SongContext);
    const { message } = useContext(MessageContext);

    return (
        <div className="Explore__Container">

            <div className='Explore__Section'>
                <img src="https://i.pinimg.com/736x/bc/fb/4f/bcfb4f130a8b49ae314189f22e3c700b.jpg" className='Explore__Section--Image Search__Image' />
                <h3 className='Explore__Section--Title Trends__Section--Title'>RESULTADOS DE TU BUSQUEDA</h3>
            </div>

            <div className="Trends__ContainerCard">
                {search.length > 0 &&

                    <div className="ContentHome__Card Trends__Card">
                        <img className="ContentHome__Card--Image" src={search[0][0].image} alt="Card image cap" />
                        <div className="ContentHome__Card--Body">
                            <p className='Trends__Card--NameArtist'>{search[0][0].full_name}</p>
                            <p className="ContentHome__Card--Title Trends__Card--Title">{search[0][0].title}</p>
                        </div>
                    </div>
                }
            </div>

            {message &&
                <div className='Search__Error'>{message}</div>
            }
        </div>
    )
}