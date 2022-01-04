import {Card, CardGrid, Cell, Group, Header, List} from "@vkontakte/vkui";
import React from "react";
import {roomSchema} from "../interfaces";
import {Icon24LikeOutline} from "@vkontakte/icons";

const UserPanel = ({roomData, userData}: {roomData: roomSchema | null, userData: any}) => {
    let userStats = roomData?.players?.find(x => x.id === userData.id)
    return <Group header={<Header mode={'secondary'}>Характеристики</Header>}>
        <CardGrid size={'l'}>
            <Card>
                <List>
                    <Cell before={<Icon24LikeOutline/>} description={'здоровье'}>
                        {userStats?.stats?.health}
                    </Cell>
                </List>
            </Card>
        </CardGrid>
    </Group>
}

export default UserPanel