import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Tooltip, Tag, Button, message } from 'antd'
import { DesktopOutlined, MobileOutlined } from '@ant-design/icons'
import combineAsyncError from 'combine-async-error'

import store from '../../Store'
import context from '../../Context'
import req from '../../apis/req'
import { antMsg,download } from '../Libs/tool'
import './index.css'
const screen = { pc: '100%', ipad: '768px', iphone: '375px' }
const TooltipTemp = props => <Tooltip placement="bottom" {...props}></Tooltip>
let exportUrl = 'https://funcjin.cn/zip/lowcode.zip';

// 检查版本是否一致
const compareFileVersion = (editorid)=>{
    const id = store.getItem('id');
    return id && editorid && id === editorid;
}

const Tab = () => {
    const [curScreen, setCurScreen] = useState(screen.pc)
    const { setCanvasWidth, editor,contentSpinning,setContentSpinning,editorId,setEditorId } = useContext(context)
    const handleExport = () => {
        if (!editor.length) {
            message.error('您不能够导出一个空页面')
            return
        }
        // 版本是否一致的标志
        const common = compareFileVersion(editorId);
        // 保存当前版本
        store.setItem(editor,editorId);
        const exportArgs = [editor]
        const acc = ({ error, result }) => {
            const flag = result.every(v=>v.data?.msg?.flag === true);
            if(flag && result.length===0){
                message.success('导出成功！');
                const { url } = result[0].data.msg;
                exportUrl = url;
                download(url);
            }else{
                message.error('导出失败！');
                setEditorId('');
            }
            setContentSpinning(false)
        }
        // 若一致且已经导出过，则直接下载
        if(common && exportUrl){
            download(exportUrl);
            setContentSpinning(false)
        }
        // 否则需要进行重新导出
        else{
            antMsg.success('正在准备导出');
            setTimeout(antMsg.warning, 4000, '这可能会需要几分钟，请耐心等待');
            combineAsyncError([{ func: req.post, args:exportArgs }], { acc })
            setContentSpinning(true)
        }
    }
    const change = s => {
        return () => {
            setCanvasWidth(screen[s])
            setCurScreen(screen[s])
        }
    }
    const autoSaveStore = () => {
        store.setItem(editor,editorId);
        message.success('已自动保存至本地')
    }
    return (
        <div className="tab">
            <p className='tab-title'>Low-Code</p>
            <ul className="device"
            >
                <li className="high" onClick={change('pc')}>
                    <TooltipTemp title="pc">
                        <DesktopOutlined />
                    </TooltipTemp>
                </li>
                <li className="high ipad" onClick={change('ipad')}>
                    <TooltipTemp title="ipad">
                        <MobileOutlined />
                    </TooltipTemp>
                </li>
                <li className="high" onClick={change('iphone')}>
                    <TooltipTemp title="iphone">
                        <MobileOutlined />
                    </TooltipTemp>
                </li>
                <li>
                    <Tag className="cur-screen">{curScreen}</Tag>
                </li>
            </ul>
            <ul>
                <li>
                    <Button
                        type="primary"
                        disabled={contentSpinning}
                        onClick={handleExport}
                    >导出</Button>
                </li>
                <li>
                    <Button
                        type="primary"
                        disabled={contentSpinning}
                    >
                        <Link
                            to={{ pathname: "/preview", state: editor }}
                            onClick={autoSaveStore}
                        >预览</Link>
                    </Button>
                </li>
            </ul>
        </div>
    )
}

export default Tab
