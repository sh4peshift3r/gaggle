const {app, Menu, dialog} = require('electron')
const {getMainWindow} = require('./main.js')
const {loadGame, initGame} = require('./game.js')


function newGameMenu() {
    modulePath = dialog.showOpenDialog(getMainWindow(), {
        title: 'Select a game to open',
        properties: ['openDirectory', 'openFile']})
    if(modulePath && modulePath.length === 1) {
        loadGame(modulePath[0])
        initGame()
    }
}

function saveGameMenu() {
    fn = dialog.showSaveDialog(getMainWindow(), {
        title: 'Save your current game'})
}

function loadGameMenu() {
    fn = dialog.showOpenDialog(getMainWindow(), {
        title: 'Load a saved game',
        properties: ['openFile']
    })
}

const template = [
    {
        label: 'File',
        submenu: [
            { label: 'New game', click: newGameMenu, accelerator: 'CmdOrCtrl+N' },
            { label: 'Save game', click: saveGameMenu },
            { label: 'Load game', click: loadGameMenu },
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