const utils = require('../utils/utils')

describe('Random link generator', () => {

	it('Should return a string', () => {
		expect(typeof utils.generateRandomLink()).toBe('string')
	})

	it('Should return a string of length between 12 and 18', () => {
		expect(utils.generateRandomLink().length).toBeGreaterThanOrEqual(12)
		expect(utils.generateRandomLink().length).toBeLessThanOrEqual(18)
	})

	it('Should return a string of length 18 with only alphanumeric characters', () => {
		expect(utils.generateRandomLink()).toMatch(/^[a-zA-Z0-9]+$/)
	})

	it('Should return a unique string each time', () => {
		const link1 = utils.generateRandomLink()
		const link2 = utils.generateRandomLink()
		expect(link1).not.toBe(link2)
	  })

	  it('Should not contain any special characters', () => {
		const link = utils.generateRandomLink()
		expect(link).not.toMatch(/[!@#$%^&*(),.?":{}|<>]/)
	  })

	  it('Should not contain any whitespace characters', () => {
		const link = utils.generateRandomLink()
		expect(link).not.toMatch(/\s/)
	  })

	  it('Should return a string with at least one uppercase character', () => {
		const link = utils.generateRandomLink()
		expect(link).toMatch(/[A-Z]/)
	  })

	  it('Should return a string with at least one lowercase character', () => {
		const link = utils.generateRandomLink()
		expect(link).toMatch(/[a-z]/)
	  })

	  it('Should return a string with at least one digit', () => {
		const link = utils.generateRandomLink()
		expect(link).toMatch(/[0-9]/)
	  })

})

describe('Link extractor function', () => {

	it('Should return the last part of the link', () => {
	  const link = 'https://www.example.com/images/photo.jpg'
	  expect(utils.getLink(link)).toBe('photo')
	})

	it('Should return an empty string for an empty link', () => {
	  const link = ''
	  expect(utils.getLink(link)).toBe('')
	})

	it('Should return the file name without extension', () => {
	  const link = 'C:/Users/user/Documents/file.txt'
	  expect(utils.getLink(link)).toBe('file')
	})

	it('Should handle links with multiple slashes', () => {
	  const link = 'server/share/folder/file.png'
	  expect(utils.getLink(link)).toBe('file')
	})

	it('Should handle links with mixed slashes', () => {
	  const link = 'C:/Users\\user/Documents/file.txt'
	  expect(utils.getLink(link)).toBe('file')
	})

	it('Should handle links without a file extension', () => {
	  const link = 'https://www.example.com/page'
	  expect(utils.getLink(link)).toBe('page')
	})

	it('Should handle links with no path', () => {
	  const link = 'https://www.example.com/'
	  expect(utils.getLink(link)).toBe('')
	})

	it('Should handle links with only a file name', () => {
	  const link = 'file.jpg'
	  expect(utils.getLink(link)).toBe('file')
	})

	it('Should handle links with special characters in the file name', () => {
	  const link = 'https://www.example.com/images/file%20name%23.txt'
	  expect(utils.getLink(link)).toBe('file%20name%23')
	})

})
