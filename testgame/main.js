
function initialize()
{
    win.printText('Welcome to the castle!')

    create(Room, 'courtyard', {
        image: 'castle.jpg',
        description: 'You are standing in the courtyard'
    })

    create(Room, 'entranceRoom')
    	.connect('courtyard', 'S')

    create(Room, 'welcomeHall')
    	.connect('entranceRoom', 'S')

    create(Item, 'chalice', {
    	description: 'A golden chalice',
    	image: 'chalice.jpg'
    }).moveTo('welcomeHall')
    
    player.moveTo('courtyard')

}
