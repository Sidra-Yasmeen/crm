USE crm_db;
INSERT INTO companies (name,slug,billing_rate) VALUES ('Sample Co','sample-co',100);
INSERT INTO users (company_id,name,email,password_hash,role)
VALUES (1,'Admin','admin@example.com','$2a$10$7QIrMCCKkxMByO9h2Mz8rOQgAn2e5BZnMPsyM9ZLwG./c7lT77GeC','admin'); -- password: password
INSERT INTO kb_articles (company_id,title,content,tags,created_by) VALUES (1,'Welcome','<p>Welcome to Sample Co knowledgebase.</p>','welcome',1);
INSERT INTO employees (company_id,name,email,position,hire_date,salary) VALUES (1,'John Doe','john@example.com','Agent','2024-01-01',800);
