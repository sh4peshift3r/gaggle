
const {ipcMain} = require('electron')
const {getMainWindow, windowMessage} = require('./main.js')
const sanitizeHtml = require('sanitize-html');
const {VM, VMScript} = require('vm2')
const path = require('path')
const fs = require('fs')

const {Room} = require('./room.js')
const {Item} = require('./item.js')
const {Player} = require('./player.js')

let sandbox
let vm

class Game
{
    constructor(rootDir='.') {
        this.rootDir = rootDir
        this.world = {}
    }

    print(text) {
        text = sanitizeHtml(text)
        windowMessage('print-text', text)
    }

    showImage(img) {
        windowMessage('show-image', this.relPath(img))
    }

    relPath(p) {
        var mp = path.join(this.rootDir, p)
        if(fs.existsSync(mp)) {
            return mp
        }
        
        return p
    }
}

function loadFile(fn)
{
    console.log('loading ' + fn)
    vm.run(fs.readFileSync(fn, {encoding: 'utf8'}))
}

exports.loadGame = function(modulePath)
{
    game = new Game()
    player = new Player()

    sandbox = {
        modulePath,
        console,
        Room,
        Item,
        player,
        game,
        world: game.world
    }

    vm = new VM({sandbox})

    getMainWindow().webContents.send('clear-text')

    ext = path.extname(modulePath)
    if(ext === '.js') {
        sandbox.game.rootDir = path.dirname(modulePath)
        loadFile(modulePath)
    }
    else if(fs.statSync(modulePath).isDirectory()) {
        sandbox.game.rootDir = modulePath
        files = fs.readdirSync(modulePath)
        for(var i=0; i<files.length; i++) {
            fn = path.join(modulePath, files[i])
            ext = path.extname(fn)
            if(ext === '.js') {
                loadFile(fn) 
            }
        }
    }
}

exports.initGame = function()
{
    vm.run('initialize()')
}