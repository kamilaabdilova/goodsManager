import $api from '@/http'

async function saveOrder(orderData) {
    try {
        console.log('Trying to save order...');
        const response = await $api.post('/api/sale-items', orderData);
        console.log(response);
        return response; // Вернуть значение response
    } catch (error) {
        console.error('An error occurred while saving the order:', error.message);
        throw error;
    }
}

async function getAllOrders() {
    try {
        const response = await $api.get('/api/sale-items');
        return response.data;
    } catch (error) {
        console.error('Произошла ошибка:', error);
        return [];
    }
}
async function getAllClients() {
    try {
        const response = await $api.get('/clients');
        return response.data;
    } catch (error) {
        console.error('Произошла ошибка:', error);
        return [];
    }
}

export {
    saveOrder,
    getAllOrders,
    getAllClients
}