import { useTrends } from '../../../utils/hooks/HomeHooks/MainHooks/useTrends';
import '../../../styles/home/Content.css';

export const Trends = () => {
    const { playlist, handlePlaylist } = useTrends();
    return (
        <div className="Explore__Container">

            <div className='Explore__Section'>
                <img src="https://i.pinimg.com/736x/86/e8/b8/86e8b85d661ad48df253371dca9de3ec.jpg" className='Explore__Section--Image' />
                <h3 className='Explore__Section--Title'>2025 | TOP HITS TENDENCIAS NUEVAS</h3>
            </div>

            <div className="ContentHome__Playlist">
                <h3>Playlist</h3>
            </div>

            <div className="ContentHome__ContainerCard">
                {playlist
                    .slice(0, 5)
                    .map((e) => {
                        return (
                            <div className="ContentHome__Card" onClick={() => handlePlaylist(e._id)}>
                                <img className="ContentHome__Card--Image" src={e.image} alt="Card image cap" />
                                <div className="ContentHome__Card--Body">
                                    <p className="ContentHome__Card--Title">{e.title}</p>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    )
}

