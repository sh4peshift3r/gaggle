
const {getMainWindow} = require('./main.js')
const {WindowCommands} = require('./window.js')
const {VM} = require('vm2')
const path = require('path')
const fs = require('fs')


function loadFile(fn)
{
    console.log('loading ' + fn)
    exports.vm.run(fs.readFileSync(fn, {encoding: 'utf8'}))
}


exports.create = function(type, name, args)
{
    obj = new type(name, args)
    exports.world[name] = obj
    return obj
}


exports.loadGame = function(modulePath)
{
    mainWindow = getMainWindow()
    Room = require('./room.js')
    Item = require('./item.js')
    Player = require('./player.js')

    exports.player = new Player()
    exports.world = {}
    exports.win = new WindowCommands(mainWindow.webContents)

    sandbox = {
        modulePath,
        console,
        Room,
        Item,
        'create': exports.create,
        'player': exports.player,
        'world': exports.world,
        'win': exports.win,
    }

    exports.vm = new VM({sandbox})

    exports.win.clearText()
    
    ext = path.extname(modulePath)
    if(ext === '.js') {
        mainWindow.webContents.send('setRoot', path.dirname(modulePath))
        loadFile(modulePath)
    } 
    else if(fs.statSync(modulePath).isDirectory()) {
        mainWindow.webContents.send('setRoot', modulePath)
        for(var file of fs.readdirSync(modulePath)) {
            if(path.extname(file) === '.js') {
                loadFile(path.join(modulePath, file)) 
            }
        }
    }
}


exports.initGame = function()
{
    exports.vm.run('initialize()')
}

