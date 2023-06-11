const generateRandomLink = () => {

	var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
	var linkLength = Math.floor(Math.random() * 6) + 12
	var link = ''

	for (var i = 0; i <= linkLength; i++) {
		var randomNumber = Math.floor(Math.random() * chars.length)
		link += chars.substring(randomNumber, randomNumber +1)
	}

	return link
}

module.exports = {
	generateRandomLink
}
