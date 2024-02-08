<template>
  <div class="col-12">
    <div class="card">
      <h5>Your basket:</h5>
      <RouterLink v-if="$route.path !== '/uikit/list'" to="/uikit/list">
        <Button class="p-button-primary" label="Back to catalog"/>
      </RouterLink>
      <div class="card m-3 border-1 surface-border" v-for="item in basketListValue.baskets" :key="item.id">
         <div>
           <Toast />
           <div class="flex align-items-center justify-content-between w-full gap-5">
             <router-link
                 :to="{ name: 'productItem', query: { id: item.id }  }"
                 class="flex align-items-center justify-content-between w-full">
               <img style="width: 140px; height: 100px"
                    :src="'data:image/png;base64,' + item.image.image"
                    :alt="item.image.name"/>
               <div class="font-semibold">{{ item.category == null ? '' : item.category.nameCategory }}</div>
               <div>{{ item.description }}</div>
               <div class="text-2xl font-semibold">${{ item.price }}</div>
             </router-link>
             <Button icon="pi pi-trash " @click="removeFromBasket(item)"/>
           </div>
         </div>
      </div>
      <h5>Number of products in the basket : {{ basketListValue.baskets.length }}</h5>
      <h5>Total price: ${{ calculateTotalPrice() }}</h5>
      <router-link to="/uikit/order">
        <Button class="p-button-primary" label="Оформить заказ"/>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, watch } from 'vue';
import { useStore } from 'vuex';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const store = useStore();
const currentUser = store.state.auth.user.userName;
const calculateTotalPrice = () => {
  return basketListValue.baskets.reduce((total, item) => total + item.price, 0);
};
const basketListValue = reactive({
  baskets: [],
});

onMounted(() => {
  basketListValue.baskets = store.state.basket.basket.filter((item) => item.userName === currentUser);
});

watch(() => store.state.basket.basket, (newBasket) => {
  basketListValue.baskets = newBasket.filter((item) => item.userName === currentUser);
});

const removeFromBasket = async (item) => {
  await store.dispatch('basket/removeFromBasket', item);
  toast.add({ severity: 'success', summary: 'Product successfully removed from the basket!', life: 3000 });
};
</script>
