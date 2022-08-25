// 所有组件的配置(自带的组件属性、css样式、绑定事件等)
import {
    Button,
    Typography,
    Tag,
    DatePicker,
    Pagination,
    Avatar,
    Empty,
    Input,
    Image
} from 'antd'
import Video from './customComp/Video'
import Div from './customComp/Div'
import { defaultStyleConfig ,tagColors } from './defaultConfig'
import defaultIcons from './defaultIcons'
import './index.css'

const { Title,Text } = Typography
const processIcons = () => {
    const icons = {}
    const defaultIconsKey = Object.keys(defaultIcons)
    defaultIconsKey.forEach(v => {
        icons[v] = {
            el: processOriginComp(defaultIcons[v], v),
            options: options(`${v}图标`, {
                moreProps: onMorePropsConfig({ text: inMorePropsConfig(defaultCompName(v)) })
            },{originStyle: {
                    rotate: {
                        alias: '旋转角度',
                        values: {
                            rotate:'',
                        },
                        type:'input'
                    },
                    className: {
                        alias: '自定义类名',
                        values: {
                            className:'',
                        },
                        type:'input'
                    },
                    spin: {
                        alias: '旋转动画',
                        values: {
                            spin:['false','true'],
                        }
                    },
                    twoToneColor: {
                        alias: '双色图标主题色',
                        values: {
                            twoToneColor:'',
                        },
                        type:'input'
                    }
                }
            })
        }
    })
    return icons
}
const processOriginComp = (Comp, text = '', options) => props => {
    return <Comp {...props} {...options} >
        {
            text === '输入框'
            ? null
            :props?.children ? props?.children : text
        }
    </Comp>
}
// 包裹图片组件
const processImageOriginComp = (Comp,options) => props => {
    const {className,style,src} = props;
    return <div style={style}  src={null} className={`lc-image-ct ${className}`}>
        <Comp {...options} {...props} src={src || 'https://raw.githubusercontent.com/GINFantasy/blog-img/main/img-image-20220807195459103.png'}  style={{}} ></Comp>
    </div>
}
const options = (name, more, origin, e) => {
    const moreProps = (more && { ...more }) || { ...onMorePropsConfig() }
    const originStyle = (origin && { ...origin }) || { originStyle: {} }
    const events = e || ['onClick']
    return {
        name,
        ...moreProps,
        ...originStyle,
        events
    }
}
const onMorePropsConfig = (v = {}) => ({ ...defaultStyleConfig, ...v })
const defaultCompName = alias => ({ alias, inValues: { text: ['children'] } })
const inMorePropsConfig = (v = {}) => ({ values: {}, inValues: {}, ...v })
const backOriginStyle = (v = {}) => ({ ...v })

// 图片初始配置
const imageOptions = {
    width:100,
    height:100
}

const definedProps = {
    basisEl: {
        Text:{
            el: processOriginComp(Text, '文本'),
            options: options('文本组件', {
                moreProps: onMorePropsConfig({ text: inMorePropsConfig(defaultCompName('文本')) })
            }, {
                originStyle: backOriginStyle({
                    title: {
                        alias: '提示',
                        values: {
                            title: ''
                        },
                        type:'input'
                    },
                    id: {
                        alias: 'id',
                        values: {
                            id: ''
                        },
                        type:'input'
                    },
                    className: {
                        alias: '类名',
                        values: {
                            className: ''
                        },
                        type:'input'
                    },
                    type: {
                        alias: '类型',
                        values: {
                            type: ['','secondary' , 'success' , 'warning' , 'danger'],
                        }
                    },
                    code: {
                        alias: '代码样式',
                        values: {
                            code: ['false', 'true'],
                        }
                    },
                    copyable: {
                        alias: '可拷贝',
                        values: {
                            copyable: ['false', 'true'],
                        }
                    },
                    delete: {
                        alias: '删除线',
                        values: {
                            delete: ['false', 'true'],
                        }
                    },
                    disabled: {
                        alias: '禁用',
                        values: {
                            disabled: ['false', 'true'],
                        }
                    },
                    ellipsis: {
                        alias: '溢出省略',
                        values: {
                            ellipsis: ['false', 'true'],
                        }
                    },
                    keyboard: {
                        alias: '键盘',
                        values: {
                            keyboard: ['false', 'true'],
                        }
                    },
                    mark: {
                        alias: '标记',
                        values: {
                            mark: ['false', 'true'],
                        }
                    },
                    strong: {
                        alias: '加粗',
                        values: {
                            strong: ['false', 'true'],
                        }
                    },
                    italic: {
                        alias: '斜体',
                        values: {
                            italic: ['false', 'true'],
                        }
                    },
                    underline: {
                        alias: '下划线',
                        values: {
                            underline: ['false', 'true'],
                        }
                    },
                })
            }, ['onClick'])
        },
        Div:{
            el: processOriginComp(Div, '区域'),
            options: options('区域组件', {
                moreProps: onMorePropsConfig({ text: inMorePropsConfig(defaultCompName('区域')) })
            }, {
                originStyle: backOriginStyle({
                    title: {
                        alias: '提示',
                        values: {
                            title: ''
                        },
                        type:'input'
                    },
                    id: {
                        alias: 'id',
                        values: {
                            id: ''
                        },
                        type:'input'
                    },
                    className: {
                        alias: '类名',
                        values: {
                            className: ''
                        },
                        type:'input'
                    },
                    draggable: {
                        alias: '可拖拽',
                        values: {
                            draggable: ['false', 'true'],
                        }
                    },
                    contenteditable: {
                        alias: '可编辑',
                        values: {
                            contenteditable: ['false', 'true'],
                        }
                    },
                })
            }, ['onClick'])
        },
        Button: {
            el: processOriginComp(Button, '按钮'),
            options: options('按钮组件', {
                moreProps: onMorePropsConfig({ text: inMorePropsConfig(defaultCompName('按钮')) })
            }, {
                originStyle: backOriginStyle({
                    type: {
                        alias: '类型',
                        values: {
                            type: ['default', 'primary', 'ghost', 'dashed', 'link', 'text'],
                        }
                    },
                    danger: {
                        alias: '危险按钮',
                        values: {
                            danger: ['false', 'true'],
                        }
                    },
                    loading: {
                        alias: '载入状态',
                        values: {
                            loading: ['false', 'true'],
                        }
                    },
                    size: {
                        alias: '大小',
                        values: {
                            size: ['middle', 'large', 'small'],
                        }
                    },
                    shape: {
                        alias: '形状',
                        values: {
                            shape: ['default', 'circle', 'round'],
                        }
                    },
                    href: {
                        alias: '跳转链接',
                        values: {
                            href: '',
                        },
                        type:'input'
                    },
                    target: {
                        alias: '跳转选项',
                        values: {
                            target: ['_self','_blank','_parent','_top','framename']
                        }
                    },
                })
            }, ['onClick', 'onMouseMove'])
        },
        Title: {
            el: processOriginComp(Title, '标题'),
            options: options('标题组件', {
                moreProps: onMorePropsConfig({ text: inMorePropsConfig(defaultCompName('标题')) })
            }, {
                originStyle: backOriginStyle({
                    level: {
                        alias: '等级',
                        values: {
                            level: ''
                        },
                        type:'number'
                    },
                    type: {
                        alias: '文本类型',
                        values: {
                            type: ['secondary', 'success', 'warning', 'danger'],
                        }
                    },
                    disabled: {
                        alias: '禁用',
                        values: {
                            disabled: ['false', 'true'],
                        }
                    },
                    mark: {
                        alias: '标记',
                        values: {
                            mark: ['false', 'true'],
                        }
                    },
                    delete: {
                        alias: '删除线',
                        values: {
                            delete: ['false', 'true'],
                        }
                    },
                    underline: {
                        alias: '下划线',
                        values: {
                            underline: ['false', 'true'],
                        }
                    },
                    strong: {
                        alias: '加粗',
                        values: {
                            strong: ['false', 'true'],
                        }
                    }
                })
            },['onClick']),
        },
    },
    navigation: {
        Pagination: {
            el: processOriginComp(Pagination, '分页'),
            options: options('分页组件', {
                moreProps: onMorePropsConfig({ text: inMorePropsConfig(defaultCompName('分页')) })
            }, {
                originStyle: {
                    disabled: {
                        alias: '禁用分页',
                        values: {
                            disabled: ['false', 'true'],
                        }
                    },
                    hideOnSinglePage: {
                        alias: '只有一页时是否隐藏分页器',
                        values: {
                            hideOnSinglePage: ['false', 'true'],
                        }
                    },
                }
            }),
        },
    },
    dataEntry: {
        Input: {
            el: processOriginComp(Input, '输入框',{defaultValue:'输入框',width:100}),
            options: options('输入框组件', {
                moreProps: onMorePropsConfig({ text: inMorePropsConfig(defaultCompName('输入框')) })
            }, {
                originStyle:{
                    allowClear: {
                        alias: '允许清除',
                        values: {
                            allowClear: ['false', 'true'],
                        }
                    },
                    bordered: {
                        alias: '是否有边框',
                        values: {
                            bordered: ['true', 'false'],
                        }
                    },
                    defaultValue: {
                        alias: '默认值',
                        values: {
                            defaultValue: '输入框',
                        },
                        type:'input'
                    },
                    id: {
                        alias: 'id',
                        values: {
                            id: '',
                        },
                        type:'input'
                    },
                    maxLength: {
                        alias: '最大长度',
                        values: {
                            maxLength: '',
                        },
                        type:'input'
                    },
                    showCount: {
                        alias: '是否展示字数',
                        values: {
                            showCount: ['false', 'true'],
                        }
                    },
                    size: {
                        alias: '大小',
                        values: {
                            size: ['middle', 'large', 'small'],
                        }
                    },
                    status: {
                        alias: '校验状态',
                        values: {
                            status: ['', 'error', 'warning'],
                        }
                    },
                    type: {
                        alias: '类型',
                        values: {
                            type: '',
                        },
                        type:'input'
                    },
                    value: {
                        alias: '内容',
                        values: {
                            value: '输入框',
                        },
                        type:'input'
                    },
                }
            }, ['onChange', 'onPressEnter'])
        },
        DatePicker: {
            el: processOriginComp(DatePicker, '选择框'),
            options: options('选择框组件', {
                moreProps: onMorePropsConfig({ text: inMorePropsConfig(defaultCompName('选择框')) })
            }, {
                originStyle: {
                    allowClear: {
                        alias: '清除按钮',
                        values: {
                            allowClear: ['true', 'false'],
                        }
                    },
                    autoFocus: {
                        alias: '自动获取焦点',
                        values: {
                            autoFocus: ['false', 'true'],
                        }
                    },
                    className: {
                        alias: '类名',
                        values: {
                            className: '',
                        },
                        type:'input'
                    },
                    bordered: {
                        alias: '显示边框',
                        values: {
                            bordered: ['true', 'false'],
                        }
                    },
                    disabled: {
                        alias: '禁用',
                        values: {
                            disabled: ['false', 'true'],
                        }
                    },
                    dropdownClassName: {
                        alias: '弹出日历类名',
                        values: {
                            dropdownClassName: '',
                        },
                        type:'input'
                    },
                    inputReadOnly: {
                        alias: '只读',
                        values: {
                            inputReadOnly: ['false', 'true'],
                        }
                    },
                    mode: {
                        alias: '日期面板状态',
                        values: {
                            mode: ['time', 'date', 'month', 'year', 'decade'],
                        }
                    },
                    open: {
                        alias: '控制弹层是否展开',
                        values: {
                            open: ['true', 'false'],
                        }
                    },
                    picker: {
                        alias: '设置选择器类型',
                        values: {
                            picker: ['date', 'week', 'month', 'quarter', 'year'],
                        }
                    },
                    placeholder: {
                        alias: '提示文字',
                        values: {
                            placeholder: '',
                        },
                        type:'input'
                    },
                    placement: {
                        alias: '选择框弹出的位置',
                        values: {
                            placement: ['topLeft', 'bottomLeft', 'bottomRight', 'topRight'],
                        }
                    },
                    size: {
                        alias: '输入框大小',
                        values: {
                            size: ['middle', 'large', 'small'],
                        }
                    },
                    status: {
                        alias: '校验状态',
                        values: {
                            status: ['error', 'warning'],
                        }
                    },
                }
            }),
        },
    },
    dataShow: {
        Tag: {
            el: processOriginComp(Tag, 'tag'),
            options: options('Tag组件', {
                moreProps: onMorePropsConfig({ text: inMorePropsConfig(defaultCompName('tag')) })
            }, {
                originStyle: {
                    closable: {
                        alias: '是否可关闭',
                        values: {
                            closable: ['false', 'true'],
                        }
                    },
                    color: {
                        alias: '标签色',
                        values: {
                            color: tagColors,
                        }
                    }
                }
            }),
        },
        Avatar: {
            el: processOriginComp(Avatar, '头像'),
            options: options('头像组件', {
                moreProps: onMorePropsConfig({ text: inMorePropsConfig(defaultCompName('头像')) })
            }, {
                originStyle: {
                    shape: {
                        alias: '形状',
                        values: {
                            shape: ['circle', 'square'],
                        }
                    },
                    size: {
                        alias: '大小',
                        values: {
                            size: ['default', 'large','small'],
                        }
                    },
                    src: {
                        alias: '头像地址',
                        values: {
                            src: '',
                        },
                        type:'input'  // 类型为输入框
                    },
                    alt: {
                        alias: '头像描述',
                        values: {
                            alt: '',
                        },
                        type:'input'
                    },
                }
            },['onError']),
        },
        Image: {
            el: processOriginComp(processImageOriginComp(Image), '图片',imageOptions),
            options: options('图片组件', {
                moreProps: onMorePropsConfig({ text: inMorePropsConfig(defaultCompName('图片')) })
            }, {
                originStyle: {
                    preview: {
                        alias: '预览参数',
                        values: {
                            preview: ['true','false'],
                        }
                    },
                    src: {
                        alias: '图片地址',
                        values: {
                            src: '',
                        },
                        type:'input'
                    },
                    alt: {
                        alias: '图片描述',
                        values: {
                            alt: '',
                        },
                        type:'input'
                    },
                    rootClassName: {
                        alias: '自定义类名',
                        values: {
                            rootClassName: '',
                        },
                        type:'input'
                    },
                }
            },['onError']),
        },
        Video: {
            el: processOriginComp(Video, '视频',{autoplay:'autoplay',poster:'https://raw.githubusercontent.com/GINFantasy/blog-img/main/img-image-20220807195348225.png'}),
            options: options('视频组件', {
                moreProps: onMorePropsConfig({ text: inMorePropsConfig(defaultCompName('视频')) })
            }, {
                originStyle: {
                    src: {
                        alias: '视频链接',
                        values: {
                            src: '',
                        },
                        type:'input'
                    },
                    poster: {
                        alias: '默认图片',
                        values: {
                            poster: 'https://raw.githubusercontent.com/GINFantasy/blog-img/main/img-image-20220807195348225.png',
                        },
                        type:'input'
                    },
                    autoPlay: {
                        alias: '自动播放',
                        values: {
                            autoPlay: ['autoPlay', ''],
                        }
                    },
                    controls: {
                        alias: '控件',
                        values: {
                            controls: ['', 'controls'],
                        }
                    },
                    muted: {
                        alias: '静音',
                        values: {
                            muted: ['', 'muted'],
                        }
                    },
                    preload: {
                        alias: '预加载选项',
                        values: {
                            preload: ['none', 'auto','metadata'],
                        }
                    },
                    loop: {
                        alias: '循环',
                        values: {
                            loop: ['', 'loop'],
                        }
                    },
                   
                }
            },['onError']),
        },
        Empty: {
            el: processOriginComp(Empty, '空状态'),
            options: options('空状态组件', {
                moreProps: onMorePropsConfig({ text: inMorePropsConfig(defaultCompName('空状态')) })
            })
        },
    },
    icons: processIcons()
}

const libs = [
    ['通用', definedProps.basisEl],
    ['导航', definedProps.navigation],
    ['数据录入', definedProps.dataEntry],
    ['数据展示', definedProps.dataShow],
    ['图标', definedProps.icons],
]

export default libs
