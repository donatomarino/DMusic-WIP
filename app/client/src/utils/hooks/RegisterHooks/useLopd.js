import { useNavigation } from '../GeneralHooks/useNavigation';
import { LopdContext } from '../../contexto/RegisterContext/LopdContext';
import { useState, useContext } from 'react';
import { ComponentContext } from '../../contexto/GeneralContext/ComponentContext';
import useFetch from '../GeneralHooks/useFetch';

export const useLopd = () => {
    const { toggleComponent } = useContext(ComponentContext);
    const navigate = useNavigation();
    const { toggleLopd } = useContext(LopdContext);
    const [lopdData, setLopdData] = useState('');
    const { fetchData, fetchError } = useFetch();

    const fetchLopd = async () => {
        try {
            const response = await fetchData({
                endpoint: '/lopd'
            })

            if (response?.length !== 0) {
                const data = await response.json();
                setLopdData(data[0].text);
            } else {
                console.error("Error en la respuesta del servidor:", response.status);
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
        }
    }
    fetchLopd();
    const acceptChecker = (event) => {
        event.preventDefault();
        toggleComponent(1);
        navigate('/user/register');
    }

    return { toggleLopd, lopdData, acceptChecker };
};