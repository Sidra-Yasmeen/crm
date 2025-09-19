-- CRM Full schema
CREATE DATABASE IF NOT EXISTS crm_db;
USE crm_db;

-- Companies (tenants)
CREATE TABLE IF NOT EXISTS companies (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE,
  billing_rate DECIMAL(12,2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Roles & permissions (simple role enum used; extend as needed)
-- Users (agents/admins). Each user belongs to a company.
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  company_id INT,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  password_hash VARCHAR(255),
  role ENUM('admin','manager','agent','qa') DEFAULT 'agent',
  is_active TINYINT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE SET NULL
);

-- Knowledgebase articles per company
CREATE TABLE IF NOT EXISTS kb_articles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  company_id INT,
  title VARCHAR(255),
  content TEXT,
  tags VARCHAR(255),
  created_by INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE
);

-- HR: employees, payroll, leaves
CREATE TABLE IF NOT EXISTS employees (
  id INT AUTO_INCREMENT PRIMARY KEY,
  company_id INT,
  name VARCHAR(255),
  email VARCHAR(255),
  position VARCHAR(255),
  hire_date DATE,
  salary DECIMAL(12,2),
  is_active TINYINT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS payroll_runs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  company_id INT,
  period_start DATE,
  period_end DATE,
  total_amount DECIMAL(14,2),
  status ENUM('draft','processed','paid') DEFAULT 'draft',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS payslips (
  id INT AUTO_INCREMENT PRIMARY KEY,
  payroll_run_id INT,
  employee_id INT,
  company_id INT,
  gross DECIMAL(12,2),
  tax DECIMAL(12,2),
  net DECIMAL(12,2),
  data JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (payroll_run_id) REFERENCES payroll_runs(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS leaves (
  id INT AUTO_INCREMENT PRIMARY KEY,
  employee_id INT,
  company_id INT,
  start_date DATE,
  end_date DATE,
  type VARCHAR(50),
  status ENUM('pending','approved','rejected') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Attendance
CREATE TABLE IF NOT EXISTS attendance (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  company_id INT,
  check_in DATETIME,
  check_out DATETIME,
  date DATE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- QA evaluations
CREATE TABLE IF NOT EXISTS qa_reviews (
  id INT AUTO_INCREMENT PRIMARY KEY,
  company_id INT,
  agent_id INT,
  evaluator_id INT,
  score INT,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Invoices & billing
CREATE TABLE IF NOT EXISTS invoices (
  id INT AUTO_INCREMENT PRIMARY KEY,
  company_id INT,
  invoice_no VARCHAR(100),
  amount DECIMAL(12,2),
  currency VARCHAR(10) DEFAULT 'USD',
  description TEXT,
  issued_at DATE,
  due_at DATE,
  data JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Reports (store precomputed payload)
CREATE TABLE IF NOT EXISTS reports (
  id INT AUTO_INCREMENT PRIMARY KEY,
  company_id INT,
  name VARCHAR(255),
  payload JSON,
  generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
