const Slot = props => <>{props.render({ ...props, render: null })}</>
// 事件处理
const processEvents = (editor, key, name, e = {}, fn = Function.prototype) => {
    const handle = editor.find(v => v.key === key)
    const eventFn = handle?.events[name]?.fn
    eventFn && eventFn()
    fn(e, key)
}

export { Slot, processEvents }
