import $api from '@/http'

async function saveOrder(orderData) {
    try {
        console.log('Trying to save order...');
        const response = await $api.post('/order/save', orderData);
        console.log(response);
        if (response.status === 200) {
            console.log('Order saved successfully:', response.data);
            return response.data;
        } else {
            console.error('Failed to save order:', response.statusText);
            throw new Error('Failed to save order');
        }
    } catch (error) {
        console.error('An error occurred while saving the order:', error.message);
        throw error;
    }
}
async function getAllOrders() {
    try {
        const response = await $api.get('/order/findAll');
        return response.data;
    } catch (error) {
        console.error('Произошла ошибка:', error);
        return [];
    }
}

export {
    saveOrder,
    getAllOrders
}