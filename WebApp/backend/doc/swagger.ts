const swaggerAutogen = require('swagger-autogen')()

const outputFile = './doc/api_endpoints.json'
const endpointsFiles = ['./index.ts']

swaggerAutogen(outputFile, endpointsFiles)
