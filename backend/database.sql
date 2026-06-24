-- database.sql for Luminal Systems
CREATE DATABASE IF NOT EXISTS mexant_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE mexant_db;

-- 1. Services Table
DROP TABLE IF EXISTS services;
CREATE TABLE IF NOT EXISTS services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    icon VARCHAR(50) NOT NULL,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    features TEXT NOT NULL -- Semi-colon separated list of features
);

INSERT INTO services (icon, title, description, features) VALUES
('Cpu', 'IT Consulting', 'Strategic advisory services to help align technology with business goals and streamline enterprise architectures.', 'Tech Auditing;Strategy Development;Architecture Design;System Integration'),
('Shield', 'Cyber Security', 'Comprehensive protection strategies including assessments, monitoring, and network hardening to protect sensitive data.', 'Vulnerability Scanning;24/7 Security Monitoring;Compliance Auditing;Incident Response'),
('Cloud', 'Cloud Operations', 'Seamless cloud migrations, hybrid deployments, cost optimization, and automated DevOps CI/CD pipeline setups.', 'AWS/Azure Migrations;Cost Optimization;Kubernetes Management;DevOps Automation'),
('Rocket', 'Digital Strategy', 'Innovative solutions to accelerate product design, custom software planning, and UI/UX optimization for engagement.', 'UI/UX Enhancement;Product Roadmapping;Agile Training;Scalability Diagnostics');

-- 2. Core Values Table
DROP TABLE IF EXISTS core_values;
CREATE TABLE IF NOT EXISTS core_values (
    id INT AUTO_INCREMENT PRIMARY KEY,
    icon VARCHAR(50) NOT NULL,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL
);

INSERT INTO core_values (icon, title, description) VALUES
('Lightbulb', 'Innovation First', 'Constantly pushing technological boundaries to design next-generation enterprise systems.'),
('Users', 'Client Collaboration', 'Working side-by-side with partners to solve complex process challenges transparently.'),
('Award', 'Uncompromising Integrity', 'Adhering to high ethical standards in software architecture, security, and consulting data.');

-- 3. Team Members Table
DROP TABLE IF EXISTS team_members;
CREATE TABLE IF NOT EXISTS team_members (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    role VARCHAR(100) NOT NULL,
    image VARCHAR(255) NOT NULL
);

INSERT INTO team_members (name, role, image) VALUES
('Sarah Jenkins', 'CEO & Founder', '/assets/images/client-01.png'),
('Michael Chen', 'Chief Technology Officer', '/assets/images/client-01.png'),
('Elena Rostova', 'Principal UI/UX Designer', '/assets/images/client-01.png'),
('David Kalu', 'Director of Cloud Operations', '/assets/images/client-01.png');

-- 4. Pricing Plans Table
DROP TABLE IF EXISTS pricing_plans;
CREATE TABLE IF NOT EXISTS pricing_plans (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tier_name VARCHAR(50) NOT NULL,
    price_monthly DECIMAL(10,2) NOT NULL,
    price_yearly DECIMAL(10,2) NOT NULL,
    description TEXT NOT NULL,
    features TEXT NOT NULL, -- Semi-colon separated list
    is_popular TINYINT(1) DEFAULT 0
);

INSERT INTO pricing_plans (tier_name, price_monthly, price_yearly, description, features, is_popular) VALUES
('Basic Plan', 49.00, 470.00, 'Ideal for startups and small operations needing basic security and IT advisory.', '1 Core Consultant;Monthly Auditing;Standard Cloud Support;Email Help Desk', 0),
('Pro Plan', 99.00, 950.00, 'Best for growing businesses requiring fast Response SLA and deep operations management.', '3 Dedicated Consultants;Weekly Auditing;Advanced DevOps Support;24/7 Priority Help Desk;Vulnerability Scanning', 1),
('Enterprise Plan', 249.00, 2390.00, 'A complete strategy and operational suite for large enterprise networks.', 'Unlimited Consultants;Daily Real-time Auditing;Multi-cloud Ops & Kubernetes;Dedicated Account Manager;Custom SLA Guarantees', 0);

-- 5. FAQs Table
DROP TABLE IF EXISTS faqs;
CREATE TABLE IF NOT EXISTS faqs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    question VARCHAR(255) NOT NULL,
    answer TEXT NOT NULL
);

INSERT INTO faqs (question, answer) VALUES
('How do your consulting retainer plans work?', 'Our consulting retainers provide a set of dedicated engineering hours and advisors on call each month, customized to your deployment architecture.'),
('Is the PayHere payment sandbox secure?', 'Yes, the PayHere sandbox replicates the exact security protocols of PayHere Production, allowing complete validation of order checkouts safely without charging live credit cards.'),
('Can I upgrade or downgrade my tier later?', 'Absolutely. You can request changes to your service plan monthly, and billing adjustments will be prorated automatically in your next invoice cycle.');

-- 6. Contact Submissions Table
DROP TABLE IF EXISTS contact_submissions;
CREATE TABLE IF NOT EXISTS contact_submissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    subject VARCHAR(150) DEFAULT NULL,
    message TEXT NOT NULL,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 7. Orders Table
DROP TABLE IF EXISTS orders;
CREATE TABLE IF NOT EXISTS orders (
    id VARCHAR(100) PRIMARY KEY, -- Generate unique order_id like ORDR-12345
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    address VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL,
    plan_name VARCHAR(100) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(10) NOT NULL,
    payment_status VARCHAR(50) DEFAULT 'pending', -- pending, completed, failed
    payhere_payment_id VARCHAR(100) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
