const {app, Menu, dialog} = require('electron')
const {getMainWindow} = require('./main.js')

function chooseOpenGame() {
    dialog.showOpenDialog(getMainWindow(), {
        title: 'Select a game folder',
        properties: ['openDirectory']})
}

function saveGame() {
    dialog.showSaveDialog(getMainWindow(), {
        title: 'Save your current game'})
}

function loadGame() {
    dialog.showOpenDialog(getMainWindow(), {
        title: 'Load a saved game',
        properties: ['openFile']}) 
}

const template = [
    {
        label: 'File',
        submenu: [
            { label: 'Open game', click: chooseOpenGame },
            { label: 'Save game', click: saveGame },
            { label: 'Load game', click: loadGame },
            { role: 'close' }
        ]
    },
    {
        label: 'Edit',
        submenu: [
            { role: 'cut' },
            { role: 'copy' },
            { role: 'paste' }
        ]
    },
    {
        label: 'View',
        submenu: [
            { role: 'resetzoom' },
            { role: 'zoomin' },
            { role: 'zoomout' },
            { type: 'separator' },
            { role: 'togglefullscreen' },
            { role: 'toggledevtools' }
        ]
    }
]

const mainMenu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(mainMenu)