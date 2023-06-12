const swaggerAutogen = require('swagger-autogen')()

const outputFile = './docs/api_endpoints.json'
const endpointsFiles = ['./index.ts']

swaggerAutogen(outputFile, endpointsFiles)
