import { user } from '../fixtures/config'

beforeEach(() => {
	cy.visit('')
})


describe('Page renders', () => {

	context('Menu Items Pages ', () => {

		beforeEach(() => {
			cy.login(user.email, user.password)

		})

		it('should display the Dashboard', () => {
			cy.get('.MuiSvgIcon-root[data-testid="DashboardIcon"]').click()
			cy.clickText('Dashboard')
			cy.url().should('include', '/dashboard')
		})

		it('should display the Documents List', () => {
			cy.get('.MuiSvgIcon-root[data-testid="DescriptionIcon"]').click()
			cy.clickText('Documents')
			cy.url().should('include', '/transcript')
		})

		it('should display the Team List', () => {
			cy.get('.MuiSvgIcon-root[data-testid="GroupsIcon"]').click()
			cy.clickText('Team')
			cy.url().should('include', '/team')
		})

		it('should display the Profil Page', () => {
			cy.get('.MuiSvgIcon-root[data-testid="PersonIcon"]').click()
			cy.clickText('Profil')
			cy.url().should('include', '/profil')
		})

		it('should display the Settings List', () => {
			cy.get('.MuiSvgIcon-root[data-testid="SettingsIcon"]').click()
			cy.clickText('Settings')
			cy.url().should('include', '/settings')
		})

	})

})
