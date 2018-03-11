const game = require('./game')

reverseDirections = {
    'N': 'S',
    'NE': 'SW',
    'E': 'W',
    'SE': 'NW',
    'S': 'N',
    'SW': 'NE',
    'W': 'E',
    'NW': 'SE'
}

module.exports = class Room
{
    constructor(name, args) {
        this.name = name
        this.connections = {}
        Object.assign(this, this.getDefaults())
        Object.assign(this, args)
    }

    getDefaults() {
        return {}
    }

    connect(room, direction, backDirection=undefined) {
        direction = direction.toUpperCase()

        if(backDirection === undefined) {
            backDirection = reverseDirections[direction]
        }

        this.connections[direction] = room
        if(backDirection) {
            game.world[room].connections[backDirection] = this.name
        }
        return this
    }

    describe() {
        game.win.printText(this.description)
    }

    examine() {
        if(this.image) {
            game.win.showImage(this.image)
        }
        
        this.describe()
    }

    onPlayerEnter() {
        game.win.showImage(this.image)
        this.describe()
    }
}