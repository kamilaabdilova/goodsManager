<script setup>
import {deleteStorage, getListSupply} from "@/service/StorageService";
import {onMounted, ref} from "vue";
import {addStorage} from "@/service/StorageService";

const storageValue = ref([]);

async function getAllStorage() {
  try {
    const response = await getListSupply();
    storageValue.value = response.map(item => ({
      id: item.id,
      storage: {
        id: item.storage.id,
        name: item.storage.name,
        storageCode: item.storage.storageCode,
        address: item.storage.address,
        storageItems: item.storage.storageItems
      },
      description: item.description
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
    console.log("Storage successfully added:", response);
    await getAllStorage();
    closeModal();
  } catch (error) {
    console.error("Error while adding storage:", error);
  }
}

onMounted(() => {
  getAllStorage()
});

</script>
<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <h5>Supply</h5>
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
          <Column field="storage.name" header="Name Storage" style="min-width: 12rem">
            <template #body="{ data }">
              {{ data.storage.name }}
            </template>
          </Column>
          <Column header="Address" dataType="date" style="min-width: 10rem">
            <template #body="{ data }">
              {{ data.storage.address }}
            </template>
          </Column>
          <Column header="Storage code" dataType="numeric" style="min-width: 10rem">
            <template #body="{ data }">
              {{ data.storage.storageCode }}
            </template>
          </Column>

          <Column header="Wishlist" dataType="numeric" style="min-width: 10rem">
            <template #body="{ data }">
              {{ data.description }}
            </template>
          </Column>
          <Column style="width: 6rem;  justify-content: center; align-items: center;" class="text-center whitespace-nowrap border-b dark:border-dark-5">
            <template #body="{ data }">
              <div style="display: flex;">
                <Button label="Edit" class="p-button-outlined p-button-secondary p-button-sm mr-2 mb-2" style="font-size: 10px; padding: 4px 8px;"/>
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
