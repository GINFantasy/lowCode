import { message } from "antd"
const Slot = props => {
    const {events} = props
    return <>{props.render({ ...props,events:undefined,...events,render: null })}</>
}
// 事件处理
const processEvents = (editor, key, name, e = {}, fn = Function.prototype) => {
    const handle = editor.find(v => v.key === key)
    const eventFn = handle?.events[name]?.fn || toEvent(handle?.events[name]?.code)
    eventFn && eventFn()
    fn(e, key)
}
const toEvent = code => {
    return () => {
        try {
            // eslint-disable-next-line
            const r = eval(code)
            return r
        } catch (e) {
            return alert(e.message)
        }
    }
}

const antMsg = {
    success: (text, flag) => {
        if (flag) return message.success(text)
        message.success(text)
    },
    error: (text, flag) => {
        if (flag) return message.error(text)
        message.error(text)
    },
    warning: (text, flag) => {
        if (flag) return message.warning(text)
        message.warning(text)
    },
}

// 用于导出时对editor进行处理
const needDelKeys = ['flag', 'key', 'options']
const needCheckKeys = ['style', 'events']
const delKeys = obj => {
    const objKeys = Object.keys(obj)
    objKeys.forEach(k => { if (!obj[k]) delete obj[k] })
}
const cutEditor = editor => {
    const genuineData = []
    editor.forEach(preObj => {
        const nextObj = { ...preObj }
        needDelKeys.forEach(k => delete nextObj[k])
        needCheckKeys.forEach(k => delKeys(nextObj[k]))
        genuineData.push(nextObj)
    })
    return genuineData
}

const download = (url)=>{
    // 创建一个a，模拟点击
    var a = document.createElement("a");
    a.href = url;
    // 指定下载文件的文件名
    a.download = `HighDance-${new Date().toISOString()}.zip`
    a.click();
}

export { Slot, processEvents, toEvent, antMsg, cutEditor,download }
