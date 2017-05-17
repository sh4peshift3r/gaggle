
const { ipcRenderer } = require('electron')

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

document.getElementById('player-area').addEventListener('click', toggleBorder)
document.getElementById('room-area').addEventListener('click', toggleBorder)

ipcRenderer.on('print-text', (event, arg) => {
    add_p(arg)
} )

ipcRenderer.on('show-image', (event, arg) => {
    document.querySelector('#image-area img').src = arg
} )