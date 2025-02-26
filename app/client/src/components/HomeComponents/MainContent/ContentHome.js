import { useContentHome } from '../../../utils/hooks/HomeHooks/MainHooks/useContentHome';
import '../../../styles/home/Content.css';

export const ContentHome = () => {
    const {playlist, artists, handleSong, handlePlaylist} = useContentHome();
    
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
                            <div class="ContentHome__Card" onClick={() => handlePlaylist(e._id)}>
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
                            <div className="ContentHome__Card ContentHome__Card--Artists" onClick={() => handleSong(e.id_artist)}>
                                <img className="ContentHome__Card--Image ContentHome__Card--Avatar" src={e.avatar} alt="Card image cap" />
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