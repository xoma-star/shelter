import {
    Button,
    Caption, Card,
    CardGrid,
    Group,
    Header,
    ModalPage,
    ModalRoot,
    Spinner
} from "@vkontakte/vkui";
import {roomSchema, stringVoidFunction} from "../interfaces";
import React from "react";
import PlayersList from "./PlayersList";

interface props{
    setModal: stringVoidFunction,
    roomData: roomSchema | null,
    userData: any,
    modal: string | null,
    ws: WebSocket
}

const TurnEndModal = ({setModal, roomData, userData, modal, ws}: props) => {
    const endTurn = () => {
        ws.send(JSON.stringify({type: 'newTurn', data: {roomId: roomData?.id}}))
    }
    return <ModalRoot activeModal={modal}>
        <ModalPage settlingHeight={100} id={'a'} onClose={() => {setModal(null); if(userData.id === roomData?.players[0].id) endTurn();}}>
            <Group header={<Header mode={'secondary'}>Карточки способностей</Header>}>
                <CardGrid size={'m'}>
                    <Card style={{paddingTop: 100}}/>
                    <Card style={{paddingTop: 100}}/>
                </CardGrid>
            </Group>
            {(roomData?.players[0].id === userData.id) && <Group>
                <div style={{display: 'flex', padding: 10}}>
                    <Button onClick={endTurn} stretched size={'l'}>Следующий круг</Button>
                </div>
                <Group header={<Header mode={'secondary'}>Голосование</Header>}>
                    <PlayersList roomData={roomData} onclick={v => ws.send(JSON.stringify({type: 'kickPlayer', data: {playerId: v, roomId: roomData?.id}}))} />
                </Group>
            </Group>}
            {(roomData?.players[0].id !== userData.id) && <Group>
                <Caption style={{textAlign: 'center', color: 'var(--icon_outline_secondary)'}} weight={'medium'} level={'1'}>
                    Ждем хоста <Spinner size={'small'}/>
                </Caption>
            </Group>}
        </ModalPage>
    </ModalRoot>
}

export default TurnEndModal