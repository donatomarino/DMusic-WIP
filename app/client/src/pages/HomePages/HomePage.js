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

export const HomePage = () => {
    const { component, toggleComponent } = useContext(ComponentContext);

    useEffect(() => {
        toggleComponent(2);
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
                    {component === 2 && <ContentHome />}
                    {component === 3 && <Explore />}
                    {component === 4 && <Trends />}
                    {component === 5 && <Library />}
                    {component === 6 && <UserData />}
                    {component === 7 && <Search />}
                </div>
            </div>

            <div className="HomePage__Iframe">
                <PlayerComponent />
            </div>
        </div>
    )
}