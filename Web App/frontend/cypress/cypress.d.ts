declare namespace Cypress {
	interface Chainable {
		login(email: string, password: string): void
		clickLink(label: string): void
		clickButton(label: string): void
		clickListItem(label: string): void
		clickSpan(label: string): void
		clickIcon(label: string): void
		clickText(label: string): void
	}
}
