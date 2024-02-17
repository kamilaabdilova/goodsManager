<script setup>
import {ref, onMounted, reactive} from 'vue';
import {getListProduct} from "@/service/AddProductService";
import {useStore} from "vuex";
import Basket from "@/views/uikit/Basket.vue";
import {useToast} from "primevue/usetoast";
import {addWishlist, getListStorage} from "@/service/StorageService";

const store = useStore()

async function getAllProduct() {
  try {
    await (async () => {
      getListProduct().then(response => {
        let products = []
        for (let i = 0; i < response.length; i++) {
          let item = response[i]
          products.push({
            category: item.productCategory,
            description: item.description,
            id: item.id,
            image: item.image,
            status: item.status,
            name: item.name,
            price: item.price
          })
        }
        dataviewValue.value = products
      })
    })()
  } catch (e) {
    console.log(e)
  }
}

const toast = useToast();
const dataviewValue = ref(null);
const layout = ref('grid');
const sortKey = ref(null);
const sortOrder = ref(null);
const sortField = ref(null);
const sortOptions = ref([
  {label: 'Price High to Low', value: '!price'},
  {label: 'Price Low to High', value: 'price'}
]);

onMounted(async () => {
  //productService.getProductsSmall().then((data) => (dataviewValue.value = data));
  await getAllProduct();
  try {
    const storageList = await getListStorage();
    storageOptions.value = storageList.map(storage => ({ name: storage.name, value: storage.id }));
  } catch (error) {
    console.error('Error fetching storage list:', error);
    toast.add({severity: 'error', summary: 'Failed to fetch storage list', life: 3000});
  }
});
const addToBasket = async (product) => {
  const productNew = {
    userName: store.state.auth.user.userName,
    category: product.category,
    description: product.description,
    id: product.id,
    name: product.name,
    image: {
      id: product.image.id,
      name: product.image.name,
      type: product.image.type,
      image: product.image.image
    },
    // inventoryStatus: {
    //   id: product.inventoryStatus.id,
    //   status: product.inventoryStatus.status
    // },
    price: product.price
  }
  let basket = []

  store.state.basket.basket.forEach((item) => {
    basket.push(item)
  })

  basket.push(productNew)
  toast.add({severity: 'success', summary: 'Product successfully added to the basket!', life: 3000});
  await store.dispatch('basket/addToMyBasket', basket)
  await console.log(store.state.basket.basket)

};

const onSortChange = (event) => {
  const value = event.value.value;
  const sortValue = event.value;
  if (value.indexOf('!') === 0) {
    sortOrder.value = -1;
    sortField.value = value.substring(1, value.length);
    sortKey.value = sortValue;
  } else {
    sortOrder.value = 1;
    sortField.value = value;
    sortKey.value = sortValue;
  }
};
const displayDialog = ref(false);
const wishlistItem = reactive({
  storageId: '',
  description: ''
});
const storageOptions = ref([]);
const openDialog = () => {
  displayDialog.value = true;
};

const closeDialog = () => {
  displayDialog.value = false;
};

const sendWishlistItem = async () => {
  try {
    const requestData = {
      description: wishlistItem.description,
      storageId: wishlistItem.storageId.value
    };

    const response = await addWishlist(requestData);
    console.log('Sending wishlist item:', requestData);
    console.log('Wishlist item added successfully:', response);
    toast.add({severity: 'success', summary: 'Wishlist item sent successfully!', life: 3000});
    closeDialog();
    wishlistItem.value = { name: '', description: '' };
  } catch (error) {
    console.error('Error sending wishlist item:', error);
    toast.add({severity: 'error', summary: 'Failed to send wishlist item', life: 3000});
  }
};

</script>
<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <div class="header-container">
          <h5>All goods</h5>
          <div class="button-container">
            <Button label="Wishlist" @click="openDialog" class="p-button-outlined p-button-primary mr-2 mb-2"/>
          </div>
        </div>
        <DataView :value="dataviewValue" :layout="layout"
                  :paginator="true" :rows="9"
                  :sortOrder="sortOrder"
                  :sortField="sortField">
          <template #header>
            <div class="grid grid-nogutter">
              <div class="col-6 text-left">
                <Dropdown v-model="sortKey" :options="sortOptions" optionLabel="label" placeholder="Sort By Price"
                          @change="onSortChange($event)"/>
              </div>
              <div class="col-6 text-right">
                <DataViewLayoutOptions v-model="layout"/>
              </div>
            </div>
          </template>
          <template #grid="slotProps">
            <div class="col-12 md:col-4">
              <div>
                <div class="card m-3 border-1 surface-border">
                  <Toast/>
                  <router-link :to="{ name: 'productItem', query: { id: slotProps.data.id } }">
                    <div class="flex align-items-center justify-content-between">
                      <div class="flex align-items-center">
                        <i class="pi pi-tag mr-2"></i>
                        <span class="font-semibold">{{
                            slotProps.data.productCategory ? slotProps.data.productCategory.name : ''
                          }}</span>
                      </div>
                      <span class="product-badge">{{
                          slotProps.data.status === null ? ' ' : slotProps.data.status.status
                        }}</span>
                    </div>
                    <div class="text-center">
                      <img style="width: 140px; height: 100px"
                           :src="'data:image/png;base64,'+slotProps.data.image.image"
                           :alt="slotProps.data.image.name"/>
                      <div class="text-2xl font-bold">{{ slotProps.data.name }}</div>
                      <div class="mb-3">{{ slotProps.data.description }}</div>
                    </div>
                  </router-link>
                  <div class="flex align-items-center justify-content-between">
                    <span class="text-2xl font-semibold">${{ slotProps.data.price }}</span>
                    <Button icon="pi pi-shopping-cart" @click="addToBasket(slotProps.data)"></Button>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </DataView>
      </div>
    </div>
  </div>
  <Basket/>

  <Dialog v-model="displayDialog" :visible="displayDialog" header="Wishlist" :closable="false">
    <div class="p-fluid">
      <div class="p-field mb-3">
        <label for="storage" class="label-bold">Warehouse</label>
        <Dropdown id="storage" v-model="wishlistItem.storageId" :options="storageOptions" optionLabel="name" class="p-inputtext-lg p-d-block"/>
      </div>
      <div class="p-field mb-3">
        <label for="address" class="label-bold">Description</label>
        <InputText id="address" v-model="wishlistItem.description" class="p-inputtext-lg p-d-block"/>
      </div>
    </div>
    <!-- Кнопки внизу модального окна -->
    <template #footer>
      <div class="p-grid p-justify-between">
        <div class="p-col">
          <Button label="Back" class="p-button-secondary" @click="closeDialog"/>
        </div>
        <div class="p-col">
          <Button label="Send" class="p-button-primary" @click="sendWishlistItem"/>
        </div>
      </div>
    </template>
  </Dialog>
</template>

<style scoped lang="scss">
@import '@/assets/demo/styles/badges.scss';

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button-container {
  margin-left: auto;
}
</style>
