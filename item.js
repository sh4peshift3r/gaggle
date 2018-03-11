module.exports = class Item
{
	constructor(name, args) {
		this.name = name
		this.location = undefined
		Object.assign(this, args)
	}

	describe() {
        game.win.printText(this.description)
    }

	examine() {
		if (this.image) {
			game.win.showImage(this.image)
		}
		this.describe()
	}

	moveTo(location) {
		this.location = location
	}
}