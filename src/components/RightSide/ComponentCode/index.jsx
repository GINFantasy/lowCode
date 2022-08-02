import { useState, useContext } from 'react'
import { Input, Button, message } from 'antd'

import context from '../../../Context'
import { toEvent } from '../../Libs/tool'

import './index.css'

const { TextArea } = Input

const ComponentCode = () => {
    const { editor, setEditor, curSelectedEl, setCurSelectedEl } = useContext(context)
    const getPreCode = () => {
        const preEvent = Object.keys(curSelectedEl.events)[0]
        const defaultCode = curSelectedEl.events[preEvent]?.code
        return defaultCode
    }
    const [code, setCode] = useState((curSelectedEl && getPreCode()) || "// 例如 alert('hello Events')\n")
    const handleEvents = () => {
        const { key, events } = curSelectedEl
        const eventName = Object.keys(events)[0]
        const next = v => ({
            ...v,
            events: { [eventName]: { fn: toEvent(code), code } }
        })
        setEditor(editor.map(v => v.key === key ? next(v) : v))
        setCurSelectedEl(next(curSelectedEl))
        message.success('提交成功')
    }
    return (
        <>
            <div className="code-text">
                <p>在此处键入您的事件处理代码：</p>
                <TextArea
                    disabled={!curSelectedEl.flag}
                    bordered={false}
                    className="text"
                    value={code}
                    onChange={e => setCode(e.target.value)}
                >
                </TextArea>
            </div>
            <Button
                ghost
                block
                disabled={!curSelectedEl.flag}
                type="primary"
                onClick={handleEvents}
            >完成</Button>
        </>
    )
}

export default ComponentCode
