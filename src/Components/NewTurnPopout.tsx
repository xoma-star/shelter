import {roomSchema, statsKeys} from "../interfaces";
import {ActionSheet, ActionSheetItem, Cell, Header} from "@vkontakte/vkui";
import {useState} from "react";

const NewTurnPopout = ({roomData, ws, close}: {roomData: roomSchema | null, ws: WebSocket, close: () => void, userData?: any}) => {
    //ws.send(JSON.stringify({type: 'didTurn', data: {revealed: k, roomId: roomData?.id}}))
    //@ts-ignore
    const [a, b] = useState<string>(Object.keys(roomData?.players[roomData?.currentTurn].stats).filter((x: typeof statsKeys[number]) => {
        return roomData?.players[roomData?.currentTurn].revealed.indexOf(x) === -1
    })[0])
    if (!roomData) return <div/>
    return <ActionSheet onClose={() => {close();
        ws.send(JSON.stringify({type: 'didTurn',
            data: {revealed: a, roomId: roomData?.id}}))
        }}>
        <ActionSheetItem autoclose>
            <Header mode={'secondary'}>Откройте игрокам характеристику</Header>
            {Object.keys(roomData?.players[roomData?.currentTurn].stats).map((k: typeof statsKeys[number]) => {
                if(roomData?.players[roomData?.currentTurn].revealed.indexOf(k) < 0) return <Cell key={Math.random()*100}
                    onClick={() =>
                        {b(k)}
                    }
                    multiline
                    >{roomData?.players[roomData?.currentTurn].stats[k]}</Cell>
                return <div/>
            })}
        </ActionSheetItem>
    </ActionSheet>
}

export default NewTurnPopout