import {Epic, Tabbar, TabbarItem} from "@vkontakte/vkui";
import {Icon24GlobeOutline, Icon24HomeOutline, Icon24UserOutline} from "@vkontakte/icons";
import React from "react";
import {stringVoidFunction} from "../interfaces";

interface input{
    activePanel: string,
    setActivePanel: stringVoidFunction
}

const BottomNav = ({activePanel, setActivePanel}: input) => {
    return <Epic activeStory={activePanel} tabbar={
        <Tabbar>
            <TabbarItem onClick={() => setActivePanel('distress')} selected={activePanel === 'distress'} text={'Обзор'}>
                <Icon24GlobeOutline/>
            </TabbarItem>
            <TabbarItem onClick={() => setActivePanel('shelter')} selected={activePanel === 'shelter'} text={'Бункер'}>
                <Icon24HomeOutline/>
            </TabbarItem>
            <TabbarItem onClick={() => setActivePanel('player')} selected={activePanel === 'player'} text={'Игрок'}>
                <Icon24UserOutline/>
            </TabbarItem>
        </Tabbar>
    }/>
}

export default BottomNav