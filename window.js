const electron = require('electron')
const sanitizeHtml = require('sanitize-html')

let _webContents = new WeakMap()

exports.WindowCommands = class
{
    constructor(webContents) {
        var commands = [
            'printText',
            'clearText',
            'showImage',
        ]

        for (var command of commands) {
            this[command] = webContents.send.bind(webContents, command)
        }
    }
}

exports.createWindow = function()
{
    maximize = false
    windowParams = {width: 800, height: 600}

    displays = electron.screen.getAllDisplays()
    if (displays.length > 1) {
        windowParams = displays[1].workArea
        maximize = true
    }

    win = new electron.BrowserWindow(windowParams)

    if (maximize) {
        win.maximize()
    }

    return win
}