import userSwagger from './userSwagger';
// import commentSwagger from './commentSwagger';
// import recipeSwagger from './recipeSwagger';

const swaggerDocs = {
    openapi: '3.0.0',
    info: {
        title: 'API Documentation',
        version: '1.0.0',
        description: 'API documentation for User, Comments, and Recipes',
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Development server',
        },
    ],
    paths: {
        ...userSwagger,
        // ...commentSwagger,
        // ...recipeSwagger,
    },
};

export default swaggerDocs;
