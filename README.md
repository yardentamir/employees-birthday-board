# Employees Birthday Board API

[https://employees-birthday-board.netlify.app](https://employees-birthday-board.netlify.app)

employees' birthday board - see who has a birthday and send them a happy birthday

## Routs

Get:

```
/employeesWithBirthdays
/loadEmployeesWithWishes
/loadEmployees
/me
```

Post:

```
/login
/logOut
/logOutAll
/logBirthdayWish
```

## Pages

```
https://employees-birthday-board.netlify.app/#/login
https://employees-birthday-board.netlify.app/#/signUp
https://employees-birthday-board.netlify.app/#/board
```

## API Endpoints

### 1. Sign Up

**Endpoint:** `/signup`

- **Method:** POST
- **Description:** Create a new employee.

#### Request Body:

```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "password123",
  "birthDate": "1990-01-01"
}
```

#### cURL:

```
curl -X POST \
  https://employees-birthday-board.onrender.com/employee/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "password": "password123",
    "birthDate": "1990-01-01"
  }'
```

---

### 2. Login

**Endpoint:** `/login`

- **Method:** POST
- **Description:** Login an employee.

#### Request Body:

```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

#### cURL:

```
curl -X POST \
  https://employees-birthday-board.onrender.com/employee/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "password123"
  }'
```

---

### 3. Get Current User

**Endpoint:** `/me`

- **Method:** GET
- **Description:** Get details of the currently authenticated employee.
- **Authorization:** Bearer token required.

#### cURL:

```
curl -X GET \
  https://employees-birthday-board.onrender.com/employee/me \
  -H "Authorization: Bearer <your-token>"
```

---

### 4. Logout

**Endpoint:** `/logOut`

- **Method:** POST
- **Description:** Logout the current user.
- **Authorization:** Bearer token required.

#### cURL:

```
curl -X POST \
  https://employees-birthday-board.onrender.com/employee/logOut \
  -H "Authorization: Bearer <your-token>"
```

---

### 5. Logout from All Devices

**Endpoint:** `/logOutAll`

- **Method:** POST
- **Description:** Logout the current user from all devices.
- **Authorization:** Bearer token required.

#### cURL:

```
curl -X POST \
  https://employees-birthday-board.onrender.com/employee/logOutAll \
  -H "Authorization: Bearer <your-token>"
```

---

### 6. Load Employees with Birthdays

**Endpoint:** `/employeesWithBirthdays`

- **Method:** GET
- **Description:** Get employees who have birthdays today.
- **Authorization:** Bearer token required.

#### cURL:

```
curl -X GET \
  https://employees-birthday-board.onrender.com/employee/employeesWithBirthdays \
  -H "Authorization: Bearer <your-token>"
```

---

### 7. Log Birthday Wish

**Endpoint:** `/logBirthdayWish`

- **Method:** POST
- **Description:** Log a birthday wish for an employee.
- **Authorization:** Bearer token required.

#### Request Body:

```json
{
  "email": "recipient.email@example.com",
  "message": "Happy Birthday!"
}
```

#### cURL:

```
curl -X POST \
  https://employees-birthday-board.onrender.com/employee/logBirthdayWish \
  -H "Authorization: Bearer <your-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "recipient.email@example.com",
    "message": "Happy Birthday!"
  }'
```

---

### 8. Load Employees with Wishes

**Endpoint:** `/loadEmployeesWithWishes`

- **Method:** GET
- **Description:** Get employees along with their birthday wishes.

#### cURL:

```
curl -X GET \ https://employees-birthday-board.onrender.com/employee/loadEmployeesWithWishes
```

---

### 9. Load All Employees

**Endpoint:** `/loadEmployees`

- **Method:** GET
- **Description:** Get all employees.

#### cURL:

```
curl -X GET \ https://employees-birthday-board.onrender.com/loadEmployees
```
