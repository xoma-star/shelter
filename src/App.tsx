import React, {useEffect, useState} from 'react';
import './App.css';
import '@vkontakte/vkui/dist/vkui.css';
import {
    AppRoot, Avatar,
    Button, Card, CardGrid, Cell,
    ConfigProvider, FixedLayout,
    Group, Header, List,
    Panel,
    PanelHeader,
    Platform,
    Root,
    View
} from "@vkontakte/vkui";
import CreateRoomPanel from "./Components/CreateRoomPanel";
import {roomSchema} from "./interfaces";
import ConnectRoomPanel from "./Components/ConnectRoomPanel";
import getUrlParam from "./Functions/getUrlParam";
import WaitingRoomPanel from "./Components/WaitingRoomPanel";
import BottomNav from "./Components/BottomNav";
import PlayersList from "./Components/PlayersList";
import UserPanel from "./Components/UserPanel";
import bridge from "@vkontakte/vk-bridge";
import {AppearanceScheme} from "@vkontakte/vkui/dist/components/ConfigProvider/ConfigProviderContext";

function App() {
    const [activeView, setActiveView] = useState<string>('connect')
    const [activePanel, setActivePanel] = useState<string>('main')
    const [colorScheme, setColorScheme] = useState<AppearanceScheme>('bright_light')
    const [ws, setWS] = useState<null | WebSocket>(null)
    const [roomData, setRoomData] = useState<null | roomSchema>(null)
    const [userData, setUserData] = useState({
        vk_user_id: Number(getUrlParam('id')),
        ava: 'https://sun9-74.userapi.com/impg/lwRe51lpHrWKjCUyRuZ4QnxP-Nb0oK-9rlCXrQ/Bl2aPke2WYY.jpg?size=1252x1279&quality=96&sign=6567e2ebac1fdc0018bda287e195f047&type=album',
        name: 'Лучший',
        id: null
    })

    useEffect(() => {
        bridge.subscribe(e => {
            if(e.detail.type === 'VKWebAppUpdateConfig') setColorScheme(e.detail.data.scheme)
            if(e.detail.type === 'VKWebAppGetUserInfoResult') setUserData({...userData, ava: e.detail.data.photo_100, name: e.detail.data.first_name})
        })
    }, [userData])

    useEffect(() => {
        setWS(new WebSocket('wss://server-shelter.herokuapp.com/'))
        bridge.send('VKWebAppInit').then(() => bridge.send("VKWebAppGetUserInfo"))
        //setWS(new WebSocket('ws://localhost:5500'))
    },[])

    useEffect(() => {
        if (ws) ws.onmessage = (m) => {
            let message = JSON.parse(m.data)
            if(message.type === 'createdRoom'){
                setRoomData(message.data)
                setActiveView('waitingRoom')
            }
            if(message.type === 'connected'){
                setUserData({...userData, id: message.data.id})
            }
            if(message.type === 'roomDataUpdated'){
                setRoomData(message.data)
                setActiveView('waitingRoom')
            }
            if(message.type === 'roomStarted'){
                setRoomData({...roomData, ...message.data})
                setActivePanel('distress')
                setActiveView('game')
            }
        }
    }, [roomData, userData, ws])
    useEffect(() => {
        let clear: NodeJS.Timer
        if(ws) ws.onopen = () => clear = setInterval(() => ws.send(JSON.stringify({ping: 'pong'})), 45000)
        if(ws) ws.onclose = () => clearInterval(clear)
    }, [ws])

    return (
        ws && <ConfigProvider scheme={colorScheme} platform={Platform.IOS}>
            <AppRoot>
                <Root activeView={activeView}>
                    <View id={'connect'} activePanel={activePanel}>
                        <Panel id={'main'}>
                            <PanelHeader>
                                Убежище
                            </PanelHeader>
                            <Group>
                                <div style={{display: 'flex', padding: 40}}>
                                    <Button stretched size={'l'} onClick={() => setActivePanel('create')}>Создать</Button>
                                    <div style={{width: 10}}/>
                                    <Button stretched size={'l'} onClick={() => setActivePanel('connect')}>Подключиться</Button>
                                </div>
                            </Group>
                        </Panel>
                        <Panel id={'create'}>
                            <CreateRoomPanel ws={ws} setActiveView={setActiveView} setActivePanel={setActivePanel} userData={userData}/>
                        </Panel>
                        <Panel id={'connect'}>
                            <ConnectRoomPanel ws={ws} setActiveView={setActiveView} setActivePanel={setActivePanel} userData={userData}/>
                        </Panel>
                    </View>
                    <View id={'waitingRoom'} activePanel={'main'}>
                        <Panel id={'main'}>
                            <WaitingRoomPanel setActiveView={setActiveView} ws={ws} roomData={roomData} userData={userData} />
                        </Panel>
                    </View>
                    <View activePanel={activePanel} id={'game'}>
                        <Panel id={'distress'}>
                            <Group header={<Header mode={'secondary'}>Что произошло?</Header>}>
                                <CardGrid size={'l'}>
                                    <Card style={{padding: 15}}>
                                        {roomData?.distress}
                                    </Card>
                                </CardGrid>
                            </Group>
                            <Group header={<Header mode={'secondary'}>Игроки</Header>}>
                                <CardGrid size={'l'}>
                                    <Card>
                                        <List>
                                            <PlayersList roomData={roomData}/>
                                        </List>
                                    </Card>
                                </CardGrid>
                            </Group>
                            <Group header={<Header mode={'secondary'}>Сейчас ходит</Header>}>
                                <CardGrid size={'l'}>
                                    <Card>
                                        <List>
                                            <Cell
                                                before={<Avatar src={roomData?.players[roomData?.currentTurn]?.ava}/>}
                                                description={`Игрок ${roomData ? roomData.currentTurn+1 : 1}`}
                                            >
                                                {roomData?.players[roomData?.currentTurn]?.name}
                                            </Cell>
                                        </List>
                                    </Card>
                                </CardGrid>
                            </Group>
                        </Panel>
                        <Panel id={'shelter'}>

                        </Panel>
                        <Panel id={'player'}>
                            <UserPanel roomData={roomData} userData={userData} />
                        </Panel>
                    </View>
                </Root>
                <FixedLayout>
                    {activeView === 'game' && <BottomNav setActivePanel={setActivePanel} activePanel={activePanel}/>}
                </FixedLayout>
            </AppRoot>
        </ConfigProvider>
    );
}

export default App;
