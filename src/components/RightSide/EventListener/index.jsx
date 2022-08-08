import { useContext, useState } from 'react'
import { Divider, Select } from 'antd'
import ComponentCode from '../ComponentCode/index'

import context from '../../../Context'

const { Option } = Select

const EventListener = () => {
    const { setEditor, editor, curSelectedEl, setCurSelectedEl } = useContext(context)
    const { key, options, events } = curSelectedEl
    const [event,setEvent] = useState(options.events[0]);
    const selectChange = (_, { children }) => {
        setEvent(children);
        const next = v => {
            return {
                ...v,
                events: { ...v.events,[children]: v.events[children] }
            }
        }
        const newEditor = editor.map(v => v.key === key ? next(v) : v)
        setEditor(newEditor)
        setCurSelectedEl(next(curSelectedEl))
    }
    return <div className="classify-props code-editor">
        <Divider className="prop-divider" orientation='left' plain>添加事件</Divider>
        <div className="props-module">
            <Select
                className="event-select"
                key={events[0] || options.events[0]}
                defaultValue={events[0] || options.events[0]}
                onChange={selectChange}
            >
                {options.events.map((v, i) => <Option key={i}>{v}</Option>)}
            </Select>
        </div>
        <ComponentCode event={event}></ComponentCode>
    </div>
}

export default EventListener
