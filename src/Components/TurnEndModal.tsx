import {
    Button,
    Caption, Card,
    CardGrid,
    Group,
    Header, Input,
    ModalPage,
    ModalRoot,
    Spinner
} from "@vkontakte/vkui";
import {roomSchema, stringVoidFunction} from "../interfaces";
import React, {useState} from "react";
import PlayersList from "./PlayersList";
import NewTurnPopout from "./NewTurnPopout";

interface props{
    setModal: stringVoidFunction,
    roomData: roomSchema | null,
    userData: any,
    modal: string | null,
    ws: WebSocket,
    setPopout?: any
}

const TurnEndModal = ({setModal, roomData, userData, modal, ws, setPopout}: props) => {
    const endTurn = () => {
        ws.send(JSON.stringify({type: 'newTurn', data: {roomId: roomData?.id}}))
    }
    const [inputVal, setInputVal] = useState(0)
    let playerCards = roomData?.players.find(x => x.id === userData.id)
    return <ModalRoot activeModal={modal}>
        <ModalPage settlingHeight={100} id={'a'} onClose={() => {setModal(null); if(userData.id === roomData?.players[0].id) endTurn();}}>
            <Group header={<Header mode={'secondary'}>Карточки способностей</Header>}>
                {typeof playerCards?.cards !== 'undefined' && <CardGrid size={'m'}>
                    <Card><div style={{padding: 15}}>
                        {typeof playerCards !== 'undefined' && playerCards?.cards[0]?.data?.description}
                        <Input value={inputVal}
                               onChange={e => setInputVal(Number(e.currentTarget.value))} style={playerCards?.cards[0]?.data?.needInput ? {} : {display: 'none'}} placeholder={'номер'}/>
                        <Button onClick={() => ws.send(JSON.stringify({
                            type: 'useCard',
                            data: {
                                roomId: roomData?.id,
                                playerId: roomData?.players.findIndex(x => x.id === userData.id),
                                cardId: 0,
                                inputVal
                            }
                        }))} disabled={playerCards?.cards[0]?.used} style={{marginTop: 10}} stretched size={'m'}>Использовать</Button>
                    </div></Card>
                    <Card><div style={{padding: 15}}>
                        {playerCards?.cards[1]?.data?.description}
                        <Input value={inputVal}
                               onChange={e => setInputVal(Number(e.currentTarget.value))} style={playerCards?.cards[1]?.data?.needInput ? {} : {display: 'none'}} placeholder={'номер'}/>
                        <Button onClick={() => ws.send(JSON.stringify({
                            type: 'useCard',
                            data: {
                                roomId: roomData?.id,
                                playerId: roomData?.players.findIndex(x => x.id === userData.id),
                                cardId: 1,
                                inputVal
                            }
                        }))} disabled={playerCards?.cards[1]?.used} style={{marginTop: 10}} stretched size={'m'}>Использовать</Button>
                    </div></Card>
                </CardGrid>}
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
            <Group header={<Header mode={'secondary'}>Характеристики</Header>}>
                <PlayersList roomData={roomData} onRemove={(v: number) => setPopout(<NewTurnPopout viewPlayer={v} userData={userData} roomData={roomData} ws={ws} close={() => setPopout(null)}/>)} />
            </Group>
        </ModalPage>
    </ModalRoot>
}

export default TurnEndModal