import mysql from 'mysql2/promise';
import xlsx from 'xlsx';
import dotenv from 'dotenv';

dotenv.config();

// Conexión MySQL
const pool = await mysql.createPool({
    host: 'localhost',
    user: 'pablo',
    password: '',
    database: 'financialInformation'
});

// Leer Excel
const workbook = xlsx.readFile('data.xlsx'); 
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const data = xlsx.utils.sheet_to_json(sheet);

// Mapa de nombres de PK correctos
const pkMap = {
    customers: 'id_customer',
    invoices: 'id_invoice',
    transactions: 'id_transaction',
};

// Función para obtener o crear un registro y devolver el ID
async function getOrCreateId(table, column, value, extra = {}) {
    const pk = pkMap[table];
    if (!pk) throw new Error(`No PK definida para la tabla ${table}`);

    const [rows] = await pool.query(`SELECT ${pk} FROM ${table} WHERE ${column} = ?`, [value]);
    if (rows.length > 0) {
        return rows[0][pk];
    } else {
        const columns = [column];
        const placeholders = ['?'];
        const values = [value];
        for (const key in extra) {
            columns.push(key);
            placeholders.push('?');
            values.push(extra[key]);
        }
        const [result] = await pool.query(
            `INSERT INTO ${table} (${columns.join(',')}) VALUES (${placeholders.join(',')})`,
            values
        );
        return result.insertId;
    }
}

for (const row of data) {
    try {
        // 1. Customer
        const id_customer = await getOrCreateId(
            'customers',
            'email',
            row['Correo Electrónico'],
            { name: row['Nombre del Cliente'], 
                identification_number: row['Número de Identificación'], 
                address: row['Dirección'], 
                phone: row['Teléfono'] }
        );

        // 2. Invoices
        const id_invoice = await getOrCreateId(
            'invoices',
            'invoice_number',
            row['Número de Factura'],
            {
                invoice_period: row['Periodo de Facturación'], 
                platform:row['Plataforma Utilizada'],
                invoiced_amount: row['Monto Facturado'],
                paid_amount: row['Monto Pagado'],
                id_customer
            }
        );

        // 3. Transactions
        const id_transaction = await getOrCreateId(
            'transactions',
            'date_time',
            row['Fecha y Hora de la Transacción'],
            { 
                amount: row['Monto de la Transacción'],
                status: row['Estado de la Transacción'],
                type: row['Tipo de Transacción'],
                id_invoice
             }
        );

       
    

        // 7. Insertar facturas
        await pool.query(
            `INSERT INTO invoices 
            (invoice_number, invoice_period, platform, invoiced_amount, paid_amount, id_customer)
            VALUES (?, ?, ?, ?, ?, ?)`,
            [
                row['Número de Factura'],
                row['Periodo de Facturación'], 
                row['Plataforma Utilizada'],
                row['Monto Facturado'],
                row['Monto Pagado'],
                id_customer
            ]
        );

        console.log(`✅ Datos insertados correctamente`);

    } catch (err) {
        console.error('❌ Error procesando fila:', row, err.message);
    }
}

console.log('📦 Importación finalizada.');
await pool.end();
