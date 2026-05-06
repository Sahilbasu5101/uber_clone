# Captain Routes API Documentation

## POST /captain/register

Registers a new captain in the system. This endpoint creates a captain account with the provided details and returns an authentication token upon successful registration.

### Request

- **Headers:**
  - `Content-Type: application/json`
  - `Authorization: Bearer <token>` (if required for protected route)

- **Body:**
  - JSON object with the following fields:

```
{
  "fullName": {
    "firstname": "string (min 3 chars, required)",
    "lastname": "string (min 3 chars, required)"
  },
  "email": "string (valid email, required)",
  "password": "string (min 6 chars, required)",
  "vehicle": {
    "color": "string (min 3 chars, required)",
    "plate": "string (min 3 chars, required)",
    "capacity": "integer (min 1, required)",
    "vehicleType": "string (car, motorcycle, or auto, required)"
  }
}
```

#### Example

```
{
  "fullName": {
    "firstname": "test_captain_firstname",
    "lastname": "test_captain_lastname"
  },
  "email": "test_email@gmail.com",
  "password": "test_captain",
  "vehicle": {
    "color": "red",
    "plate": "MP 04 XY6204",
    "capacity": 3,
    "vehicleType": "car"
  }
}
```

### Responses

#### Success (201 Created)

- **Description:** Captain registered successfully. Returns the created captain object and a JWT token.
- **Example Response:**

```
{
    "captain": {
        "fullName": {
            "firstname": "test_captain_firstname",
            "lastname": "test_captain_lastname"
        },
        "email": "test_email@gmail.com",
        "password": "$2b$10$U6HJ.zurz2xFJ57b5bNkv.kvpjxpq6ygwlUyQJLDTkv2vinwmwkHi",
        "status": "inactive",
        "vehicle": {
            "color": "red",
            "plate": "MP 04 XY6204",
            "capacity": 3,
            "vehicleType": "car"
        },
        "_id": "69fb05c42bf59215ea970500",
        "__v": 0
    }
}
```

#### Validation Error (400 Bad Request)

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

#### Duplicate Email (400 Bad Request)

- **Description:** Captain with this email already exists.
- **Example Response:**

```
{
  "message": "Captain with this email already exists"
}
```

#### Missing Fields (400 Bad Request)

- **Description:** Required fields are missing in the request body.
- **Example Response:**

```
{
  "errors": [
    { "msg": "All fields are required" }
  ]
}
```

### Notes

- All fields are required.
- Email must be unique.
- Password is stored securely (hashed).
- Vehicle type must be one of: `car`, `motorcycle`, `auto`.
