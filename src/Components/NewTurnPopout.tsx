import {roomSchema, statsKeys} from "../interfaces";
import {ActionSheet, ActionSheetItem, Cell, Header} from "@vkontakte/vkui";
import {useState} from "react";

const NewTurnPopout = ({roomData, ws, close, viewPlayer}: {roomData: roomSchema | null, ws: WebSocket, close: () => void, userData?: any, viewPlayer?: number}) => {
    //ws.send(JSON.stringify({type: 'didTurn', data: {revealed: k, roomId: roomData?.id}}))
    const description = {
        health: 'здоровье',
        biologic: 'биологические характеристики',
        hobby: 'хобби',
        character: 'характер',
        phobia: 'фобия',
        additional: 'дополнительно',
        equipment: 'снаряжение',
        profession: 'профессия'
    }
    //@ts-ignore
    const [a, b] = useState<string>(Object.keys(roomData?.players[roomData?.currentTurn].stats).filter((x: typeof statsKeys[number]) => {
        return roomData?.players[roomData?.currentTurn].revealed.indexOf(x) === -1
    })[0])
    if (!roomData) return <div/>
    return <ActionSheet onClose={() => {close();
        if(typeof viewPlayer === 'undefined') ws.send(JSON.stringify({type: 'didTurn',
            data: {revealed: a, roomId: roomData?.id}}))
        }}>
        <ActionSheetItem autoclose>
            <Header mode={'secondary'}>{typeof viewPlayer !== 'undefined' ? 'Открытые характеристики' : 'Откройте игрокам характеристику'}</Header>
            {typeof viewPlayer !== 'undefined' ? Object.keys(roomData?.players[viewPlayer].stats).map((k: typeof statsKeys[number]) => {
                if(roomData?.players[viewPlayer].revealed.indexOf(k) >-1) return <Cell key={Math.random()*100}
                    multiline
                    //@ts-ignore
                    description={description[k]}
                    >{roomData?.players[viewPlayer].stats[k]}</Cell>
                return <div/>
            }) : Object.keys(roomData?.players[roomData?.currentTurn].stats).map((k: typeof statsKeys[number]) => {
                if(roomData?.players[roomData?.currentTurn].revealed.indexOf(k) < 0) return <Cell key={Math.random()*100}
                                                                                                  onClick={() =>
                                                                                                  {b(k)}
                                                                                                  }
                                                                                                  multiline
                    //@ts-ignore
                                                                                                  description={description[k]}
                >{roomData?.players[roomData?.currentTurn].stats[k]}</Cell>
                return <div/>
            })}
        </ActionSheetItem>
    </ActionSheet>
}

export default NewTurnPopout