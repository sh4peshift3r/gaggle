const game = require('./game.js')


module.exports = class Player
{
	constructor() {
		this.name = 'player'
    }

    moveTo(room) {
        game.world[room].onPlayerEnter()
    	this.room = room
    }

    travel(direction) {
        this.moveTo(game.world[this.room].connections[direction])
    }
}
