const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Ultimate Members API',
      version: '1.0.0',
      description: 'Documentação da API para a Ultimate Members',
      contact: {
        name: 'Felipe',
        email: 'contato@simplifyweb.com.br',
      },
    },
    servers: [
      {
        url: 'https://ultimatemembers-api-rest-node.onrender.com',
        description: 'Servidor Local',
      },
    ],
    components: {
      securitySchemes: {
        jwt: {
          type: 'apiKey',
          in: 'header',
          name: 'Authorization',
          description: 'Insira o token JWT no formato "Bearer <token>"',
        },
      },
    },
  },
  apis: ['./routes/*.js'], // Apontar para onde estão as rotas da API
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = swaggerDocs;
