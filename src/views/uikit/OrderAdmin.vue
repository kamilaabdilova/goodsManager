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
        <Column header="Actions" style="min-width: 12rem">
          <template #body="{ data }">
            <!--            <button @click="viewOrder(data)" class="p-button p-button-icon p-button-sm">-->
            <!--              <i class="pi pi-eye" style="font-size: 0.7rem;"></i>-->
            <!--            </button>-->
            <!--            <button @click="openCommentModal(data)" class="p-button p-button-icon p-button-sm">-->
            <!--              <i class="pi pi-verified" style="font-size: 0.7rem;"></i>-->
            <!--            </button>-->
            <!--            <button @click="openRejectModal(data)" class="p-button p-button-icon p-button-sm">-->
            <!--              <i class="pi pi-times" style="font-size: 0.7rem;"></i>-->
            <!--            </button>-->
            <Button @click="viewOrder(data)" icon="pi pi-eye" severity="secondary" text raised rounded aria-label="Bookmark" class="small-button"/>
            <Button @click="openCommentModal(data)" icon="pi pi-check" severity="success" text raised rounded aria-label="Filter" class="small-button"/>
            <Button @click="openRejectModal(data)" icon="pi pi-times" severity="danger" text raised rounded
                    aria-label="Cancel" class="small-button"/>
            <!--            <button @click="viewOrder(data)" class="p-button p-button-text">View</button>-->
            <!--            <button @click="openCommentModal(data)" class="p-button p-button-text">Send</button>-->
            <!--            <button @click="openRejectModal(data)" class="p-button p-button-text">Reject</button>-->
          </template>
        </Column>
      </DataTable>
    </div>
    <!-- Модальное окно для отображения информации о заказе -->
    <Dialog v-model="showModal" :visible="showModal" header="Order Details" class="order-details-dialog"
            :closable="false">
      <div v-if="selectedOrder" class="order-details">
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
        <div class="p-d-flex p-jc-end">
          <Button label="Close" icon="pi pi-times" class="p-button-text close-button" @click="resetModal"/>
        </div>
      </div>
    </Dialog>
    <!-- Модальное окно для ввода комментария -->
    <Dialog v-model="commentModalVisible" :visible="commentModalVisible" header="Enter Comment" class="comment-dialog"
            :closable="false">
      <div class="comment-dialog-content">
        <Textarea type="text" v-model="commentInput" class="p-inputtext-lg p-d-block"/>
        <div style="margin-top: 1rem;" class=" p-d-flex p-jc-end">
          <Button label="Save" icon="pi pi-check" @click="submitComment" style="margin-right: 2rem;"/>
          <Button label="Cancel" icon="pi pi-times" @click="closeCommentModal"/>
        </div>
      </div>
    </Dialog>

    <Dialog v-model="rejectMessages" :visible="rejectMessages" header="Enter Comment" class="comment-dialog"
            :closable="false">
      <div class="comment-dialog-content">
        <Textarea type="text" v-model="rejectInput" class="p-inputtext-lg p-d-block"/>
        <div style="margin-top: 1rem;" class=" p-d-flex p-jc-end">
          <Button label="Save" icon="pi pi-check" @click="rejectComment" style="margin-right: 2rem;"/>
          <Button label="Cancel" icon="pi pi-times" @click="closeRejectModal"/>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import * as OrderService from "@/service/OrderService";

const orders = ref([]);
const rejectMessages = ref(false);
const commentModalVisible = ref(false);
const commentInput = ref('');
const showModal = ref(false);
const rejectInput = ref('');
const selectedOrder = ref(null);
const viewOrder = async (order) => {
  try {
    selectedOrder.value = await OrderService.getSaleItemById(order.id);
    showModal.value = true; // Открываем модальное окно
  } catch (error) {
    console.error('Error viewing order:', error);
  }
};

const openCommentModal = (order) => {
  selectedOrder.value = order;
  commentModalVisible.value = true;
};
const openRejectModal = (order) => {
  selectedOrder.value = order;
  rejectMessages.value = true;
};
const closeCommentModal = () => {
  commentModalVisible.value = false;
  commentInput.value = '';
};
const closeRejectModal = () => {
  rejectMessages.value = false;
  commentInput.value = '';
};
const submitComment = async () => {
  try {
    await OrderService.markSaleItemAsSended(selectedOrder.value.id, commentInput.value);
    console.log('Submitted comment:', commentInput.value);
    selectedOrder.value.saleStatus.name = 'SENDET';
    closeCommentModal();
  } catch (error) {
    console.error('Failed to submit comment:', error);
  }
};
const rejectComment = async () => {
  try {
    await OrderService.markSaleItemAsReject(selectedOrder.value.id, rejectInput.value);
    selectedOrder.value.saleStatus.name = 'REJECTED';
    closeRejectModal();
  } catch (error) {
    console.error('Failed to submit comment:', error);
  }
};
const resetModal = () => {
  showModal.value = false;
  selectedOrder.value = null;
};
onMounted(async () => {
  try {
    orders.value = await OrderService.getAllOrders();
    console.log(orders.value)
  } catch (error) {
    console.error('Error fetching orders:', error);
  }
});
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
.comment-dialog {
  width: 400px;
}
.comment-dialog-content {
  padding: 20px;
}
.small-button {
  font-size: 0.7rem; /* уменьшаем размер шрифта кнопок */
  padding: 0.5rem 1rem; /* уменьшаем внутренние отступы кнопок */
}
</style>

