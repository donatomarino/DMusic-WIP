import { useContext, useEffect, useState } from "react";
import Button from "../GeneralComponents/Button";
import { LoginContext } from "../../utils/contexto/LoginContext";
import { useNavigation } from "../../utils/hooks/useNavigation";
import useFetch from '../../utils/hooks/useFetch';
import { ComponentContext } from '../../utils/contexto/ComponentContext';
import {SearchContext} from '../../utils/contexto/SearchContext';
import {MessageContext} from '../../utils/contexto/MessageContext';
import Input from "../GeneralComponents/Input";
import { jwtDecode } from "jwt-decode";
import { FaSearch } from "react-icons/fa";

export const HeaderHome = () => {
    const { login } = useContext(LoginContext);
    const { toggleComponent } = useContext(ComponentContext);
    const {toggleMessage}= useContext(MessageContext);
    const { fetchData, fetchError } = useFetch();
    const {toggleSearch} = useContext(SearchContext);
    const [song, setSong] = useState('');
    const navigate = useNavigation();
    const [init, setInit] = useState('');

    useEffect(() => {
            const user = localStorage.getItem('token');
            console.log(user);
            // Sacamos el nombre del token para settar la initial
            if (user) setInit(jwtDecode(user).full_name);
    }, [])

    useEffect(() => {
        if(song.length === 0) {
            toggleComponent(2);
        }
    }, [song])

    const handleSong = async (e) => {
        e.preventDefault();
        
        if(song.length > 0){
            toggleComponent(7);
            try {
                const response = await fetchData({
                    endpoint: '/search',
                    method: 'POST',
                    body: {song}
                });
                console.log(response);
                if(response[0].length > 0){
                    toggleSearch(response);
                    toggleMessage();
                } else {
                    toggleSearch([]);
                    toggleMessage(`La canción ${song} no está disponible al momento.`);
                    console.log('Ha habido un problema en la solicitud de la busqueda: ', fetchError);
                }
            } catch(e) {
                console.log('Ha habido un problema en la solicutud: ', e);
            }
        }
    }

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