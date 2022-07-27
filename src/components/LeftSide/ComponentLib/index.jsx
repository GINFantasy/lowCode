import React, { useRef, useContext } from 'react'
import { Divider, Collapse } from 'antd'

import libs from '../../Libs'
import { defaultOriginCssStyle } from '../../Libs/defaultConfig'
import context from '../../../Context'

import './index.css'

const { Panel } = Collapse

const ComponentLib = ({ handleContent }) => {
    const { editor, curSideDrag, setCurSideDrag } = useContext(context)
    const wholeSize = useRef(Array.from({ length: libs.length }).fill([]))
    // onDragStart开始拖拽时触发
    const dragStart = (comp, v, C) => {
        const style = { width: '', height: '', ...defaultOriginCssStyle }
        const afterRender = `${v} ${C}`
        const { el, options } = comp
        setCurSideDrag({
            el,
            afterRender,
            key: editor.length,
            style,
            originStyle: {
                children: options.moreProps.text.alias,
            },
            options,
            events: { [options.events[0]]: null },
        })
    }
    const dragEnd = () => {
        handleContent('lib')
        if (curSideDrag) setCurSideDrag(false)
    }
    return (
        <>
            <Divider orientation="left">组件库</Divider>
            <Collapse className="one-set" ghost={true} bordered={false}>
                {
                    libs.map((v, classifyIndex) => (
                        <Panel header={v[0]} key={classifyIndex}>
                            <div className="libs-container">
                                {
                                    Object.keys(v[1]).map((C, oneIndex) => (
                                        <div
                                            className="el-comp"
                                            draggable
                                            key={oneIndex}
                                            onDragStart={(e) => dragStart(v[1][C], v[0], C)}
                                            onDragEnd={dragEnd}
                                        >
                                            <div
                                                ref={el => wholeSize.current[classifyIndex].push(el)}
                                            >
                                                {v[1][C].el()}
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </Panel>
                    ))
                }
            </Collapse>
        </>
    )
}

export default ComponentLib
