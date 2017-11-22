directions = {
    'N': 'S',
    'NE': 'SW',
    'E': 'W',
    'SE': 'NW',
    'S': 'N',
    'SW': 'NE',
    'W': 'E',
    'NW': 'SE'
}

class Room
{
    constructor(args) {
        this.connections = {}
        Object.assign(this, args)
    }

    connect(room, direction, backDirection=undefined) {
        if(backDirection === undefined) {
            backDirection = reverseDirections[direction]
        }

        this.connections[direction] = room
        if(backDirection) {
            room.connections[backDirection] = this
        }
    }

    describe(room) {
        if(this.description) {
            sandbox.game.print(this.description)
        }
    }

    onPlayerEnter() {
        if(this.image) {
            sandbox.game.showImage(this.image)
        }
        
        this.describe()
    }
}