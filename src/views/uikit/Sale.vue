<template>
  <div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
    <div class="flex flex-column align-items-center justify-content-center">
      <div
          style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
        <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
          <div class="text-center mb-5">
            <div class="text-900 text-3xl font-medium mb-3">Sale!</div>
          </div>
          <div>
            <Toast/>
            <label for="client" class="block text-900 text-xl font-medium mb-2">Client</label>
            <select v-model="selectedClient" id="client" class="w-full md:w-30rem mb-5" style="padding: 1rem">
              <option v-for="client in clients" :value="client.id">{{ client.name }}</option>
            </select>
            <label for="address" class="block text-900 text-xl font-medium mb-2">Address</label>
            <input v-model="address" id="address" type="text" placeholder="Address" class="w-full md:w-30rem mb-5"
                   style="padding: 1rem"/>
            <label for="invoiceNumber" class="block text-900 text-xl font-medium mb-2">Invoice number</label>
            <input v-model="invoiceNumber" id="invoiceNumber" type="text" placeholder="invoice number" class="w-full md:w-30rem mb-5"
                   style="padding: 1rem"/>
            <label for="phone" class="block text-900 font-medium text-xl mb-2">Phone</label>
            <input v-model="formattedPhone" id="phone" type="text" placeholder="Phone" class="w-full md:w-30rem mb-5"
                   style="padding: 1rem"/>
          </div>
          <div>
            <Button class="p-button-primary" @click="submitSale" label="Make a purchase"/>
            <span style="margin-left: 10px;"></span>
            <RouterLink to="/uikit/basket">
              <Button class="p-button-primary" label="Back to basket"/>
            </RouterLink>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref} from 'vue';
import {getAllClients} from "@/service/OrderService";
import store from "@/store";
import {useToast} from 'primevue/usetoast';
import {useRouter} from "vue-router";
import {createSale} from "@/service/SaleService";

const toast = useToast();
const router = useRouter();
const selectedClient = ref(null); // Выбранный клиент
const clients = ref([]); // Список клиентов
const invoiceNumber = ref(''); // Номер счета
const formattedPhone = ref('+996');

const products = () => {
  let productsId = []
  store.state.basket.basket.forEach((item) => {
    productsId.push(item.id)
  })
  return productsId
}
const submitSale = async () => {
  try {
    const saleData = {
      clientId: selectedClient.value,
      numberNakladnoy: invoiceNumber.value,
      address: address.value,
      productIds: products(),
      phoneNumber: formattedPhone.value,
      totalPrice: getTotalPrice(),
      quantity: store.state.basket.basket.length
    };
    const savedOrder = await createSale(saleData);
    if (savedOrder && savedOrder.status === 201) {
      toast.add({severity: 'success', summary: 'Your order has been successfully placed!', life: 3000});
      await router.push('/uikit/saleAdmin')
    } else {
      // Показать сообщение об ошибке
      toast.add({severity: 'error', summary: 'Failed to save the order. Please try again later.', life: 3000});
      console.error('Failed to save the order. Status:', savedOrder.status);
    }
  } catch (error) {
    // Показать сообщение об ошибке
    console.log(error)
  }
};

const getTotalPrice = () => {
  let totalPrice = 0;
  store.state.basket.basket.forEach((item) => {
    totalPrice += item.price;
  });
  return totalPrice;
};
onMounted(async () => {
  try {
    clients.value = await getAllClients();
  } catch (error) {
    console.error('Error fetching clients:', error);
  }
});
</script>