const API_URL = 'http://localhost:4000/api/customers';

export const getCustomers = async () => {
    const res = await fetch(API_URL);
    return res.json();
};

export const createCustomer = async (customer) => {
    const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customer)
    });
    return res.json();
};

export const updateCustomer = async (id, customer) => {
    const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customer)
    });
    return res.json();
};

export const deleteCustomer = async (id) => {
    const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    return res.json();
};
