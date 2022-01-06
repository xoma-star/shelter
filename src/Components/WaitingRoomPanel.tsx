import {
    Button,
    Caption,
    FormItem,
    Group,
    Header,
    Input,
    PanelHeader,
    PanelHeaderClose,
    Spinner
} from "@vkontakte/vkui";
import React from "react";
import {roomSchema, stringVoidFunction} from "../interfaces";
import PlayersList from "./PlayersList";

interface input{
    setActiveView: stringVoidFunction,
    ws: WebSocket | null,
    roomData: roomSchema | null,
    userData: any
}

const waitingRoomPanel = ({setActiveView, roomData, userData, ws}: input) => {
    const startGame = () => {
        ws?.send(JSON.stringify({
            type: 'startRoom',
            data: {
                roomId: roomData?.id,
                roomData: roomData
            }
        }))
    }
    return <div>
        <PanelHeader left={<PanelHeaderClose onClick={() => {
            setActiveView('connect')
            ws?.send(JSON.stringify({
                type: 'disconnectRoom',
                data: {
                    roomId: roomData?.id,
                    userId: userData.id,
                }
            }))
        }}/>}>
            Подключение
        </PanelHeader>
        <FormItem top={'Номер комнаты'}>
            <Input readOnly value={roomData?.id}/>
        </FormItem>
        <Group header={<Header mode={'secondary'}>Подключившиеся игроки</Header>}>
            <PlayersList roomData={roomData}/>
            <Caption style={{textAlign: 'center', color: 'var(--icon_outline_secondary)'}} weight={'medium'} level={'1'}>
                Ждем игроков <Spinner size={'small'}/>
            </Caption>
        </Group>
        {roomData?.players[0].id === userData.id &&
        <Button
            size={'l'}
            stretched
            style={{position: 'absolute', width: '94%', bottom: 10, margin: '3%'}}
            onClick={startGame}
        >
            Начать
        </Button>}
    </div>
}

export default waitingRoomPanel