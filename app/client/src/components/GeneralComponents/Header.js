import { useNavigation } from "../../utils/hooks/useNavigation"

export const Header = () =>{
    const navigate = useNavigation();
    return(
        <header>
            {/* <img href= ""></img> */}
            <h1 onClick={() => navigate('/')}>DMusic</h1>
        </header>
    )
}