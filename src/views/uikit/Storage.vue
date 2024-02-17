<script setup>
import {deleteStorage, getListStorage} from "@/service/StorageService";
import {onMounted, ref} from "vue";
import {addStorage} from "@/service/StorageService";
import {useToast} from "primevue/usetoast";
import {useStore} from "vuex";
import {addItemToStorage, getListProduct} from "@/service/AddProductService";

const storageValue = ref([]);
const store = useStore()

async function getAllStorage() {
  try {
    const response = await getListStorage();
    storageValue.value = response.map(item => ({
      nameStorage: item.name,
      storageCode: item.storageCode,
      id: item.id,
      address: item.address,
      storageItems: item.storageItems
    }));
  } catch (e) {
    console.error(e);
  }
}

const modalVisible = ref(false);
// Объект для хранения нового хранилища
const newStorage = ref({
  name: '',
  address: '',
  storageCode: ''
});

function openModal() {
  modalVisible.value = true;
}

function closeModal() {
  modalVisible.value = false;
}

async function saveStorage() {
  try {
    const response = await addStorage(newStorage.value);
    toast.add({severity: 'success', summary: 'Storage added successfully!', life: 3000});
    console.log("Storage successfully added:", response);
    await getAllStorage();
    closeModal();
    newStorage.value = { name: '',
      address: '',
      storageCode: '' };

  } catch (error) {
    console.error("Error while adding storage:", error);
    toast.add({severity: 'error', summary: 'Failed to added storage', life: 3000});

  }
}
const toast = useToast();

async function removeStorage(data) {
  try {
    await deleteStorage(data);
    toast.add({severity: 'success', summary: 'Storage deleted successfully!', life: 3000});
    await getAllStorage();
    console.log("Storage successfully deleted");
  } catch (error) {
    console.error("Error while deleting storage:", error);
    toast.add({severity: 'error', summary: 'Failed to added storage', life: 3000});

  }
}
// Добавленные состояния и методы для управления модальным окном добавления товаров
const addGoodsModalVisible = ref(false);
const selectedProduct = ref(null);
const quantity = ref('');
// Вспомогательный массив для выбора продуктов
const productOptions = ref([]);
const selectedStorageId = ref(null);
function openAddGoodsModal(storageId) {
  addGoodsModalVisible.value = true;
  selectedStorageId.value = storageId;
}

function closeAddGoodsModal() {
  addGoodsModalVisible.value = false;
}

async function addGoodsToStorage() {
  try {
    // Проверяем, выбран ли продукт и указано ли количество
    if (!selectedProduct.value || !quantity.value || !selectedStorageId.value) {
      throw new Error('Please select a product, specify the quantity, and provide the storage ID.');
    }

    // Вызываем функцию addItemToStorage() с необходимыми параметрами
    await addItemToStorage(selectedProduct.value.id, quantity.value, selectedStorageId.value);

    console.log('Goods added to storage:', selectedProduct.value, quantity.value);
    // После успешного добавления, закрываем модальное окно
    closeAddGoodsModal();
  } catch (error) {
    console.error('Error while adding goods:', error);
    toast.add({severity: 'error', summary: 'Failed to add goods', life: 3000});
  }
}





onMounted(async () => {
  await getAllStorage()
  try {
    productOptions.value = await getListProduct();
  } catch (error) {
    console.error("Error loading product list:", error);
    toast.add({severity: 'error', summary: 'Failed to load product list', life: 3000});
  }
});

</script>
<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <h5>Storages</h5>
        <DataTable
            :value="storageValue"
            :paginator="true"
            class="p-datatable-gridlines"
            :rows="10"
            dataKey="id"
            :rowHover="true"
            filterDisplay="menu"
            responsiveLayout="scroll"
            :globalFilterFields="['name', 'country.name', 'representative.name', 'balance', 'status']"
        >
          <template #header>
            <div class="flex justify-content-between flex-column sm:flex-row">
              <Button type="button" label="Add new storage" class="p-button-outlined mb-2" @click="openModal()"/>
            </div>
          </template>
          <Toast/>
          <Column field="name" header="Name Storage" style="min-width: 12rem">
            <template #body="{ data }">
              {{ data.nameStorage }}
            </template>
          </Column>
          <Column header="Address" dataType="date" style="min-width: 10rem">
            <template #body="{ data }">
              {{ data.address }}
            </template>
          </Column>
          <Column header="Storage code" dataType="numeric" style="min-width: 10rem">
            <template #body="{ data }">
              {{ data.storageCode }}
            </template>
          </Column>
          <Column style="width: 6rem;  justify-content: center; align-items: center;" class="text-center whitespace-nowrap border-b dark:border-dark-5">
            <template #body="{ data }">
              <div style="display: flex;">
                <Button label="Add goods" @click="openAddGoodsModal(data.id)" class="p-button-outlined p-button-secondary p-button-sm mr-2 mb-2" style="font-size: 10px; padding: 4px 8px;"/>
                <Button label="Delete"  @click="removeStorage(data.id)" class="p-button-outlined p-button-danger p-button-sm mr-2 mb-2" style="font-size: 10px; padding: 4px 8px;"/>
              </div>
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </div>
  <!-- Модальное окно -->
  <Dialog v-model="modalVisible" :visible="modalVisible" :modal="true" header="Add New Storage" :closable="false">
    <!-- Форма добавления нового хранилища -->
    <div class="p-fluid">
      <div class="p-field mb-3">
        <label for="name" class="label-bold">Name Storage</label>
        <InputText id="name" v-model="newStorage.name" class="p-inputtext-lg p-d-block"/>
      </div>
      <div class="p-field mb-3">
        <label for="address" class="label-bold">Address</label>
        <InputText id="address" v-model="newStorage.address" class="p-inputtext-lg p-d-block"/>
      </div>
      <div class="p-field mb-3">
        <label for="storageCode" class="label-bold">Storage code</label>
        <InputText id="storageCode" v-model="newStorage.storageCode" class="p-inputtext-lg p-d-block"/>
      </div>
    </div>

    <!-- Кнопки внизу модального окна -->
    <template #footer>
      <div class="p-grid p-justify-between">
        <div class="p-col">
          <Button label="Cancel" class="p-button-text" @click="closeModal()"/>
        </div>
        <div class="p-col">
          <Button label="Save" class="p-button" @click="saveStorage()"/>
        </div>
      </div>
    </template>
  </Dialog>

  <!-- Добавление модального окна для добавления товаров -->
  <Dialog v-model="addGoodsModalVisible" :visible="addGoodsModalVisible" :modal="true" header="Add Goods" :closable="false">
    <!-- Форма добавления товаров -->
    <div class="p-fluid">
      <div class="p-field mb-3">
        <label for="product" class="label-bold">Product</label>
        <Dropdown id="product" v-model="selectedProduct" :options="productOptions" optionLabel="name" class="p-inputtext-lg p-d-block"/>
      </div>
      <div class="p-field mb-3">
        <label for="quantity" class="label-bold">Quantity</label>
        <InputText id="quantity" v-model="quantity" class="p-inputtext-lg p-d-block"/>
      </div>
    </div>

    <!-- Кнопки внизу модального окна -->
    <template #footer>
      <div class="p-grid p-justify-between">
        <div class="p-col">
          <Button label="Cancel" class="p-button-text" @click="closeAddGoodsModal()"/>
        </div>
        <div class="p-col">
          <Button label="Add" class="p-button" @click="addGoodsToStorage(id)"/>
        </div>
      </div>
    </template>
  </Dialog>

</template>

<style scoped lang="scss">
::v-deep(.p-datatable-frozen-tbody) {
  font-weight: bold;
}

::v-deep(.p-datatable-scrollable .p-frozen-column) {
  font-weight: bold;
}

.label-bold {
  font-weight: bold;
}
</style>
