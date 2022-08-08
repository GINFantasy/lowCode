import React, { useState, useContext, useEffect } from 'react'
import { Divider, Collapse } from 'antd'

import libs from '../../Libs'
import { defaultOriginCssStyle } from '../../Libs/defaultConfig'
import context from '../../../Context'

import './index.css'

const { Panel } = Collapse

let panelKeyCache = []

const ComponentLib = React.memo(({ handleContent }) => {
    const { editor, setFreshEl } = useContext(context)
    const [panelKey,setPanelKey] = useState(panelKeyCache);
    const [move, setMove] = useState(false)
    const handleMouseDown = () => setMove(true)
    const handleMouseMove = (comp, v, C) => {
        if (!move) return
        const style = { width: '', height: '', ...defaultOriginCssStyle }
        const afterRender = `${v} ${C}`
        const { el, options } = comp
        setFreshEl({
            flag: true,
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
        setMove(false)
        handleContent('lib')
    }
    const savePanelStatus = (keys)=>{
        setPanelKey(keys.map(v=>parseInt(v)))
    }
    
    useEffect(()=>{
        // 保存上一次关闭时展开的key，用于下一次初始化
        panelKeyCache = panelKey
    },[panelKey])

    return (
        <>
            <Divider orientation="left">组件库</Divider>
            <Collapse className="one-set" ghost={true} bordered={false} defaultActiveKey={panelKey} onChange={(keys)=>savePanelStatus(keys)}>
                {
                    libs.map((v, classifyIndex) => (
                        <Panel header={v[0]} key={classifyIndex}>
                            <div className="libs-container">
                                {
                                    Object.keys(v[1]).map((C, oneIndex) => {
                                        return (
                                            <div
                                                className="el-comp"
                                                title={v[1][C].options.name}
                                                key={oneIndex}
                                                onMouseDown={handleMouseDown}
                                                onMouseMove={(e) => handleMouseMove(v[1][C], v[0], C)}
                                            >
                                                <div>{v[1][C].el()}</div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </Panel>
                    ))
                }
            </Collapse>
        </>
    )
})

export default ComponentLib
