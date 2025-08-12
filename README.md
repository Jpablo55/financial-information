# Financial information

SPA Frontend to manage client CRUD using **vanilla JavaScript** and REST API consumption.

---

## 📂 Repository Structure

- `index.html` — Main page that loads the SPA.
- `main.js` — Entry point, loads views, and controls navigation.
- `views/` — Views for Patients, Doctors, and Appointments.
- `services/` — Functions to consume the API (`fetch`, GET, POST, PUT, DELETE).
- `styles/` *(optional)* — CSS stylesheets.
- `README.md` — Project documentation.

---

## 📋 Prerequisites

- **Backend** running with the following endpoints:
- `GET /api/customers`
- `POST /api/customers`
- `PUT /api/customers/:id`
- `DELETE /api/customers/:id`

- Serve the folder with a **local server** to avoid CORS issues:
- **Live Server** extension in VSCode.
- Or `python -m http.server` in terminal.
- Or any other static web server.

---
## 🚀 Installation and Use

1. **Clone the repository**
    ```bash
        git clone https://github.com/Jpablo55/financial-information.git
2.
    ```bash
      cd financial-information
3.
    ```bash
    cd backend
4.
    ```bash
     npm install

2. **Open the project on a local server:**

With VSCode: right-click → Open with Live Server.

3. **Make sure the backend is running at http://localhost:4000**
4. **Open your browser to the address indicated by your local server (example: http://127.0.0.1:5500 if using Live Server).**

##🔄 Application Flow
1. **List Data**

- Upon loading, the SPA makes GET calls to the backend to display customers.

2. **Create or Edit Records**
- Fill out the form and press "Save".
- If the form has a hidden ID → PUT (edit).
- If not → POST (create).

3. **Delete**
- Pressing "Delete" sends a DELETE to the backend and updates the view.

4. **Quick Edit**
- "Edit" buttons automatically populate the form using data-* attributes.

📦 Backend Integration and Bulk Import
- This frontend is designed to work with a Node.js + MySQL backend.
- Supports integration with a bulk import script (import_customers.js) that loads data from Excel.
- The importer:
- Automatically creates patients, physicians, specialties, locations, and payment methods if they don't exist.
- Inserts all appointments with their relationships ready for use in the SPA.






