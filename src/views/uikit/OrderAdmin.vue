<template>
  <div>
    <div class="card">
      <DataTable :value="orders" :paginator="true" :rows="10" :rowsPerPageOptions="[5,10,20]">
        <Column field="numberNakladnoy" header="Invoice Number" style="min-width: 5rem">
          <template #body="{ data }">
            {{ data.numberNakladnoy }}
          </template>
        </Column>
        <Column field="Client name" header="Client name" style="min-width: 12rem">
          <template #body="{ data }">
            {{ data.client.name }}
          </template>
        </Column>
        <Column field="phoneNumber" header="Phone Number" style="min-width: 12rem">
          <template #body="{ data }">
            {{ data.phoneNumber }}
          </template>
        </Column>
        <Column field="address" header="Address" style="min-width: 12rem">
          <template #body="{ data }">
            {{ data.address }}
          </template>
        </Column>
        <Column field="schedule" header="Order Date" sortable style="min-width: 12rem">
          <template #body="{ data }">
            {{ data.schedule }}
          </template>
        </Column>
        <Column field="quantity" header="Quantity" style="min-width: 5rem">
          <template #body="{ data }">
            {{ data.quantity }}
          </template>
        </Column>
        <Column field="products" header="Products" style="min-width: 12rem">
          <template #body="{ data }">
            <span v-for="(product, index) in data.products" :key="index">
              {{ product.name }}
              <!-- Добавим запятую после каждого имени продукта, если это не последний элемент -->
              <span v-if="index !== data.products.length - 1">, </span>
            </span>
          </template>
        </Column>
        <Column field="totalPrice" header="Total Price with discount" style="min-width: 8rem">
          <template #body="{ data }">
            {{ data.totalPrice }}
          </template>
        </Column>
        <Column field="saleStatus" header="Sale Status" style="min-width: 12rem">
          <template #body="{ data }">
            {{ data.saleStatus.name }}
          </template>
        </Column>
        <!-- Колонка для действий -->
        <Column header="Actions" style="min-width: 12rem">
          <template #body="{ data }">
            <button @click="viewOrder(data)" class="p-button p-button-text">View</button>
            <button @click="sendOrder(data)" class="p-button p-button-text">Send</button>
            <button @click="rejectOrder(data)" class="p-button p-button-text">Reject</button>
          </template>
        </Column>
      </DataTable>
    </div>
    <!-- Модальное окно для отображения информации о заказе -->
    <Dialog v-model="showModal" :visible="showModal" header="Order Details" class="order-details-dialog" :closable="false">
      <div v-if="selectedOrder" class="order-details">
        <!-- Здесь можно отображать информацию о заказе -->
        <p><b>Client Name:</b> {{ selectedOrder.client.name }}</p>
        <p><b>Phone Number:</b> {{ selectedOrder.phoneNumber }}</p>
        <p><b>Address:</b> {{ selectedOrder.address }}</p>
        <p><b>Order Date:</b> {{ selectedOrder.schedule }}</p>
        <p><b>Products:</b></p>
        <ul>
          <li v-for="product in selectedOrder.products" :key="product.id">{{ product.name }}</li>
        </ul>
        <p><b>Quantity:</b> {{ selectedOrder.quantity }}</p>
        <p><b>Total Price:</b> {{ selectedOrder.totalPrice }}</p>
        <p><b>Sale Status:</b> {{ selectedOrder.saleStatus.name }}</p>
        <!-- Добавьте другие детали заказа по вашему усмотрению -->
        <div class="p-d-flex p-jc-end">
          <Button label="Close" icon="pi pi-times" class="p-button-text close-button" @click="resetModal" />
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import * as OrderService from "@/service/OrderService";

const orders = ref([]);

const showModal = ref(false);
const selectedOrder = ref(null);
const viewOrder = async (order) => {
  try {
    selectedOrder.value = await OrderService.getSaleItemById(order.id);
    showModal.value = true; // Открываем модальное окно
  } catch (error) {
    console.error('Error viewing order:', error);
  }
};
onMounted(async () => {
  try {
    orders.value = await OrderService.getAllOrders();
    console.log(orders.value)
  } catch (error) {
    console.error('Error fetching orders:', error);
  }
});

// Метод для сброса модального окна
const resetModal = () => {
  showModal.value = false;
  selectedOrder.value = null;
};
const sendOrder = (order) => {
  // Логика для отправки заказа
};

const rejectOrder = (order) => {
  // Логика для отклонения заказа
};
</script>
<style scoped>
.order-details-dialog {
  max-width: 400px;
}

.order-details {
  padding: 1rem;
}

.close-button {
  margin-top: 1rem;
}
</style>

