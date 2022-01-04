import {
    Button,
    Cell,
    FormItem,
    FormLayoutGroup,
    Input,
    PanelHeader,
    PanelHeaderBack,
    Slider,
    Switch
} from "@vkontakte/vkui";
import React, {useState} from "react";
import {stringVoidFunction} from "../interfaces";

interface input{
    setActivePanel: stringVoidFunction,
    setActiveView: stringVoidFunction,
    ws: null | WebSocket,
    userData: object
}

const CreateRoomPanel = ({setActivePanel, setActiveView, ws, userData}: input) => {
    const inputHandler = (e: React.FormEvent<HTMLInputElement>) => {
        let val = e.currentTarget.value
        seedUpdate(Number(val))
    }
    const switchHandler = (e: React.FormEvent<HTMLInputElement>) => {
        eventsUpdate(e.currentTarget.checked)
    }
    const sliderHandler = (e: number) => {
        willSurviveUpdate(e)
    }
    const buttonHandler = () => {
        if(ws) ws.send(JSON.stringify({
            type: 'createRoom',
            data: {
                seed,
                events,
                willSurvive,
                userData
            }
        }))
    }

    const [seed, seedUpdate] = useState<number>(0)
    const [events, eventsUpdate] = useState<boolean>(false)
    const [willSurvive, willSurviveUpdate] = useState<number>(50)

    return <div>
        <PanelHeader
            left={<PanelHeaderBack onClick={() => setActivePanel('main')}/>}
        >
            Создать комнату
        </PanelHeader>
        <FormLayoutGroup>
            <FormItem top={'Сид комнаты'} bottom={'оставьте 0 для случайного значения'}>
                <Input type={'text'} pattern={'[0-9]*'} value={seed} onChange={inputHandler}/>
            </FormItem>
            <FormItem>
                <Cell
                    after={<Switch checked={events} onChange={switchHandler}/>}
                    disabled
                >
                    Случайные события
                </Cell>
            </FormItem>
            <FormItem top={'Мест в убежище'} bottom={`выживут ${willSurvive}% игроков`}>
                <Slider
                    step={10}
                    min={10}
                    max={90}
                    value={willSurvive}
                    onChange={sliderHandler}
                />
            </FormItem>
            <FormItem>
                <Button onClick={buttonHandler} stretched size={'l'}>Создать</Button>
            </FormItem>
        </FormLayoutGroup>
    </div>
}

export default CreateRoomPanel