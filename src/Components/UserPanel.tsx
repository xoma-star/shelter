import {Card, CardGrid, Cell, Group, Header, List} from "@vkontakte/vkui";
import React from "react";
import {roomSchema} from "../interfaces";
import {
    Icon24BrainOutline, Icon24BriefcaseOutline,
    Icon24BugOutline,
    Icon24HorseToyOutline, Icon24KeyboardBotsOutline,
    Icon24LikeOutline,
    Icon24UserOutline
} from "@vkontakte/icons";

const UserPanel = ({roomData, userData}: {roomData: roomSchema | null, userData: any}) => {
    let userStats = roomData?.players?.find(x => x.id === userData.id)
    const icons = {
        health: <Icon24LikeOutline/>,
        biologic: <Icon24UserOutline/>,
        hobby: <Icon24HorseToyOutline/>,
        character: <Icon24BrainOutline/>,
        phobia: <Icon24BugOutline/>,
        additional: <Icon24KeyboardBotsOutline/>,
        equipment: <Icon24BriefcaseOutline/>
    }
    const description = {
        health: 'здоровье',
        biologic: 'биологические характеристики',
        hobby: 'хобби',
        character: 'характер',
        phobia: 'фобия',
        additional: 'дополнительно',
        equipment: 'снаряжение'
    }
    return <Group header={<Header mode={'secondary'}>Характеристики</Header>}>
        <CardGrid size={'l'}>
            <Card>
                <List>
                    {// @ts-ignore
                        Object.keys(userStats.stats).map((v: any) => {
                        // @ts-ignore
                            return <Cell before={icons[v]} description={description[v]}>
                            {// @ts-ignore
                                userStats?.stats[v]}
                        </Cell>
                    })}
                </List>
            </Card>
        </CardGrid>
    </Group>
}

export default UserPanel