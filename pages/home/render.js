const element = document.getElementById("btn")
const readBtn = document.getElementById("readBtn");

// 写入文件
element.onclick = () => {
    api.saveFile('test.txt')
}

// 读取文件
readBtn.onclick = async () => {
    const data = await api.readFile()
    alert('读取成功：' + data)
}