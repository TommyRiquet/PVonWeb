/// <reference types="cypress" />

Cypress.Commands.add('login', (email: string, password: string) => {
	cy.visit('')
	cy.get('input[id="email"]').type(email)
	cy.get('input[id="password"]').type(password)
	cy.get('button[type="submit"]').click()

	cy.wait(1000)
})

Cypress.Commands.add('clickLink', (label) => {
	cy.get('a').contains(label).click()
})

Cypress.Commands.add('clickButton', (label) => {
	cy.get('button').contains(label).click()
})

Cypress.Commands.add('clickListItem', (label) => {
	cy.get('li').contains(label).click()
})

Cypress.Commands.add('clickSpan', (label) => {
	cy.get('span').contains(label).click()
})

Cypress.Commands.add('clickText', (label) => {
	cy.get('p').contains(label).click()
})
