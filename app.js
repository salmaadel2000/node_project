const express = require("express");
const mongoose = require("mongoose");
const multer = require('multer');
const path = require('path');
const docsRoute = require("./Routes/docsRoute");
const teacherRoute = require("./Routes/teacherRoute");
const ChildRoute = require("./Routes/childRoute");
const mainRoute = require("./Routes/classRoute");
const login = require("./Routes/authentication");
const authenticationMW = require("./Midelwares/authenticationMw");
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require("swagger-ui-express");

const server = express();
const port = process.env.PORT || 8080;

// Swagger Options
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API Title',
      version: '1.0.0',
      description: 'Description of your API'
    },
    basePath: '/',
  },
  apis: ['./Routes/*.js'], // Specify the path to your route files
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Serve Swagger UI
server.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

mongoose.connect("mongodb://127.0.0.1:27017/itiNew")
  .then(() => {
    console.log("Connected to MongoDB");
    server.listen(port, () => {
      console.log("Server is listening on port", port);
    });
  })
  .catch((error) => {
    console.error("DB Connection Error:", error);
  });

// Middleware for logging requests
server.use((request, response, next) => {
  console.log(request.url, request.method);
  next();
});

// Middleware to parse JSON bodies
server.use(express.json());

// Serve static images
server.use('/images', express.static(path.join(__dirname, 'images')));

// Route handling
server.use(docsRoute);
server.use(login);
server.use(authenticationMW);
server.use(teacherRoute);
server.use(ChildRoute);
server.use(mainRoute);

// Not Found middleware
server.use((request, response, next) => {
  response.status(404).json({ data: "Not Found" });
});

// Error handling middleware
server.use((error, request, response, next) => {
  console.error("Error:", error);
  response.status(500).json({ data: "Internal Server Error" });
});
