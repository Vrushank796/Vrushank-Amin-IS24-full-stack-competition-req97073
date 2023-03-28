//Import required libraries
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const productsRouter = require('./routes/products');

// Define Swagger options
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'IMB Products Tracking Web App API',
      version: '1.0.0',
      description: 'API documentation for the IMB Products Tracking Web App',
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Local server',
      },
    ],
  },
  apis: ['./routes/*.js'],
};

// Create Swagger specification
const specs = swaggerJsdoc(options);

//Create express app
const app = express();

//Define PORT number OR use .env file to set PORT
const PORT = 3000;

//Use Cross-origin-resource-sharing (CORS) middleware for client and server connection
app.use(cors());

//To parse request body
app.use(bodyParser.urlencoded({ extended: 'true' }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// Serve Swagger documentation
app.use('/api/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

//Using express router, so all endpoints would be originated from http://localhost:3000/api
app.use('/api', productsRouter);

//Handle Invalid API endpoints requests
app.get('*', (req, res) => {
  res.status(404).json('Error 404: Invalid URL please try again');
});

//Setup server -> Give success or error message in console log
try {
  app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
  });
} catch (err) {
  console.log('Connection error: ' + err);
}
