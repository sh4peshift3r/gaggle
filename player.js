class Player
{
    moveTo(room) {
        this.room = room
        this.room.onPlayerEnter()
    }

    travel(direction) {
        this.moveTo(this.room.connections[direction])
    }
}