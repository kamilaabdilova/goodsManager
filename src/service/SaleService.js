import $api from '@/http'

async function createSale(saleData) {
    try {
        console.log('Trying to save order...');
        const response = await $api.post('/api/sale-items/now', saleData);
        console.log(response);
        return response;
    } catch (error) {
        console.error('An error occurred while saving the order:', error.message);
        throw error;
    }
}

async function getAllSales(saleStatusId) {
    try {
        // Отправка запроса с параметром saleStatusId
        const response = await $api.get(`/api/sale-items/byStatus`, {
            params: {
                saleStatusId: saleStatusId
            }
        });

        // Возврат данных из ответа
        return response.data;
    } catch (error) {
        // Обработка ошибок
        console.error('Произошла ошибка при получении данных:', error.message);
        return [];
    }
}



export {
    createSale,
    getAllSales
}