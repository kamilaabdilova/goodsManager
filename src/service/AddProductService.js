import $api from '@/http'
async function addProduct(productData, statusId, categoryId) {
    console.log('we are in service');
    const response = await $api.post('/product/save', {
        imageId: productData.imageId,
        price: productData.price,
        description: productData.description,
        categoryId: categoryId,
        statusId: statusId
    });
    console.log(response);
    return response;
}

function uploadImage(options) {
    const resp = $api.post('/product/upload', options);
    return resp;
}
async function getListProduct(){
    try {
        const response = await $api.get('/product/findAll');
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