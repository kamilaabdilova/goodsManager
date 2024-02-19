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
        <Column field="schedule" header="Order Date" style="min-width: 12rem">
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
      </DataTable>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import * as OrderService from "@/service/OrderService";

const orders = ref([]);

onMounted(async () => {
  try {
    orders.value = await OrderService.getAllOrders();
  } catch (error) {
    console.error('Error fetching orders:', error);
  }
});
</script>

