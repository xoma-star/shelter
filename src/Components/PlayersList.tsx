import {roomSchema} from "../interfaces";
import {Avatar, Cell} from "@vkontakte/vkui";
import React from "react";

const PlayersList = ({roomData}: {roomData: roomSchema | null}) => {
    return <div>
        {roomData?.players.map((v, i) => {
            return <Cell
                key={'player'+i}
                before={<Avatar src={v.ava}/>}
                after={i === 0 ? 'Хост' : ''}
                description={`Игрок ${i+1}`}
            >
                {v.name}
            </Cell>
        })}
    </div>
}

export default PlayersList