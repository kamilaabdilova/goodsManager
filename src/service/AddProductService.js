import $api from '@/http'
async function addProduct(productData, statusId, categoryId) {
    console.log('we are in service');
    const response = await $api.post('/api/products', {
        imageId: productData.imageId,
        price: productData.price,
        description: productData.description,
        name: productData.name,
        // categoryId: categoryId,
        productCategoryId: categoryId,
        statusId: statusId
    });
    console.log(response);
    return response;
}
export async function addItemToStorage(productId, quantity, id) {
    try {
        const response = await $api.post('/api/storageItem', {
            productId: productId,
            quantity: quantity,
            storageId: id
        });
        console.log('Item added to storage:', response.data);
        // Возможно, здесь можно предпринять дополнительные действия после успешного добавления элемента на сервере
    } catch (error) {
        console.error('Error adding item to storage:', error);
        throw error;
    }
}

function uploadImage(options) {
    const resp = $api.post('/api/products/upload', options);
    return resp;
}
async function getListProduct(){
    try {
        const response = await $api.get('/api/products/findAl');
        return response.data;
    } catch (error) {
        console.error('Error adding product:', error);
        throw error;
    }
}

export {
    addProduct,
    uploadImage,
    getListProduct
}