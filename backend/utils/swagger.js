import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Career Canvas API",
      version: "1.0.0",
      description: "API documentation for Career Canvas Project",
    },
    servers: [
      {
        url: "http://localhost:8000",
        description: "Local server",
      },
      {
        url: "https://career-canvas.onrender.com",
        description: "Production server",
      },
    ],
  },
  apis: ["./backend/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default swaggerSpec;