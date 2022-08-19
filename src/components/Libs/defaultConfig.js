/*
 * @Description: 
 * @Version: 2.0
 * @Autor: GuluGuluu
 * @Date: 2022-07-30 23:50:54
 * @LastEditors: GuluGuluu
 * @LastEditTime: 2022-08-17 19:39:24
 */
// 默认的配置、颜色、图标等
const colors = ['', '#52c41a', '#003865', '#EF5B0C', '#D4F6CC', '#3CCF4E', '#1A4D2E', '#FF9F29', '#FAF3E3', '#753188', '#01937C']
// 标签颜色
const tagColors = ['','magenta','red','volcano','orange','gold','lime','green','cyan','blue','geekblue','purple',]

const defaultOriginCssStyle = {
    marginTop: '',
    marginRight: '',
    marginBottom: '',
    marginLeft: '',
    paddingTop: '',
    paddingRight: '',
    paddingBottom: '',
    paddingLeft: '',
    fontSize: '',
    lineHeight: '',
    fontWeight: '',
    letterSpacing: '',
    borderColor: '',
    backgroundColor: '',
    color: '',
    overflow: '',
}

const defaultStyleConfig = {
    display: {
        alias: '类型',
        values: {display:['','block','inline-block','inline','none','inherit']},
        inValues: {},
    },
    size: {
        alias: '大小',
        values: {},
        inValues: { size: ['width', 'height'] },
    },
    margin: {
        alias: '外边距',
        values: {},
        inValues: { margin: ['marginTop', 'marginRight', 'marginBottom', 'marginLeft'] },
    },
    padding: {
        alias: '内边距',
        values: {},
        inValues: { padding: ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft'] },
    },
    border: {
        alias: '边框',
        values: { borderColor: [...colors]},
        inValues: {border:['borderRadius','borderWidth']}
    },
    background: {
        alias: '背景',
        values: { backgroundColor: [...colors]},
        inValues: {},
    },
    font: {
        alias: '文字',
        values: { color: [...colors], },
        inValues: { size: ['fontSize', 'lineHeight', 'fontWeight', 'letterSpacing'] },
    },
    textAlign: {
        alias: '文本对齐方式',
        values: { textAlign: ['inherit','left','right','center','justify'] },
        inValues: {},
    },
    overflow: {
        alias: '溢出',
        values: { overflow: ['', 'visible', 'hidden', 'scroll', 'auto'], },
        inValues: {},
    },
}

export {
    colors,
    tagColors,
    defaultOriginCssStyle,
    defaultStyleConfig,
}