import { user } from '../fixtures/config'

beforeEach(() => {
	cy.visit('')
})

describe('Auth Testing', () => {

	context('Login', () => {

		it('connects', () => {

			cy.login(user.email, user.password)
			cy.url().should('include', '/dashboard')

		})

		it('display an error when using the wrong credentials', () => {

			cy.login(user.email, 'WrongPassword')
			cy.get('button[type="submit"]').click()

			cy.get('.MuiAlert-message').contains('Invalid credentials')
		})
	})

	context('Automatic Login', () => {
		it('redirect the user if a token is in the localStorage', () => {

			cy.window().then((win) => {
				win.localStorage.setItem('token', '123')
			})

			cy.reload()

			cy.url().should('include', '/dashboard')
		})
	})

})
