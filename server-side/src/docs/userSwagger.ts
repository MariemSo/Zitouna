const userSwagger = {
    '/api/users/register': {
        post: {
            summary: 'Register a new user',
            tags: ['User'],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                firstName: { type: 'string', example: 'John' },
                                lastName: { type: 'string', example: 'Doe' },
                                email: { type: 'string', example: 'john.doe@example.com' },
                                password: { type: 'string', example: 'password123' },
                            },
                        },
                    },
                },
            },
            responses: {
                201: {
                    description: 'User registered successfully',
                },
            },
        },
    },
    '/api/users/{userId}': {
        get: {
            summary: 'Get user by ID',
            tags: ['User'],
            parameters: [
                {
                    name: 'userId',
                    in: 'path',
                    required: true,
                    schema: { type: 'string' },
                },
            ],
            responses: {
                200: {
                    description: 'User retrieved successfully',
                },
            },
        },
    },
};

export default userSwagger;
