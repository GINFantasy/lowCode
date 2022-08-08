import { useState, useContext, useEffect } from 'react'
import { Input, Button, message } from 'antd'

import context from '../../../Context'
import { toEvent } from '../../Libs/tool'

import './index.css'

const { TextArea } = Input

const ComponentCode = (props) => {
    const { editor, setEditor, curSelectedEl, setCurSelectedEl } = useContext(context)
    // 保存当前所选的事件
    const { event } = props;
    const [code, setCode] = useState("// 例如 alert('hello Events')\n")
    const getPreCode = (curSelectedEl,event) => {
        return curSelectedEl.events[event]?.code;
    }
    // 更新代码内容
    useEffect(()=>{
        setCode(getPreCode(curSelectedEl,event) || "// 例如 alert('hello Events')\n")
    },[curSelectedEl,event])
    
    const handleEvents = (event) => {
        const { key } = curSelectedEl
        const next = v => ({
            ...v,
            events: { ...v.events,[event]: { fn: toEvent(code), code } }
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
                onClick={()=>handleEvents(event)}
            >完成</Button>
        </>
    )
}

export default ComponentCode
