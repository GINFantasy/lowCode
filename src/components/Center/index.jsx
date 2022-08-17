import { useState, useContext,useRef } from 'react'
import { message } from 'antd'

import context from '../../Context'
import { Slot, processEvents } from '../Libs/tool'
import LookMe from './LookMe'

import './index.css'

const Center = () => {
    const ctx = useContext(context)
    const { editor, freshEl, setEditor, setFreshEl, setCurSelectedEl, canvasWidth } = ctx
    const [lastPosition, setLastPosition] = useState({ top: 0, left: 0 })
    const [handOver, setHandOver] = useState(null)
    const [selected, setSelected] = useState(false)
    const canvasRef = useRef()
    const { flag, key, originStyle } = freshEl
    const handleMouseDown = e => {
        const path = e.nativeEvent.path
        const el = path.find(v => v.getAttribute && v.getAttribute('data-key'))
        if (!el) return
        const key = el.getAttribute('data-key')
        setFreshEl(editor.find(v => v.key === Number(key)))
    }
    const handleMouseMove = e => {
        if (!flag) return
        const top = e.nativeEvent.offsetY
        const left = e.nativeEvent.offsetX
        handOver.top(top)
        handOver.left(left)
        setSelected(true)
    }
    document.onmouseup = () => {
        if (!flag && !selected) return
        changePosition(lastPosition)
        message.warning('超出有效移动范围')
    }
    const changePosition = (position, require) => {
        handOver.top(0)
        handOver.left(-101)
        setSelected(false)
        setFreshEl({})
        setCurSelectedEl({ ...freshEl })
        if (require) return
        const isHave = editor.find(v => v.key === key)
        if (!isHave) return setEditor([...editor, { ...freshEl, position }])
        const arrs = editor.map(v => v.key === key ? { ...v, position } : v)
        setEditor(arrs)
    }
    const handleMouseUp = e => {
        if (!flag) return
        e.preventDefault()
        e.stopPropagation()
        const top = parseFloat(handOver.ref.style.top)
        const left = parseFloat(handOver.ref.style.left)
        const curPosition = { top, left }
        if (top <= -10 && left <= -101) {
            const { top, left } = lastPosition
            curPosition.top = top
            curPosition.left = left
            changePosition(true, true)
            return
        } else { setLastPosition({ top, left }) }
        const position = { top: curPosition.top, left: curPosition.left }
        changePosition(position)
    }
    const handleEvents = e => {
        e.preventDefault()
        e.stopPropagation()
        setSelected(false)
    }
    // 转换事件对象
    const getEventList = (editor,events,key)=>{
        if(!events) return {};
        let eventList = {}
        for(let n in events){
            eventList[n] = (e)=>processEvents(editor,key,n,e,handleEvents)
        }
        return eventList
    }
    console.log('center', editor)
    return (
        <div className="center" >
            <div
                className="canvas"
                ref={canvasRef}
                style={{ width: canvasWidth }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
            >
                <LookMe
                    setHandOver={setHandOver}
                    text={originStyle?.children}
                />
                 {
                    selected ? (
                        <div
                            className="shield"
                            style={{
                                width: `${canvasRef.current.scrollWidth}px`,
                                height: `${canvasRef.current.scrollHeight}px`
                            }}
                        ></div>
                    ) : null
                }
                {
                    editor.map((v, i) =><Slot
                        key={i}
                        {...v.originStyle}
                        events={getEventList(editor,v.events,i)}
                        style={{ ...v.position, ...v.style}}
                        data-key={i}
                        className={`static ${v.originStyle.className || ''}`}
                        render={v.el}
                    ></Slot>)
                }
            </div>
        </div>
    )
}

export default Center
