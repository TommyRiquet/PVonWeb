import { defineConfig } from 'cypress'

export default defineConfig({
	e2e: {
		baseUrl: 'http://localhost:3000',
		pageLoadTimeout: 10000,
		requestTimeout: 10000,
		responseTimeout: 10000,
		video: false,
		screenshotOnRunFailure: false
	}
})
