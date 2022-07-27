import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Typography, Tooltip, Tag, Button, message } from 'antd'
import { DesktopOutlined, MobileOutlined } from '@ant-design/icons'

import store from '../../Store'
import context from '../../Context'

import './index.css'

const { Title } = Typography
const screen = { pc: '100%', ipad: '768px', iphone: '375px' }

const Tab = () => {
    const [curScreen, setCurScreen] = useState(screen.pc)
    const { setCanvasWidth, editor } = useContext(context)
    const change = s => {
        return () => {
            setCanvasWidth(screen[s])
            setCurScreen(screen[s])
        }
    }
    const autoSaveStore = () => {
        store.setItem(editor)
        message.success('已自动保存至本地')
    }
    return (
        <div className="tab">
            <Title>low-code</Title>
            <ul className="device"
            >
                <li className="high" onClick={change('pc')}>
                    <Tooltip placement="bottom" title="pc">
                        <DesktopOutlined />
                    </Tooltip>
                </li>
                <li className="high ipad" onClick={change('ipad')}>
                    <Tooltip placement="bottom" title="ipad">
                        <MobileOutlined />
                    </Tooltip>
                </li>
                <li className="high" onClick={change('iphone')}>
                    <Tooltip placement="bottom" title="iphone">
                        <MobileOutlined />
                    </Tooltip>
                </li>
                <li>
                    <Tag className="cur-screen">{curScreen}</Tag>
                </li>
            </ul>
            <ul>
                <Button type="primary">
                    <Link
                        to={{ pathname: "/preview", state: editor }}
                        onClick={autoSaveStore}
                    >预览</Link>
                </Button>
            </ul>
        </div>
    )
}

export default Tab
