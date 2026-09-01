const swaggerJSDoc = require('swagger-jsdoc');
const path = require('path');

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Job Application Tracker API",
      version: "1.0.0",
      description: "API documentation for Job Application Tracker",
    },
    paths: {
        "/applications": {
            get: {
                summary: "Get all applications",
                responses: {
                    200: {
                        description: "List of applications",
                    },
                },
            },
            post: {
                summary: "Create a new application",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    company: { type: "string" },
                                    position: { type: "string" },
                                    status: { type: "string" },
                                    notes: { type: "string" },
                                },
                                required: ["company", "position", "status"],
                            },
                        },
                    },
                },
                responses: {
                    201: {
                        description: "Application created successfully",
                    },
                },
            },
            put: {
                summary: "Update an application",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: {
                            type: "integer",
                        },
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    company: { type: "string" },
                                    position: { type: "string" },
                                    status: { type: "string" },
                                    notes: { type: "string" },
                                },
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "Application updated successfully",
                    },
                    404: {
                        description: "Application not found",
                    },
                },
            },  
            delete: {
                summary: "Delete an application",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: {
                            type: "integer",
                        },
                    },
                ],
                responses: {
                    200: {
                        description: "Application deleted successfully",
                    },
                    404: {
                        description: "Application not found",
                    },
                },
            },  
        },  
        "/interviews": {
            get: {
                summary: "Get all interviews",
                responses: {
                    200: {
                        description: "List of interviews",
                    },
                },
            },
            post: {
                summary: "Create a new interview",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    application_id: { type: "integer" },
                                    date: { type: "string", format: "date" },
                                    time: { type: "string", format: "time" },
                                    position: { type: "string" },
                                },
                                required: ["application_id", "date", "time", "position"],
                            },
                        },
                    },
                },
                responses: {
                    201: {
                        description: "Interview created successfully",
                    },
                },
            },
            patch: {
                summary: "Update an interview",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: {
                            type: "integer",
                        },
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    date: { type: "string", format: "date" },
                                    time: { type: "string", format: "time" },
                                    position: { type: "string" },
                                },
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "Interview updated successfully",
                    },
                    404: {
                        description: "Interview not found",
                    },
                },
            },
        },  
    },
    servers: [
      {
        url: "/",
        description: "Current server",
      },
    ],
  },
  apis: [path.join(__dirname, 'routes/*.js')],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

module.exports = swaggerSpec;