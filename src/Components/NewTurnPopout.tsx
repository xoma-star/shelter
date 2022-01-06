import {roomSchema, statsKeys} from "../interfaces";
import {ActionSheet, ActionSheetItem, Cell, Header} from "@vkontakte/vkui";

const NewTurnPopout = ({roomData, ws, close}: {roomData: roomSchema | null, ws: WebSocket, close: () => void}) => {
    if (!roomData) return <div/>
    return <ActionSheet onClose={() => {close()}}>
        <ActionSheetItem autoclose>
            <Header mode={'secondary'}>Откройте игрокам характеристику</Header>
            {Object.keys(roomData?.players[roomData?.currentTurn].stats).map((k: typeof statsKeys[number]) => {
                if(roomData?.players[roomData?.currentTurn].revealed.indexOf(k) < 0) return <Cell key={roomData+'1'}
                    onClick={() =>
                        {ws.send(JSON.stringify({type: 'didTurn', data: {revealed: k, roomId: roomData?.id}}))}
                    }
                    multiline
                    >{roomData?.players[roomData?.currentTurn].stats[k]}</Cell>
                return <div/>
            })}
        </ActionSheetItem>
    </ActionSheet>
}

export default NewTurnPopout