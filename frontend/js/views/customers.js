import { getCustomers, createCustomer, updateCustomer, deleteCustomer } from '../services/customersService.js';

export default async () => {
    const customers = await getCustomers();

    let html = `
        <h2>Customers</h2>
        <form id="customerForm" class="mb-4">
            <input type="hidden" id="customerId">
            <div class="mb-2">
                <input type="text" id="name" class="form-control" placeholder="Name" required>
            </div>
            <div class="mb-2">
                <input type="email" id="email" class="form-control" placeholder="Email" required>
            </div>
            <div class="mb-2">
                <input type="text" id="identification_number" class="form-control" placeholder="Identification number" required>
            </div>
            <div class="mb-2">
                <input type="text" id="address" class="form-control" placeholder="Address" required>
            </div>
            <div class="mb-2">
                <input type="text" id="phone" class="form-control" placeholder="Phone" required>
            </div>
            
            <button type="submit" class="btn btn-primary">Guardar</button>
            <button type="reset" class="btn btn-secondary">Limpiar</button>
        </form>

        <table class="table table-striped">
            <thead>
                <tr><th>ID</th><th>Name</th><th>email</th><th>Acciones</th></tr>
            </thead>
            <tbody>
    `;

    customers.forEach(p => {
        html += `
            <tr>
                <td>${p.id_customer}</td>
                <td>${p.name}</td>
                <td>${p.email}</td>
                <td>
                    <button class="btn btn-warning btn-sm edit" data-id="${p.id_customer}" data-name="${p.name}" 
                    data-email="${p.email} "data-identification_number="${p.identification_number}
                    "data-address="${p.address} "data-phone="${p.phone}">Editar</button>
                    <button class="btn btn-danger btn-sm delete" data-id="${p.id_customer}">Eliminar</button>
                </td>
            </tr>
        `;
    });

    html += `</tbody></table>`;

    setTimeout(() => {
        // Manejar envío de formulario
        document.getElementById('customerForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const id = document.getElementById('customerId').value;
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const identification_number = document.getElementById('identification_number').value;
            const address = document.getElementById('address').value;
            const phone = document.getElementById('phone').value;
            
            if (id) {
                await updateCustomer(id, { name, email, identification_number, address, phone});
            } else {
                await createCustomer({ name, email,identification_number, address, phone });
            }
            location.reload();
        });

        // Botones Editar
        document.querySelectorAll('.edit').forEach(btn => {
            btn.addEventListener('click', () => {
                document.getElementById('customerId').value = btn.dataset.id;
                document.getElementById('name').value = btn.dataset.name;
                document.getElementById('email').value = btn.dataset.email;
                document.getElementById('identification_number').value= btn.dataset.identification_number;
                document.getElementById('address').value= btn.dataset.address;
                document.getElementById('phone').value= btn.dataset.phone;
            });
        });

        // Botones Eliminar
        document.querySelectorAll('.delete').forEach(btn => {
            btn.addEventListener('click', async () => {
                if (confirm('¿Eliminar este paciente?')) {
                    await deleteCustomer(btn.dataset.id);
                    location.reload();
                }
            });
        });
    }, 0);

    return html;
};
