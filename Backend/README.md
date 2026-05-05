
# /user/profile Endpoint Documentation

## Endpoint

`GET /user/profile`

## Description

Fetches the authenticated user's profile information. Requires a valid JWT token in the Authorization header.

## Request

- **Headers:**
  - `Authorization: Bearer <token>`

## Responses

### Success (200 OK)

- **Description:** Returns the authenticated user's profile.
- **Example Response:**

```
{
  "user": {
    "_id": "6638e1f2c8a4b2e1a1b2c3d4",
    "fullName": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

### Unauthorized (401 Unauthorized)

- **Description:** Missing or invalid token.
- **Example Response:**

```
{
  "error": "Unauthorized"
}
```

# /user/logout Endpoint Documentation

## Endpoint

`POST /user/logout`

## Description

Logs out the authenticated user. Typically, this involves clearing the authentication token on the client side. The server may also clear cookies if used.

logout the current user and blacklist the token provided in cookie in cookie or headers

## Request

- **Headers:**
  - `Authorization: Bearer <token>` (if required)

### Authentication 
Requires a valid token in the Authorization header or cookie.

## Responses

### Success (200 OK)

- **Description:** User logged out successfully.
- **Example Response:**

```
{
  "message": "Logged out successfully"
}
```

### Unauthorized (401 Unauthorized)

- **Description:** Missing or invalid token.
- **Example Response:**

```
{
  "error": "Unauthorized"
}
```

# /user/login Endpoint Documentation

## Endpoint

`POST /user/login`

## Description

Authenticates a user with email and password. Returns the user object and a JWT token if credentials are valid.

## Required Data (Request Body)

The request body must be a JSON object with the following fields:

```
{
  "email": "string (valid email, required)",
  "password": "string (required)"
}
```

### Example

```
{
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

## Responses

### Success (200 OK)

- **Description:** User authenticated successfully. Returns the user object and a JWT token.
- **Example Response:**

```
{
  "user": {
    "_id": "6638e1f2c8a4b2e1a1b2c3d4",
    "fullName": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjM4ZTFmMmM4YTRiMmUxYTFiMmMzZDQiLCJpYXQiOjE2ODMzNjQwMDAsImV4cCI6MTY4MzM2NzYwMH0.abc123def456..."
}
```

### Invalid Credentials (401 Unauthorized)

- **Description:** Email or password is incorrect.
- **Example Response:**

```
{
  "error": "Invalid email or password"
}
```

### Validation Error (400 Bad Request)

- **Description:** Invalid input data. Returns an array of validation errors.
- **Example Response:**

```
{
  "errors": [
    { "msg": "Invalid email address", "param": "email", "location": "body" },
    { "msg": "Password is required", "param": "password", "location": "body" }
  ]
}
```

## Endpoint

# /users/register Endpoint Documentation

`POST /users/register`

## Description

Registers a new user in the system. This endpoint creates a user account with the provided details and returns an authentication token upon successful registration.

## Required Data (Request Body)

The request body must be a JSON object with the following fields:

```
{
  "fullName": {
    "firstname": "string (min 3 chars, required)",
    "lastname": "string (min 3 chars, required)"
  },
  "email": "string (valid email, required)",
  "password": "string (min 6 chars, required)"
}
```

### Example

```
{
  "fullName": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

## Responses

### Success (201 Created)

- **Description:** User registered successfully. Returns the created user object and a JWT token.
- **Example Response:**

```
{
  "user": {
    "_id": "6638e1f2c8a4b2e1a1b2c3d4",
    "fullName": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjM4ZTFmMmM4YTRiMmUxYTFiMmMzZDQiLCJpYXQiOjE2ODMzNjQwMDAsImV4cCI6MTY4MzM2NzYwMH0.abc123def456..."
}
```

### Validation Error (400 Bad Request)

- **Description:** Invalid input data. Returns an array of validation errors.
- **Example Response:**

```
{
  "errors": [
    { "msg": "Invalid email address", "param": "email", "location": "body" },
    { "msg": "First name must be at least 3 characters long", "param": "fullName.firstname", "location": "body" },
    { "msg": "Password must be at least 6 characters long", "param": "password", "location": "body" }
  ]
}
```

### Missing Fields (400 Bad Request)

- **Description:** Required fields are missing in the request body.
- **Example Response:**

```
{
  "errors": [
    { "msg": "All fields are required" }
  ]
}
```

## Notes

- All fields are required.
- Email must be unique.
- Password is stored securely (hashed).
