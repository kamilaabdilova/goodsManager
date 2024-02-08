const savedBasket = JSON.parse(localStorage.getItem('basket'))
const basket = savedBasket === null ? [] :  savedBasket
export default {
    namespaced: true,
    state: {
        basket: basket
    },
    actions: {
        async addToMyBasket({ commit }, newBasket) {
            localStorage.setItem('basket', JSON.stringify(newBasket))
            commit('saveBaskets', newBasket)
        },
        async removeFromBasket({ commit, state }, productToRemove) {
            const updatedBasket = state.basket.filter(item => item.id !== productToRemove.id);
            localStorage.setItem('basket', JSON.stringify(updatedBasket));
            commit('saveBaskets', updatedBasket);
            console.log(updatedBasket)
        },
        async cleanToMyBasket({ commit }) {
            localStorage.removeItem('user')
            commit('cleanBasket')
        }
    },
    mutations: {
        saveBaskets(state, basket) {
            state.basket = basket
        },
        cleanBasket(state) {
            state.basket = null
        }
    }
}
