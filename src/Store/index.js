import libs from '../components/Libs'

// key值始终固定
const key = 123456789
const map = new Map(libs)
const store = {
    getItem(type) {
        const str = window.localStorage.getItem(key);
        const obj = JSON.parse(str)
        // 可以返回id或者editor数组
        if(type !== 'id'){
            if(!obj) return []
            const { data } = obj
            const result = data.map(v => {
                const [classify, comp] = v.afterRender.split(' ')
                const el = map.get(classify)[comp].el
                v.el = el
                return v
            })
            return result
        }else{
            if(!obj) return '';
            return obj.id;
        }
    },
    setItem(data,id) {
        console.log('set',data,id);
        window.localStorage.setItem(key, JSON.stringify({data,id}));
    },
    remove() {
        window.localStorage.removeItem(key)
    },
}

export default store
