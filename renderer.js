const { ipcRenderer } = require('electron')
const sanitizeHtml = require('sanitize-html')
const path = require('path')
const fs = require('fs')


let rootDir = '.'

function add_p(text) {
    p = document.createElement('p')
    p.innerHTML = text
    document.getElementById('main-text').appendChild(p)
    p.scrollIntoView(false)
}

function direction(d) {
    ipcRenderer.send('direction-chosen', d)

} 

directions = document.getElementsByClassName("direction")
for (i=0; i<directions.length; i++) {
    d = directions[i]
    d.addEventListener("click", function() {
        direction(this.id)
        event.stopPropagation()
    })
}

window.addEventListener('keyup', () => {
    switch(event.code) {
        case "Numpad1": direction('SW'); break;
        case "Numpad2": direction('S'); break;
        case "Numpad3": direction('SE'); break;
        case "Numpad4": direction('W'); break;
        case "Numpad6": direction('E'); break;
        case "Numpad7": direction('NW'); break;
        case "Numpad8": direction('N'); break;
        case "Numpad9": direction('NE'); break;
    }
})

function relPath(p) {
    var mp = path.join(rootDir, p)
    if(fs.existsSync(mp)) {
        return mp
    }    
    return p
}

ipcRenderer.on('setRoot', (event, dir) => {
    rootDir = dir
})

ipcRenderer.on('printText', (event, text) => {
    if(text) {
        console.log(event, text)
        add_p(sanitizeHtml(text))
    }
})

ipcRenderer.on('clearText', (event) => {
    document.getElementById('main-text').innerHTML = ""
})

ipcRenderer.on('showImage', (event, img) => {
    document.querySelector('#image-area img').src = relPath(img)
})

ipcRenderer.on('updateInventory', (event, items) => {
    inventory = document.getElementById('inventory-area')
    inventory.innerHTML = ""

    h = document.createElement('h4')
    h.className = 'list-header'
    h.innerHTML = 'Inventory'
    inventory.appendChild(h)

    for (i of items) {
        b = document.createElement('button')
        b.className = 'list-item w3-button'
        b.innerHTML = i
        inventory.appendChild(b)
    }
})