import { FaSearch } from "react-icons/fa";
import { useHeaderHome } from "../../../utils/hooks/HomeHooks/LayoutHooks/useHeaderHome";
import Button from "../../GeneralComponents/Button";
import Input from "../../GeneralComponents/Input";
import '../../../styles/home/Layout.css';

export const HeaderHome = () => {
    const { login, setSong, navigate, init, handleSong, toggleComponent } = useHeaderHome();

    return (
        <header className="HeaderHome__Container">
            <h1 className="HeaderHome__Logo">
                DMusic
            </h1>

            <div className="HeaderHome__SearchBar">
                <form className="HeaderHome__InputContainer" onSubmit={handleSong}>
                    <Input
                        className="HeaderHome__InputContainer--Input"
                        name="searchbar"
                        placeholder="¿Qué quieres reproducir?"
                        onChange={(e) => setSong(e.target.value)}
                    />
                    <Button type="submit" className="HeaderHome__InputContainer--Icon"><FaSearch size={18} color="#555" /></Button>
                </form>
            </div>

            {login === 0 ? (
                <div className="HeaderHome__Buttons">
                    <Button onClick={() => navigate('/user/register')}>Registrate</Button>
                    <Button onClick={() => navigate('/login')}>Iniciar Sesión</Button>
                </div>
            ) : (
                <div className="HeaderHome__Button--Profile" onClick={() => { toggleComponent(6) }}>{init[0]}</div>
            )}
        </header>
    )
}