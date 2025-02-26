import { useState, useEffect, useContext } from "react";
import {jwtDecode} from 'jwt-decode';
import { useNavigation } from "../../GeneralHooks/useNavigation";
import {MessageContext} from '../../../contexto/GeneralContext/MessageContext';
import { LoginContext } from "../../../contexto/GeneralContext/LoginContext";
import {SearchContext} from '../../../contexto/HomeContext/SearchContext';
import { ComponentContext } from "../../../contexto/GeneralContext/ComponentContext";
import useFetch from '../../GeneralHooks/useFetch';

export const useHeaderHome = () => {
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


    return {login, setSong, navigate, init, handleSong, toggleComponent}
}