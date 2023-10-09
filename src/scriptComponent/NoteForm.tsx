import React, { useState, useReducer } from 'react';
import { Button, Input, Radio, Space } from 'antd';
import { DiscordService } from '../api/service';
import type { RadioChangeEvent } from 'antd';
import { LoadingOutlined } from '@ant-design/icons'
import './modal.scss'
import AppLogo from '../assets/InfoLog.png'


const reducer = (state: NoteState, action: NoteActionType) => {
    switch (action.type) {
        case 'UPDATE_NOTE_TITLE':
            return { ...state, title: action.payload, timestamp: new Date() }
        case 'UPDATE_NOTE_DESCRIPTION':
            return { ...state, description: action.payload, timestamp: new Date() }
        default:
            return { ...state }
    }
}

const initialState: NoteState = {
    title: '',
    description: '',
    timestamp: new Date(),
    sourceUrl: window.location.href
}

export const NoteForm: React.FC<{
    setIsModalOpen: (isOpen: boolean) => void
}> = ({ setIsModalOpen }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [value, setValue] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const processNote = async () => {
        setIsLoading(true)
        await DiscordService.postMessage(state, process.env.CHROME_EXTENSION_DISCORD_WEBHOOK)
        setIsModalOpen(false)
        setIsLoading(false)
    }


    const onChange = (e: RadioChangeEvent) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };

    return (
        <>
            <div className="header_node">
                <img src={AppLogo} className="logo_png" alt="" />
                <div>
                    <Radio.Group buttonStyle='solid' onChange={onChange} value={value}>
                        <Radio className='header_node__options' value={1}>Discord</Radio>
                        <Radio className='header_node__options' value={2}>Wordpress</Radio>
                    </Radio.Group>
                </div>
            </div>
            <Input showCount maxLength={20} placeholder="Title" onChange={(e) => {
                dispatch({ type: "UPDATE_NOTE_TITLE", payload: e.target.value })
            }} />
            <br />
            <br />
            <Input.TextArea
                showCount
                maxLength={200}
                placeholder="Description"
                rows={6}
                onChange={(e) => {
                    dispatch({ type: "UPDATE_NOTE_DESCRIPTION", payload: e.target.value })
                }} />
            <Space direction="vertical" style={{ width: '100%' }}>
                <Button className='btn-info-log' block onClick={processNote}>Send Note {
                    isLoading && <LoadingOutlined />
                }</Button>
            </Space>
        </>
    )
}