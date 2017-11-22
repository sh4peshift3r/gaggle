
function initialize()
{
	game.print('Welcome to the castle!')
	// game.showImage('castle.jpg')

	world.courtyard = new Room({
		image: 'castle.jpg'
	})
	
	world.entranceRoom = new Room()
	world.welcomeHall = new Room()

	world.courtyard.connect('entranceRoom', 'N')
	world.entranceRoom.connect('welcomeHall', 'N')

	player.moveTo('courtyard')
}
