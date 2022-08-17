import { useState, useContext } from 'react'
import { Typography, Segmented,Popconfirm } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import Property from './Property'
import Style from './Style'
import EventListener from './EventListener'
import NoneProp from './NoneProp'
import context from '../../Context'

import './index.css'

const { Title } = Typography
const belong = {
    '属性': {
        name: 'o-s-p',
        comp: Property
    },
    '样式': {
        name: 'o-s-s-l',
        comp: Style
    },
    '事件': {
        name: 'o-s-e',
        comp: EventListener
    }
}
const render = Comp => <Comp />

const RightSide = () => {
    const [curSegmented, setCurSegmented] = useState('属性')
    const { curSelectedEl, editor, setEditor, setCurSelectedEl } = useContext(context)
    const { flag, key, options: { name } } = curSelectedEl
    const [preLeft, setPreLeft] = useState('o-s-p')
    const handleDel = () => {
        const newEditor = editor.filter(v => v.key !== key)
        setEditor(newEditor)
        setCurSelectedEl(false)
    }
    const handleCurSegmented = e => {
        const clasify = [['属性', 'o-s-s-l'], ['事件', 'o-s-s-r']]
        const cur = clasify.find(v => v[0] === curSegmented)
        setPreLeft(cur ? cur[1] : belong[e].name)
        setCurSegmented(e)
    }
    return (
        <div className="right-side">
            {
                !flag ? <NoneProp /> : (
                    <>
                        <div className="classify">
                            <header className='classify-header'>
                                <Title level={4}>{name}</Title>
                                <Popconfirm
                                    placement="rightBottom"
                                    showCancel={false}
                                    okText="Yes"
                                    cancelText="No"
                                    title={'您确定要删除该组件吗？'}
                                    onConfirm={handleDel}
                                >
                                    <DeleteOutlined className='del-comp' title='删除组件'/>
                                </Popconfirm>
                                
                            </header>
                            <Segmented block
                                options={['属性', '样式', '事件']}
                                onChange={e => handleCurSegmented(e)}
                            />
                            <div className={`one-set ${preLeft}`}>
                                {render(belong[curSegmented].comp)}
                            </div>
                        </div>
                    </>
                )
            }
        </div >
    )
}

export default RightSide
