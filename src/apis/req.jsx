const DOMAIN = 'http://localhost:9999'
const xhr = new XMLHttpRequest()
const post = (url, data) => new Promise((resolve,reject) => {
    xhr.open("post", url)
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(JSON.parse(xhr.responseText))
            }else{
                reject('导出失败，请重试！');
            }
        }
    }
    xhr.send(data)
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
                a.download = "compress.zip";
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