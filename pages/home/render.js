const element = document.getElementById("btn")

element.onclick = () => {
    api.saveFile('test.txt')
}