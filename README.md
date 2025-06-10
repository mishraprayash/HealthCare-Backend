# HealthCare-Backend

## Project Description
HealthCare-Backend is a comprehensive Node.js-based backend application designed to manage doctor-patient relationships. It provides robust APIs for user authentication, doctor and patient management, and mapping between doctors and patients. The project follows a modular structure with controllers, services, models, and routes for better maintainability and scalability.

## Features
- **User Authentication**: Secure login and registration functionality.
- **CRUD Operations**: Full CRUD support for managing doctors and patients.
- **Doctor-Patient Mapping**: APIs to map doctors to patients and retrieve mappings.
- **Middleware**: Authentication, validation, and centralized error handling.
- **Clustered Server**: Utilizes Node.js clustering for improved performance in production.
- **Database Integration**: Sequelize ORM for database management with support for migrations and associations.
- **Standardized Responses**: Helper libraries for consistent API responses.
- **Environment Configuration**: Supports `.env` files for environment-specific configurations.

## Project Structure
```
app.js
package.json
README.md
server.js
config/
    database.js
controllers/
    auth.controller.js
    doctor.controller.js
    patient.controller.js
    patient-doctor-map.controller.js
lib/
    responseHelper.js
middleware/
    authMiddleware.js
    errorHandler.js
    validation.js
models/
    association.js
    doctor.js
    index.js
    patient.js
    PatientDoctorMapping.js
    user.js
routes/
    auth.route.js
    doctor.route.js
    patient.route.js
    patient-doctor-map.route.js
services/
    auth.service.js
    doctor.service.js
    patient.service.js
    patient-doctor-map.service.js
```

## Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)
- A relational database (e.g., PostgreSQL)

## Setup Instructions
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd DoctorPatient_MS
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure the database:
   - Update the database configuration in `config/database.js` with your database credentials.

4. Run database migrations (if applicable, not used in this project):
   ```bash
   npx sequelize-cli db:migrate
   ```

5. Start the server:
   ```bash
   npm run dev
   ```

6. The server will run on `http://localhost:3000` by default.

## API Endpoints
### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Patients
- `GET /api/patients` - Get all patients
- `POST /api/patients` - Add a new patient
- `PUT /api/patients/:id` - Update patient details
- `DELETE /api/patients/:id` - Delete a patient

### Doctors
- `GET /api/doctors` - Get all doctors
- `POST /api/doctors` - Add a new doctor
- `PUT /api/doctors/:id` - Update doctor details
- `DELETE /api/doctors/:id` - Delete a doctor

### Doctor-Patient Mapping
- `POST /api/mappings` - Map a doctor to a patient
- `GET /api/mappings` - Get all mappings

## Middleware
- `authMiddleware.js` - Handles authentication
- `validation.js` - Validates request payloads
- `errorHandler.js` - Centralized error handling

## Helper Libraries
- `responseHelper.js` - Standardized API responses

## Deployment
- **Development Mode**: Run the server using `npm run dev`.
- **Production Mode**: The server uses Node.js clustering for better performance. Ensure the `NODE_ENV` is set to `production`.

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes and push the branch.
4. Submit a pull request.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Contact
For any inquiries or support, please contact [mishraprayash00@gmail.com].
