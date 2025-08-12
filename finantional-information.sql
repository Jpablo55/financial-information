CREATE DATABASE financialInformation;
USE financialInformation;

CREATE TABLE customers (
  id_customer INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  identification_number VARCHAR(15) NOT NULL,
  address VARCHAR(150) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE
);

CREATE TABLE invoices (
 id_invoice INT AUTO_INCREMENT PRIMARY KEY,
 invoice_number VARCHAR(15) NOT NULL,
 invoice_period  VARCHAR(15) NOT NULL,
 platform ENUM('Daviplata','Nequi') NOT NULL DEFAULT 'Daviplata',
 invoiced_amount DECIMAL NOT NULL,
 paid_amount DECIMAL NOT NULL,
 id_customer INT NOT NULL,
 FOREIGN KEY (id_customer) REFERENCES customers(id_customer)
);

CREATE TABLE transactions(
 id_transaction INT AUTO_INCREMENT PRIMARY KEY,
 date_time DATETIME NOT NULL,
 amount DECIMAL NOT NULL,
 status ENUM('Pendiente','Completada','Fallida') NOT NULL DEFAULT 'Pendiente',
 type ENUM('Pago de Factura'),
 id_invoice INT NOT NULL,
 FOREIGN KEY (id_invoice) REFERENCES invoices(id_invoice)
);





