const DOMAIN = 'https://api.funcjin.cn'
const xhr = new XMLHttpRequest()

const post = (data) => new Promise((resolve,reject) => {
    xhr.open("POST", `${DOMAIN}/export`)
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(JSON.parse(xhr.responseText))
            }else{
                reject('导出失败，请重试！');
            }
        }
    }
    xhr.send(JSON.stringify(data));
})

const download = (url) => new Promise((resolve,reject) => {
    xhr.open("get", url);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status >= 200 && xhr.status < 300) {
                // 创建一个a，模拟点击
                var a = document.createElement("a");
                a.href = url;
                // 指定下载文件的文件名
                a.download = `HighDance-${new Date().toISOString()}`
                a.click();
                resolve();
            }else{
                reject('导出失败，请重试！')
            }
        }
    }
    xhr.send()
})

const req = { download,post,DOMAIN }

export default req