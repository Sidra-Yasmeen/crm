CRM Multi-Tenant Full Project (Scaffold)
========================================

This scaffold implements a comprehensive multi-tenant CRM skeleton with the following modules:
- Multi-tenant companies
- Authentication (JWT) and role-based access (admin/manager/agent/qa)
- Knowledgebase per company (CRUD)
- HR: employees, onboarding/offboarding, leave, payroll, payslips (PDF generation placeholder)
- Attendance & scheduling
- QA portal: agent evaluations and scorecards
- Billing & Invoices: create invoices, store them, and placeholder to generate PDF
- Reporting endpoints (aggregations per company)
- Non-voice integrations placeholders (email, Slack, WhatsApp)
- Admin portal and permissions scaffold

Important: This is a comprehensive scaffold (starter). It is NOT production hardened. You will need to:
- Configure environment variables in backend/.env
- Install dependencies for backend and frontend
- Run MySQL and import backend/schema.sql
- Extend modules with business logic and provider integrations (Twilio/Slack/SendGrid), and secure JWT secrets.

Quick start (developer)
-----------------------
1. Start MySQL and create a database, e.g. crm_db
2. Import `backend/schema.sql` and `backend/seed.sql`
3. Backend:
   cd backend
   npm install
   cp .env.example .env (edit values)
   npm run dev
4. Frontend:
   cd frontend
   npm install
   cp .env.example .env (edit VITE_API_URL)
   npm run dev
