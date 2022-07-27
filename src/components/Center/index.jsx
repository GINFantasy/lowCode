import { useState, useContext } from 'react'

import context from '../../Context'
import { Slot, processEvents } from '../Libs/tool'

import './index.css'

const defaultFn = Function.prototype
const release = () => {
    document.onmousemove = null
    document.onmouseup = null
}
document.onmouseup = release

const Center = () => {
    const { editor, curSideDrag, setEditor, setCurSideDrag, canvasWidth } = useContext(context)
    const [downStyle, setDownStyle] = useState(false)
    // onDragEnter进入元素时触发
    const dragEnter = e => {
        e.dataTransfer.dropEffect = 'move'
        setDownStyle(-1)
    }
    // onDragOver在目标元素经过 必须要阻止默认行为 否则不能触发drop
    const dragOver = e => e.preventDefault()
    // onDragLeave离开元素时触发
    const dragLeave = e => e.dataTransfer.dropEffect = 'none'
    // onDrop松手的时候触发
    const drop = e => {
        const curTop = e.nativeEvent.offsetY
        const curLeft = e.nativeEvent.offsetX
        const width = curSideDrag.style.width
        const height = curSideDrag.style.height
        const top = `${curTop - (height / 2)}px`
        const left = `${curLeft - (width / 2)}px`
        const origin = {
            ...curSideDrag,
            position: { top, left },
        }
        setEditor([...editor, origin])
    }
    const openChange = (e, i) => {
        e.preventDefault()
        e.stopPropagation()
        setDownStyle(i)
        setCurSideDrag(editor.find(v => v.key === i))
        var left = e.pageX - e.nativeEvent.target.offsetLeft;
        var top = e.pageY - e.nativeEvent.target.offsetTop;
        document.onmousemove = e => {
            e.preventDefault()
            e.stopPropagation()
            const newOrigin = [...editor]
            var x = e.pageX;
            var y = e.pageY;
            newOrigin[i].position.left = x - left + "px";
            newOrigin[i].position.top = y - top + "px";
            setEditor(newOrigin)
        }
    }
    const handleOriginBehavior = (e, i) => {
        e.preventDefault()
        e.stopPropagation()
        setCurSideDrag(editor.find(v => v.key === i))
        setDownStyle(i)
    }
    return (
        <div className="center" >
            <div
                className="canvas"
                style={{ width: canvasWidth }}
                onDragEnter={dragEnter}
                onDragOver={dragOver}
                onDragLeave={dragLeave}
                onDrop={drop}
            >
                {
                    editor.map((v, i) => (
                        <Slot
                            key={i}
                            {...v.originStyle}
                            style={{ ...v.position, ...v.style }}
                            className={`static ${downStyle === i ? 'active' : ''}`}
                            onMouseMove={e => processEvents(editor, i, 'onMouseMove', e, defaultFn)}
                            onClick={e => processEvents(editor, i, 'onClick', e, handleOriginBehavior)}
                            onMouseDown={e => openChange(e, i)}
                            onMouseUp={release}
                            render={v.el}
                        ></Slot>
                    ))
                }
            </div>
        </div>
    )
}

export default Center
