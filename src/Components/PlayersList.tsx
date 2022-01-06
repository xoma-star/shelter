import {roomSchema, stringVoidFunction} from "../interfaces";
import {Avatar, Cell} from "@vkontakte/vkui";
import React from "react";

const PlayersList = ({roomData, onclick = null, special = null}: {roomData: roomSchema | null, onclick?: null | stringVoidFunction, special?: null | object[]}) => {
    let tomap: any
    if(special) tomap = special
    else if(roomData) tomap = roomData.players
    else tomap = []
    return <div>
        {tomap.map((v: any, i: number) => {
            return <Cell
                key={'player'+i}
                before={<Avatar src={v.ava}/>}
                after={i === 0 ? 'Хост' : ''}
                description={special ? '' : (v.kicked ? 'исключен' : `Игрок ${i+1}`)}
                onRemove={onclick ? () => onclick(i) : () => {}}
                removable={onclick !== null}
            >
                {v.name}
            </Cell>
        })}
    </div>
}

export default PlayersList