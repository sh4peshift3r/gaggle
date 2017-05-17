
const {ipcMain} = require('electron')
const {getMainWindow} = require('./main.js')
const sanitizeHtml = require('sanitize-html');

class Game
{
    print(text) {
        text = sanitizeHtml(text)
        getMainWindow().webContents.send('print-text', text)
    }

    showImage(img) { 
        getMainWindow().webContents.send('show-image', img)
    }
}

ipcMain.on('direction-chosen', (event, arg) => {
    console.log(arg)
    new Game().showImage('woman.png')
    getMainWindow().webContents.send('print-text', arg)
})


