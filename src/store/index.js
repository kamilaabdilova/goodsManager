import { createStore } from 'vuex'
import auth from '@/store/auth'
import basket from "@/store/basket";


const store = createStore({
  modules: {
    auth,
    basket
  }
})

export function useStore() {
  return store
}

export default store