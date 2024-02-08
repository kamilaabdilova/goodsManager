export const getItem = key => {
    try {
        return JSON.parse(localStorage.getItem(key))
    } catch (e) {
        console.log('Error getting data from localStorage', e)
        return null
    }
}

export const setItem = (key, data) => {
    try {
        localStorage.setItem(key, JSON.stringify(data))
    } catch (e) {
        console.log('Error saving data in localStorage', e)
    }
}
// export const addToCart = async (product) => {
//
//     debugger
//
//     let cart
//     if(localStorage.getItem("cart") === null){
//         cart = []
//     }
//     else {
//         cart = getCart();
//     }
//     // Иначе добавляем новый продукт в корзину
//     cart.push(product);
//
//     // Сохраняем обновленную корзину в localStorage
//     setItem("cart", JSON.stringify(cart));
// };
// // Функция для удаления продукта из корзины
// export const removeFromCart = (productId) => {
//     const updatedCart = cart.filter((item) => item.productId !== productId);
//     // Сохраняем обновленную корзину в localStorage
//     setItem("cart", updatedCart);
// };
// // Функция для получения текущего состояния корзины
// export const getCart = async () => {
//     // debugger
//
//     // Пытаемся получить данные из localStorage
//     const savedCart = localStorage.getItem("cart");
//     // Если данные есть, преобразуем их из JSON в объект
//     if (savedCart) {
//         try {
//             return JSON.parse(savedCart);
//         } catch (e) {
//             console.log("Error parsing cart data from localStorage", e);
//             return [];
//         }
//     }
// };
