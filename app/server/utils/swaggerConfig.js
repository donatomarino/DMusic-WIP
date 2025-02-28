import swaggerJsDoc from "swagger-jsdoc";
import YAML from 'yamljs';
import path from 'path';
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const loginSwagger = YAML.load(path.resolve(__dirname, './Swagger/login.yaml'));
const registerSwagger = YAML.load(path.resolve(__dirname, './Swagger/register.yaml'));
const interactionsMySql = YAML.load(path.resolve(__dirname, './Swagger/interactions.mysql.yaml'));
const interactionsMongo = YAML.load(path.resolve(__dirname, './Swagger/interactions.mongo.yaml'));

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "DMusic - API Documentación",
      version: "1.0.0",
      description: "Documentación de la API con Swagger",
      contact: {
        name: "Donato Marino",
        email: "donato_8@icloud.com"
      },
    },
    tags: [
      { name: 'Login', description: 'Operaciones relacionadas al login'},
      { name: 'Register', description: 'Operaciones relacionadas al registro'},
      { name: 'Interacciones MySQL', description: 'Operaciones relacionadas a las acciones del usuario'},
      { name: 'Interacciones Mongo', description: 'Operaciones relacionadas a las acciones del usuario'}
    ],
    servers: [
      {
        url: "http://localhost:5001", // Cambia la URL si tu servidor está en otro puerto
      },
    ],
  },
  apis: ["./utils/Swagger/*.yaml"],
};

const swaggerDocs = swaggerJsDoc({
  ...swaggerOptions,
definition: {
  ...swaggerOptions.definition,
  paths: {
    ...loginSwagger.paths,
    ...registerSwagger.paths,
    // ...interactionsMySql.paths
  },
}});
export default swaggerDocs;