import {Button, FormItem, FormLayoutGroup, Input, PanelHeader, PanelHeaderBack} from "@vkontakte/vkui";
import React, {useState} from "react";
import {stringVoidFunction} from "../interfaces";

interface input{
    setActivePanel: stringVoidFunction,
    setActiveView: stringVoidFunction,
    ws: null | WebSocket,
    userData: object
}

const ConnectRoomPanel = ({setActivePanel, setActiveView, ws, userData}: input) => {
    const [roomId, setRoomId] = useState<number>(0)

    const inputHandler = (e: React.FormEvent<HTMLInputElement>) => {
        let val = e.currentTarget.value
        setRoomId(Number(val))
    }

    const buttonHandler = () => {
        if(ws) ws.send(JSON.stringify({
            type: 'connectRoom',
            data: {userData: userData, roomId: roomId}
        }))
    }

    return <div>
        <PanelHeader left={<PanelHeaderBack onClick={() => setActivePanel('main')}/>}>Подключиться</PanelHeader>
        <FormLayoutGroup>
            <FormItem top={'Номер комнаты'}>
                <Input value={roomId} onChange={inputHandler}/>
            </FormItem>
            <FormItem>
                <Button onClick={buttonHandler} size={'l'} stretched>Подключиться</Button>
            </FormItem>
        </FormLayoutGroup>
    </div>
}

export default ConnectRoomPanel