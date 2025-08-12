import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a MySQL
const pool = mysql.createPool({
    host: 'localhost',
    user: 'pablo',
    password: '',
    database: 'financialInformation'
});

// ----------------- PACIENTES -----------------
app.get('/api/customers', async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM customers');
    res.json(rows);
});

app.post('/api/customers', async (req, res) => {
    const { name, identification_number, address, phone, email } = req.body;
    const [result] = await pool.query('INSERT INTO customers (name, identification_number,address, phone, email) VALUES (?, ?, ?, ?, ?)', [name, identification_number,address,phone,email]);
    res.json({ id: result.insertId, name, identification_number,  address, phone, email });
});

app.put('/api/customers/:id', async (req, res) => {
    const { id } = req.params;
    const { name, identification_number, address, phone, email } = req.body;
    await pool.query('UPDATE customers SET name=?, identification_number=?, address=?, phone=?, email=? WHERE id_customer=?', [name, identification_number, address, phone, email, id]);
    res.json({ id, name, identification_number, address, phone, email });
});

app.delete('/api/customers/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM customers WHERE id_customer=?', [id]);
    res.json({ message: 'Paciente eliminado' });
});



// ----------------- INICIO DEL SERVIDOR -----------------
app.listen(4000, () => {
    console.log('Servidor API corriendo en http://localhost:4000');
});
