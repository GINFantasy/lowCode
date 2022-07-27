import { useState } from 'react'
import { message } from 'antd'

import context from './Context'
import store from './Store'
import Tab from './components/Tab'
import LeftSide from './components/LeftSide'
import Center from './components/Center'
import RightSide from './components/RightSide'

// 存储前进与后退的历史数据
const backEditor = []
const forwardEditor = []
const defaultCurSideDrag = { flag: true, options: { moreProps: {}, originStyle: {} }, style: {}, originStyle: {}, events: [] }
const { success, warning } = message

const toSaveStore = editor => {
  store.setItem(editor)
  success('保存成功')
}
const handleClearStore = () => {
  store.remove()
  success('已清空')
}
const handleReadme = () => {
  warning('请F12自行查看GitHub仓库，内有详细说明文档')
  setTimeout(() => {
    success('我相信你能看明白README.md')
  }, 1000 * 2)
}

const App = () => {
  // editor表示画布中的所有组件
  const [editor, handleEditor] = useState(store.getItem())
  // curSideDrag代表当前拖拽/选中的组件
  const [curSideDrag, handleCurSideDrag] = useState(defaultCurSideDrag)
  const [canvasWidth, setCanvasWidth] = useState('100%')
  const { Provider } = context
  // 拦截所有修改editor的操作，并追加至历史记录
  const setEditor = oneSet => {
    backEditor.push(oneSet[oneSet.length - 1])
    handleEditor(oneSet)
  }
  const setCurSideDrag = oneSet => {
    if (!oneSet) oneSet = defaultCurSideDrag
    handleCurSideDrag(oneSet)
  }
  const handleBackEditor = () => {
    if (!backEditor.length) {
      warning('暂时没有要后退的操作')
      return
    }
    const discard = backEditor.pop()
    discard && forwardEditor.push(discard)
    const newData = [...backEditor]
    const isNull = { ...newData[newData.length - 1] }
    const next = !Object.keys(isNull).length ? false : isNull
    setCurSideDrag(next)
    handleEditor(newData)
    success('已后退一次操作')
  }
  const handleForwardEditor = () => {
    if (!forwardEditor.length) {
      warning('暂时没有要前进的操作')
      return
    }
    const newData = [...forwardEditor]
    const isNull = { ...newData[newData.length - 1] }
    const next = !Object.keys(isNull).length ? false : isNull
    setCurSideDrag(next)
    handleEditor(newData)
    const discard = forwardEditor.pop()
    discard && backEditor.push(discard)
    success('已前进一次操作')
  }
  const handleSaveStore = () => toSaveStore(editor)
  const topOperations = {
    editor, setEditor, curSideDrag, setCurSideDrag, canvasWidth, setCanvasWidth,
    handleBackEditor, handleForwardEditor, handleSaveStore, handleClearStore, handleReadme,
  }
  return (
    <section className="app">
      <Provider value={{ ...topOperations }}>
        <Tab />
        <div className="content">
          <LeftSide />
          <Center />
          <RightSide />
        </div>
      </Provider>
    </section >
  )
}

export default App
