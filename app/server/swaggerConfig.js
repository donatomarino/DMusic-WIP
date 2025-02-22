import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentación",
      version: "1.0.0",
      description: "Documentación de la API con Swagger para la app DMusic",
      contact: {
        name: "Donato Marino, +697651148",
      },
    },
    servers: [
      {
        url: "http://localhost:5001", // Cambia la URL si tu servidor está en otro puerto
      },
    ],
  },
  apis: ["./routes/routes.js"], // Archivos donde se encuentran los comentarios para Swagger
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
export { swaggerDocs, swaggerUi };