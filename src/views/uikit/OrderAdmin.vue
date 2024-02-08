<template>
  <div>
    <h3>Customer order list:</h3>
    <table>
      <thead>
      <tr>
        <th>Описание продукта</th>
        <th>адрес</th>
        <th>дата</th>
        <th>Телефон</th>
        <th>способ оплаты</th>
        <th>Сумма заказа</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="order in allOrders" :key="order.id">
        <td>{{ formatProductNames(order.products) }}</td>
        <td>{{ order.address }}</td>
        <td>{{ formatDate(order.date) }}</td>
        <td>{{ order.phone }}</td>
        <td>{{ order.payment ? 'Card' : 'Cash' }}</td>
        <td>{{ order.totalPrice }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getAllOrders } from "@/service/OrderService";
import { format } from 'date-fns';
import { getListProduct } from "@/service/AddProductService";

const allOrders = ref([]);
const productList = ref([]);

const formatDate = (date) => {
  return format(new Date(date), 'dd.MM.yyyy');
};
const formatProductNames = (productIds) => {
  return productIds.map((id) => {
    let productItem = productList.value.find(product => product.id === id)
    if(productItem !== undefined && productItem !== null){
      return productItem.description + ", "
    }
  }).join("")
};
onMounted(async () => {
  try {
    console.log('Mounting component...');
    allOrders.value = await getAllOrders();
    productList.value = await getListProduct();
  } catch (error) {
    console.error('Error fetching orders:', error);
  }
});


</script>

<style>
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: center;
}

th {
  background-color: #f2f2f2;
}
</style>
