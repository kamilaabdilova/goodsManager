import $api from "@/http";

export async function getListStorage() {
    try {
        const response = await $api.get('/api/storage');
        return response.data;
    } catch (error) {
        console.error('Error adding product:', error);
        throw error;
    }
}
export async function addStorage(newStorage) {
    console.log('we are in service');
    const response = await $api.post('/api/storage', {
        address: newStorage.address,
        name: newStorage.name,
        storageCode: newStorage.storageCode,
        storageItems: []
    });
    console.log(response);
    return response;
}
export async function addWishlist(wishlistItem) {
    console.log('adding new wishlist' + wishlistItem);
    const response = await $api.post('/api/wishlist', {
        storageId: wishlistItem.storageId,
        description: wishlistItem.description
    });
    return response;
}
export async function getListSupply() {
    try {
        const response = await $api.get('/api/providers/wishlist');
        return response.data;
    } catch (error) {
        console.error('Error adding product:', error);
        throw error;
    }
}
export async function deleteStorage(id) {
    const response = await $api.delete(`/api/storage/${id}`);
    return response;
}
export async function editStorage(id, newStorage) {
    console.log('we are in service');
    const response = await $api.put('/api/storage', {
        address: newStorage.address,
        name: newStorage.name,
        storageCode: newStorage.storageCode,
        storageItems: []
    });
    console.log(response);
    return response;
}