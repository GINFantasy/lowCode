import { useState, useContext } from 'react'
import { Divider, Input, Button, message } from 'antd'

import context from '../../../Context'
import { toEvent } from '../../Libs/tool'

import './index.css'

const { TextArea } = Input

const ComponentCode = ({ handleContent }) => {
    const { editor, setEditor, curSideDrag, setCurSideDrag } = useContext(context)
    const getPreCode = () => {
        const preEvent = Object.keys(curSideDrag.events)[0]
        const defaultCode = curSideDrag.events[preEvent]?.code
        return defaultCode
    }
    const [code, setCode] = useState((curSideDrag && getPreCode()) || "例如 alert('hello Events')")
    const handleEvents = () => {
        const { key, events } = curSideDrag
        const eventName = Object.keys(events)[0]
        const next = v => ({
            ...v,
            events: { [eventName]: { fn: toEvent(code), code } }
        })
        setEditor(editor.map(v => v.key === key ? next(v) : v))
        setCurSideDrag(next(curSideDrag))
        message.success('提交成功')
        handleContent('code')
    }
    return (
        <>
            <Divider orientation="left">编写事件处理</Divider>
            <div className="code-text">
                <p>在此处键入您的事件处理代码：</p>
                <TextArea
                    disabled={curSideDrag.flag}
                    bordered={false}
                    className="text"
                    value={code}
                    onChange={e => setCode(e.target.value)}
                >
                </TextArea>
                <Button
                    ghost
                    block
                    disabled={curSideDrag.flag}
                    type="primary"
                    className="del-comp"
                    onClick={handleEvents}
                >完成</Button>
            </div>
        </>
    )
}

export default ComponentCode
