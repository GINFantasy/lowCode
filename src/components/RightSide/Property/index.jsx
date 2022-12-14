import { useContext } from 'react'
import { Divider, Select, Empty } from 'antd'

import context from '../../../Context'

const { Option } = Select

// 布尔字符串转布尔值
const turnBoolStringToBoolean = (str)=>{
    if(str === 'true' || str === 'false'){
        return str === 'true';
    }else{
        return str;
    }
}

const Property = () => {
    const { setEditor, editor, curSelectedEl, setCurSelectedEl } = useContext(context)
    const { key, options, originStyle } = curSelectedEl
    const originStyleKey = Object.keys(options.originStyle)
    const selectChange = (value, prop) => {
        const next = (v,isBool) => ({
            ...v,
            originStyle: {
                ...v.originStyle,
                [prop]: isBool? turnBoolStringToBoolean(value) : value,
            }
        })
        const newEditor = editor.map(v => v.key === key ? next(v,true) : v)
        setEditor(newEditor)
        setCurSelectedEl(next(curSelectedEl,false))
    }
    return <>
        {
            !originStyleKey.length ? <Empty
                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                description={<span>当前组件暂无内置属性</span>}
            /> : null
        }
        {
            originStyleKey.map((v, i) => {
                const { alias, values } = options.originStyle[v]
                const valuesKey = Object.keys(values)
                return (
                    <div className="classify-props" key={i}>
                        <Divider className="prop-divider" orientation={i % 2 !== 0 ? 'right' : 'left'} plain>{alias}</Divider>
                        <div className="props-module">
                            {
                                valuesKey.map((v, i) => (
                                    <div className="props-single" key={i}>
                                        <span className="props-title">{valuesKey[i]}:</span>
                                        <Select className="input"
                                            size="middle"
                                            key={originStyle[v] || values[valuesKey[i]]}
                                            defaultValue={()=>{
                                                console.log(originStyle[v] ,values[valuesKey[i]]);
                                                return originStyle[v] || values[valuesKey[i]]
                                            }}
                                            onChange={e => selectChange(values[v][e], v)}
                                        >
                                            {
                                                values[valuesKey[i]].map((v2, i2) => {
                                                    return <Option key={i2}>{v2}</Option>
                                                })
                                            }
                                        </Select>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                )
            })
        }
    </>
}

export default Property
