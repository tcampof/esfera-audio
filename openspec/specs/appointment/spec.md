# appointment Specification

## Purpose
Reserva de cita en tienda (demo de producto o proyecto de integración) como canal de asesoramiento del MVP.

## Requirements

### Requirement: Appointment form fields
The system SHALL provide an appointment form with name, email, phone, preferred date, reason (product demo / project / other), and message, validated with Zod (or explicit equivalent).

#### Scenario: Required fields
- **WHEN** the visitor submits without email or phone
- **THEN** the submission is rejected with validation errors

### Requirement: Optional product context
The appointment flow SHALL accept an optional product of interest when started from a product detail page.

#### Scenario: Prefill from PDP
- **WHEN** the visitor starts “Reservar demo” from a product page
- **THEN** the appointment form includes that product as context when submitted

### Requirement: Confirmation and delivery stub
On successful validation the system SHALL show a confirmation UI and send the request via the configured stub/API/email path (e.g. toward `info@esfera-audio.com`).

#### Scenario: Success confirmation
- **WHEN** a valid appointment is submitted
- **THEN** the visitor sees a clear confirmation message
