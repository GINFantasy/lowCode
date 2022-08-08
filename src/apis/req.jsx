
const xhr = new XMLHttpRequest()
const get = (url, data) => new Promise(resolve => {
    xhr.open("post", url)
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(xhr.responseText)
            }
        }
    }
    xhr.send(data)
})

const req = { get }

export default req