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
export async function markSaleItemAsDone(saleItemId) {
    try {
        const response = await $api.put(`/sale-items/${saleItemId}/done`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to mark sale item as done');
    }
}
// Метод для получения информации о товаре по его ID
export async function getSaleItemById(itemId) {
    try {
        // Выполняем GET-запрос к API для получения информации о товаре
        const response = await $api.get(`api/sale-items/${itemId}`);
        // Возвращаем данные о товаре из ответа API
        return response.data;
    } catch (error) {
        // Если произошла ошибка при запросе, выводим ее в консоль и возвращаем null
        console.error('Error fetching sale item:', error);
        return null;
    }
}
export {
    saveOrder,
    getAllOrders,
    getAllClients
}