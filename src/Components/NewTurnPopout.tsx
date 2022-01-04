import {roomSchema, statsKeys} from "../interfaces";
import {ActionSheet, ActionSheetItem, Cell, Header} from "@vkontakte/vkui";

const NewTurnPopout = ({roomData, ws, close}: {roomData: roomSchema | null, ws: WebSocket, close: () => void}) => {
    if (!roomData) return <div/>
    return <ActionSheet onClose={() => {}}>
        <ActionSheetItem>
            <Header mode={'secondary'}>Откройте игрокам характеристику</Header>
            {Object.keys(roomData?.players[roomData?.currentTurn].stats).map((k: typeof statsKeys[number]) => {
                if(roomData?.players[roomData?.currentTurn].revealed.indexOf(k) < 0) return <Cell
                    onClick={() =>
                        {ws.send(JSON.stringify({type: 'didTurn', data: {revealed: k, roomId: roomData?.id}})); close()}
                    }
                    multiline
                    >{roomData?.players[roomData?.currentTurn].stats[k]}</Cell>
                return <div/>
            })}
        </ActionSheetItem>
    </ActionSheet>
}

export default NewTurnPopout