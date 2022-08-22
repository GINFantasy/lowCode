import { useState } from 'react'
import { message,Spin } from 'antd'
import { nanoid } from 'nanoid'

import context from './Context'
import store from './Store'
import Tab from './components/Tab'
import LeftSide from './components/LeftSide'
import Center from './components/Center'
import RightSide from './components/RightSide'

// 存储前进与后退的历史数据
const backEditor = []
const forwardEditor = []
const defaultCurSideDrag = { flag: false, options: { moreProps: {}, originStyle: {} }, style: {}, originStyle: {}, events: [] }
const { success, warning, error } = message

const toSaveStore = (editor,id) => {
  store.setItem(editor,id)
  success('保存成功')
}

const handleReadme = () => {
  warning('请F12自行查看GitHub仓库，内有详细说明文档')
  setTimeout(() => {
    success('我相信你能看明白README.md')
  }, 1000 * 2)
}

const App = () => {
  // editor表示画布中的所有组件
  const [editor, handleEditor] = useState(store.getItem('editor'))
  const [preEditor,setPreEditor] = useState(store.getItem('editor'))
  // freshEl代表要新生成的组件
  const [contentSpinning,setContentSpinning] = useState(false);
  const [editorId,setEditorId] = useState(store.getItem('id'));
  const [freshEl, setFreshEl] = useState({})
  const [canvasWidth, setCanvasWidth] = useState('100%')
  const [curSelectedEl, handleCurSelectedEl] = useState(defaultCurSideDrag)
  const { Provider } = context
  const handleClearStore = (isSetEditor) => {
    store.remove()
    if(isSetEditor) setEditor([])
    success('已清空')
  }
  // 拦截所有修改editor的操作，并追加至历史记录
  const setEditor = oneSet => {
    backEditor.push(oneSet[oneSet.length - 1])
    // 更新id
    setEditorId(nanoid());
    handleEditor(prev=>{
      setPreEditor(prev)
      return oneSet;
    })
  }
  const setCurSelectedEl = oneSet => {
    if (!oneSet) oneSet = defaultCurSideDrag
    handleCurSelectedEl(oneSet)
  }
  // 后退
  const handleBackEditor = () => {
    if (!backEditor.length) {
      return error('暂时没有要后退的操作')
    }
    forwardEditor.push(backEditor.pop())
    // 获取上一次操作记录的组件
    const discard = backEditor[backEditor.length - 1]
    // 获取其他组件
    const newData = preEditor.filter(v => v.key !== discard?.key)
    setCurSelectedEl((!discard) ? false : discard)
    handleEditor((!discard) ? [] : [...newData, discard])
    success('已后退一次操作')
  }
  // 前进
  const handleForwardEditor = () => {
    if (!forwardEditor.length) {
      error('暂时没有要前进的操作')
      return
    }
    const discard = forwardEditor.pop()
    backEditor.push(discard)
    const newData = editor.filter(v => v.key !== discard?.key)
    handleEditor((!editor.length) ? [discard] : [...newData, discard])
    setCurSelectedEl(discard)
    success('已前进一次操作')
  }
  const handleSaveStore = () => toSaveStore(editor,editorId)
  const topOperations = {
    editor, setEditor, freshEl, setFreshEl, canvasWidth, setCanvasWidth, curSelectedEl, setCurSelectedEl,
    handleBackEditor, handleForwardEditor, handleSaveStore, handleClearStore, handleReadme,contentSpinning,setContentSpinning,editorId,setEditorId
  }
  return (
    <section className="app">
      <Provider value={{ ...topOperations }}>
        <Tab />
        <div className="content">
          <Spin tip='请耐心等待...' className={`content-spin${contentSpinning?' spinning':''}`} spinning={contentSpinning}/>
          <LeftSide />
          <Center />
          <RightSide />
        </div>
      </Provider>
      <a className='link-cv' href='https://www.miit.gov.cn/'>鲁ICP备2021007041号-3</a>
    </section >
  )
}

export default App
