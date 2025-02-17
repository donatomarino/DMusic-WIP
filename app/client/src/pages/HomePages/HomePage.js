import { HeaderHome } from "../../components/HomeComponents/HeaderHome";
import { SideMenu } from "../../components/HomeComponents/SideMenu";
import { ComponentContext } from "../../utils/contexto/ComponentContext";
import { useContext, useEffect } from "react";
import { ContentHome } from '../../components/HomeComponents/ContentHome';
import { Explore } from '../../components/HomeComponents/Explore';
import { Trends } from '../../components/HomeComponents/Trends';
import { Library } from '../../components/HomeComponents/Library';
import { UserData } from '../../components/HomeComponents/UserData';
import '../../styles/home/Home.css';
import { Search } from "../../components/HomeComponents/Search";
import { PlayerComponent } from "../../components/HomeComponents/PlayerComponent";
import { Player1 } from "../../components/HomeComponents/Player";

export const HomePage = () => {
    const { component, toggleComponent } = useContext(ComponentContext);

    useEffect(() => {
        toggleComponent('home');
    }, []);

    return (
        <div className="HomePage__Container">
            <div className="HomePage_Header">
                <HeaderHome />
            </div>

            <div className="HomePage__Main">
                <div className="HomePage__SideMenu">
                    <SideMenu />
                </div>

                <div className="HomePage__Content">
                    {component === 'home' && <ContentHome />}
                    {component === 'explore' && <Explore />}
                    {component === 'trends' && <Trends />}
                    {component === 'library' && <Library />}
                    {component === 'user-data' && <UserData />}
                    {component === 'search' && <Search />}
                </div>
            </div>

            <div className="HomePage__Iframe">
                <PlayerComponent />
            </div>
        </div>
    )
}