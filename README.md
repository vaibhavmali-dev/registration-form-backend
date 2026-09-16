# Job Application Form API

A secure Node.js, Express, and MongoDB backend built to support a complex, multi-step job application form. It features strict payload validation, NoSQL injection protection, and protected CRUD endpoints.

## Tech Stack
* **Runtime:** Node.js
* **Framework:** Express.js (v5)
* **Database:** MongoDB & Mongoose
* **Validation:** Zod
* **Security:** Helmet, express-rate-limit, express-mongo-sanitize, CORS

---

## Local Setup

1. **Clone and install dependencies:**
   ```bash
   npm install
   ```

2. **Environment Variables:**
   Create a `.env` file in the root directory and add the following:
   ```env
   PORT=8000
   NODE_ENV=development
   MONGODB_URI=your_mongodb_connection_string
   FRONTEND_URL=http://localhost:5173
   API_KEY=your_secret_api_key_here
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   The server will start at `http://localhost:8000`.

---

## API Documentation

### Public Endpoints

#### 1. Submit Application
**Endpoint:** `POST /api/registrations`

**Description:** Creates a new job application record. Validated strictly against the Zod schema.

**Body:**
```json
{
  "firstName": "String (Required)",
  "lastName": "String (Optional)",
  "email": "String (Required, Unique)",
  "phoneNumber": "String (Required)",
  "city": "String (Required)",
  "highestEducation": "Enum [bachelors, masters, phd, diploma, other]",
  "currentRole": "String (Required)",
  "yearsOfExperience": "Enum [fresher, 0_1, 1_3, 3_5, 5_plus]",
  "primarySkill": "String (Required)",
  "expectedCTC": "String (Required)",
  "noticePeriod": "Enum [immediate, 15_days, 30_days, 60_days, 90_days]",
  "workSetup": "Enum [remote, hybrid, onsite]",
  "willingToRelocate": "Boolean"
}
```
**Success Response:** `201 Created`

#### 2. Check Email Uniqueness
**Endpoint:** `POST /api/registrations/check-email`

**Description:** Proactively checks if an email is already in the database (used for frontend step validation).

**Body:**
```json
{
  "email": "applicant@example.com"
}
```
**Success Response:** `200 OK`
```json
{
  "status": "success",
  "exists": true
}
```

---

### Protected Endpoints (Admin)
Note: All endpoints below require the custom API Key in the headers.

**Headers required:**
`x-api-key: your_secret_api_key_here`

#### 3. Get All Applications
**Endpoint:** `GET /api/registrations`

**Description:** Fetches all submitted job applications, sorted by newest first.

**Success Response:** `200 OK` (Array of objects)

#### 4. Get Application by ID
**Endpoint:** `GET /api/registrations/:id`

**Description:** Fetches a specific application record.

**Success Response:** `200 OK`

#### 5. Update Application
**Endpoint:** `PATCH /api/registrations/:id`

**Description:** Partially updates an existing application.

**Body:** Any field from the submission schema.

**Success Response:** `200 OK`

#### 6. Delete Application
**Endpoint:** `DELETE /api/registrations/:id`

**Description:** Permanently removes an application from the database.

**Success Response:** `200 OK`

---

## Security Features

* **Rate Limiting:** Global limit of 100 requests per 15 minutes to prevent spam.
* **NoSQL Injection Prevention:** Custom implementation of express-mongo-sanitize on request body and parameters.
* **Data Sanitization:** Strict typing and formatting via Zod middleware before database interaction.