const express = require('express');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const router = express.Router();

/**
  * @swagger
  * tags:
  * 
  * - name: Auth
  *   description: Auth Api
  *  
  * - name: Teachers
  *   description: The Teachers API
  *  
  * - name: Children
  *   description: The Children API
  * 
  * - name: Classes
  *   description: The Classes API
  * 
  * 
  */


const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Nursery Api',
        version: '1.0.0',
        description:"A Simple Nursery Api"
      },
      components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            }
        }
    },
    security: [{
        bearerAuth: []
    }]
    },
    apis: ['./Route/*.js']
  };

  const swaggerSpecs = swaggerJSDoc(options);

  router.use('/docs',swaggerUi.serve)
        .get('/docs',swaggerUi.setup(swaggerSpecs));

  module.exports = router;