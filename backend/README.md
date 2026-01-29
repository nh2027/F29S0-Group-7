# HEALIX Backend - Python Flask API

Health monitoring platform backend built with Flask and PostgreSQL.

## Project Structure

```
backend/
├── src/
│   ├── __init__.py                 # App factory
│   ├── config/                     # Configuration files
│   │   ├── __init__.py
│   │   ├── settings.py            # App settings
│   │   └── database.py            # Database config
│   ├── models/                     # SQLAlchemy models
│   │   ├── __init__.py
│   │   ├── user.py                # User model
│   │   ├── biomarker.py           # Biomarker readings
│   │   ├── appointment.py         # Appointments
│   │   ├── prescription.py        # Prescriptions
│   │   ├── device.py              # Devices
│   │   ├── alert.py               # Health alerts
│   │   ├── goal.py                # User goals
│   │   └── audit_log.py           # Audit logs
│   ├── controllers/                # Business logic
│   │   ├── __init__.py
│   │   ├── auth_controller.py     # Authentication
│   │   ├── biomarker_controller.py
│   │   ├── appointment_controller.py
│   │   ├── prescription_controller.py
│   │   ├── admin_controller.py    # Admin operations
│   │   └── export_controller.py   # PDF exports
│   ├── routes/                     # API endpoints
│   │   ├── __init__.py
│   │   ├── auth_routes.py
│   │   ├── biomarker_routes.py
│   │   ├── appointment_routes.py
│   │   ├── prescription_routes.py
│   │   ├── admin_routes.py
│   │   └── export_routes.py
│   ├── middleware/                 # Custom middleware
│   │   ├── __init__.py
│   │   ├── auth_middleware.py     # JWT verification
│   │   ├── authorization.py       # Role-based access
│   │   ├── error_handler.py       # Error handling
│   │   └── rate_limiter.py        # Rate limiting
│   └── utils/                      # Utility functions
│       ├── __init__.py
│       ├── audit_logger.py        # Audit logging
│       ├── pdf_generator.py       # PDF generation
│       ├── validators.py          # Input validation
│       ├── decorators.py          # Custom decorators
│       └── helpers.py             # Helper functions
├── migrations/                     # SQL migration files
│   ├── 001_create_users.sql
│   ├── 002_create_biomarkers.sql
│   ├── 003_create_appointments.sql
│   ├── 004_create_prescriptions.sql
│   ├── 005_create_devices.sql
│   ├── 006_create_provider_patient_relationships.sql
│   ├── 007_create_goals.sql
│   ├── 008_create_audit_logs.sql
│   └── 009_create_alerts.sql
├── tests/                          # Test files
│   ├── __init__.py
│   ├── test_auth.py
│   ├── test_biomarkers.py
│   └── test_admin.py
├── app.py                          # Main application entry point
├── wsgi.py                         # Production WSGI entry point
├── requirements.txt                # Python dependencies
├── .env.example                    # Environment template
├── .gitignore                      # Git ignore rules
└── README.md                       # This file
```

## Setup Instructions

### 1. Create Virtual Environment
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

### 3. Configure Environment
```bash
cp .env.example .env
# Edit .env with your configuration
```

### 4. Create Database
```bash
# PostgreSQL must be installed and running
createdb healix_db
```

### 5. Run Migrations
```bash
python migrations_runner.py
```

### 6. Run Development Server
```bash
python app.py
```

Server will start at: `http://localhost:5000`

## API Structure

- **Authentication:** POST `/api/auth/register`, `/api/auth/login`
- **Biomarkers:** GET/POST `/api/biomarkers/`, `/api/biomarkers/history`
- **Appointments:** GET/POST `/api/appointments/`
- **Prescriptions:** GET/POST `/api/prescriptions/`
- **Admin:** GET/DELETE `/api/admin/users/`, POST `/api/admin/providers`
- **Export:** POST `/api/export/patient-report`

## Database

PostgreSQL with the following tables:
- users (authentication & profiles)
- biomarker_readings (health data)
- appointments (scheduling)
- prescriptions (medical prescriptions)
- devices (wearable devices)
- provider_patient_relationships (access control)
- goals (health goals)
- alerts (health alerts)
- audit_logs (compliance tracking)

## Team Responsibilities

- **Kevin:** Project setup, database connection, infrastructure
- **Neil:** Database schema, appointments, prescriptions
- **Basheer:** Biomarker APIs, alerts, data aggregation
- **Arya:** Authentication, authorization, audit logs, PDF export

## Running Tests

```bash
pytest tests/
pytest --cov=src tests/  # With coverage
```

