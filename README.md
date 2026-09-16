Registration API
1. Create Registration

POST

http://localhost:8000/api/registrations


No API key required.

Body
{
  "firstName": "John",
  "lastName": "Doe",
  "gender": "male",
  "dateOfBirth": "1998-05-15",
  "parentFirstName": "Robert",
  "email": "john.postman@example.com",
  "pinCode": "400001",
  "country": "India",
  "timeZone": "Asia/Kolkata",
  "phoneNumber": "+919876543210",
  "seriesName": "Frontend Architecture",
  "festival": "React Summit",
  "eventDate": "2026-10-15",
  "eventTime": "14:30",
  "subscribePosts": "yes"
}


Expected: 201 Created

2. Get All Registrations

GET

http://localhost:8000/api/registrations

Header
x-api-key: my_super_secret_admin_key_2026


Expected: 200 OK

3. Update Registration

PATCH

http://localhost:8000/api/registrations/<id>


Replace <id> with the MongoDB _id.

Header
x-api-key: my_super_secret_admin_key_2026

Body
{
  "firstName": "Jonathan"
}


Expected: 200 OK