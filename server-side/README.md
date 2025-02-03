# Zitouna Project Documentation

## API Routes and Controllers

### Base Endpoints
- **User Routes:** `/api/user`
- **Recipe Routes:** `/api/recipe`
- **Comment Routes:** `/api/recipe/:recipeId/comment`
- **Ingredient Routes:** `/api/ingredient`

## User Routes
| Method | Endpoint | Description | Middleware | Validators |
|--------|---------|-------------|------------|------------|
| POST   | `/api/user/register` | Register a new user | - | `userValidators` |
| POST   | `/api/user/login` | Authenticate a user | - | `userValidators` |
| GET    | `/api/user/profile` | Get current user profile | `authenticate` | - |
| PUT    | `/api/user/profile` | Update current user profile | `authenticate` | `userValidators` |

## Recipe Routes
| Method | Endpoint | Description | Middleware | Validators |
|--------|---------|-------------|------------|------------|
| POST   | `/api/recipe` | Create a new recipe | `authenticate`, `requireRole(["PREMIUM", "ADMIN"])` | `createRecipeValidator`, `validateRequest` |
| GET    | `/api/recipe` | Retrieve all recipes (supports category, name, and likes filtering) | - | - |
| GET    | `/api/recipe/:id` | Retrieve a single recipe by ID | - | - |
| PUT    | `/api/recipe/:id` | Update a recipe | `authenticate`, `requireRole(["PREMIUM", "ADMIN"])` | `updateRecipeValidator`, `validateRequest` |
| DELETE | `/api/recipe/:id` | Delete a recipe | `authenticate`, `requireRole(["PREMIUM", "ADMIN"])` | - |

## Comment Routes
| Method | Endpoint | Description | Middleware | Validators |
|--------|---------|-------------|------------|------------|
| GET    | `/api/recipe/:recipeId/comment` | Get comments for a recipe | - | - |
| POST   | `/api/recipe/:recipeId/comment` | Create a new comment | `authenticate` | `commentValidator`, `validateRequest` |
| PUT    | `/api/recipe/:recipeId/comment/:commentId` | Edit a comment | `authenticate` | `commentValidator`, `validateRequest` |
| DELETE | `/api/recipe/:recipeId/comment/:commentId` | Delete a comment | `authenticate` | - |

## Ingredient Routes
| Method | Endpoint | Description | Middleware | Validators |
|--------|---------|-------------|------------|------------|
| GET    | `/api/ingredient` | Retrieve all ingredients | - | - |
| POST   | `/api/ingredient` | Add a new ingredient | `authenticate` | - |
| DELETE | `/api/ingredient/:id` | Delete an ingredient | `authenticate` | - |
| DELETE | `/api/ingredient/recipe/:recipeId/ingredient/:recipeIngredientId` | Remove an ingredient from a recipe | `authenticate` | - |

## Middleware
- `authenticate`: Ensures the user is authenticated.
- `requireRole(["PREMIUM", "ADMIN"])`: Restricts access to users with specific roles.
- `validateRequest`: Validates the request body using the specified validator.

## Validators
- `userValidators`: Validates user registration and login requests.
- `createRecipeValidator`: Validates recipe creation requests.
- `updateRecipeValidator`: Validates recipe update requests.
- `commentValidator`: Validates comment creation and update requests.

## Error Handling
- **Global Error Handler:** Catches and responds with a 500 status for unexpected errors.
- **404 Handler:** Returns a 404 status for undefined routes.

## Key Notes
- **Nested Comments:** Comments are nested under recipes (`/api/recipe/:recipeId/comment`), which aligns with RESTful principles.
- **Role-Based Access:** Recipe creation, updates, and deletions are restricted to `PREMIUM` and `ADMIN` users.
- **Ingredient Management:** Ingredients can be added, deleted, or removed from recipes.
- **Validation:** All requests are validated using appropriate validators before processing.
- **Recipe Search:** Recipe retrieval supports filtering by `category`, `name`, and sorting by `likes`.

