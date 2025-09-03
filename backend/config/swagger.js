import swaggerJsdoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Carbon Footprint Tracker API",
      version: "1.0.0"
    },
    servers: [{ url: "/api" }]
  },
  apis: ["./routes/*.js", "./models/*.js"]
});
