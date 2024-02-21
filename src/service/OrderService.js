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
export async function markSaleItemAsSended(saleItemId, comment) {
    try {
        const response = await $api.put(`/api/sale-items/${saleItemId}/sendet`, {
            comments: comment
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to mark sale item as done');
    }
}
export async function markSaleItemAsReject(saleItemId, comment) {
    try {
        const response = await $api.put(`/api/sale-items/${saleItemId}/reject`, {
            comments: comment
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to mark sale item as done');
    }
}
export async function getSaleItemById(itemId) {
    try {
        const response = await $api.get(`api/sale-items/${itemId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching sale item:', error);
        return null;
    }
}

export {
    saveOrder,
    getAllOrders,
    getAllClients
}