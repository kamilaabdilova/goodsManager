<template>
  <Toast />
      <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
        <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
          <div class="text-center mb-5">
            <div class="text-900 text-3xl font-medium mb-3">Add new product!</div>
          </div>
          <div>
            <FileUpload name="demo[]" customUpload @uploader="customBase64Uploader" :multiple="false" accept="image/*" :maxFileSize="1000000" md:w-30rem mb-5>
              <template #empty>
                <p>Drag and drop files to here to upload.</p>
              </template>
            </FileUpload>
            <label for="description" class="block text-900 text-xl font-medium mb-2 mt-5">Name product</label>
            <input v-model="productData.name" type="text" placeholder="Name product" class="w-full mb-5 " style="padding: 1rem" />

            <label for="price" class="block text-900 text-xl font-medium mb-2">Price</label>
            <input v-model="productData.price" type="number" placeholder="Price" class="w-full mb-5" style="padding: 1rem" />

            <label for="description" class="block text-900 text-xl font-medium mb-2">Description</label>
            <input v-model="productData.description" type="text" placeholder="Description" class="w-full mb-5" style="padding: 1rem" />

            <label for="status" class="block text-900 text-xl font-medium mb-2">Category</label>
            <Dropdown v-model="productData.categoryId" :options="categories" optionLabel="name" placeholder="Category" class="w-full mb-5" />

            <label for="status" class="block text-900 text-xl font-medium mb-2">Status</label>
              <Dropdown v-model="productData.statusId" :options="productStatuses" optionLabel="name" placeholder="Select status" class="w-full mb-5" />
           </div>

        </div>
      </div>
</template>
<script setup>
import {onMounted, reactive, ref} from 'vue';
import * as AddProductService from "@/service/AddProductService";
import { useToast } from 'primevue/usetoast';

import { useRouter } from 'vue-router';
let productData = reactive({
  imageId: '',
  price: '',
  description: '',
  name: '',
  categoryId: null,
  statusId: null,
});
const categories = ref([
  { name: 'PHONE', code: '1' },
  { name: 'TELEVISION', code: '2' },
  { name: 'HEADPHONES', code: '3' },
  { name: 'FRIDGE', code: '4' },
  { name: 'PLATE', code: '5' },
  { name: 'MICROWAVE', code: '6' },
]);
const router = useRouter();
const toast = useToast();
const uploadedImage = ref();

const productStatuses = ref([
  { name: 'IN STOCK', code: '1' },
  { name: 'OUT OF STOCK', code: '2' }
]);

async function addNewProduct(fileId) {
  productData.imageId = fileId
  try {
    const response = await AddProductService.addProduct(productData, productData.statusId.code, productData.categoryId.code);
    productData.imageId = '';
    productData.price = '';
    productData.description = '';
    productData.name = '';
    productData.categoryId = null;
    productData.statusId = null;
    products.value.push(response.data);
    toast.add({ severity: 'success', summary: 'Success', detail: "Product added successfully!", life: 2000 });
  } catch (error) {
    toast.add({ severity: 'error', summary: 'Error', detail: error, life: 2000 });
  }
}

const customBase64Uploader = async (event) => {
  const file = event.files[0]
  const reader = new FileReader();
  let blob = await fetch(file.objectURL).then((r) => r.blob());
  reader.readAsDataURL(blob);
  reader.onloadend = async function () {

    const fileName = file.name;
    const extension = fileName.substring(fileName.lastIndexOf('.') + 1);
    const base64data = reader.result;
    const options = {
      imageName: fileName,
      imageExtension: extension,
      imageData: base64data
    };
    try {
      const result = await AddProductService.uploadImage(options);
      await addNewProduct(result.data)
      toast.add({severity: 'success', summary: 'Success', detail: result, life: 2000});
      productData.image = result;
      await router.push('/uikit/list')
    } catch (error) {
      toast.add({severity: 'error', summary: 'Error', detail: error, life: 2000});
    }
  };
};

const products = ref([]);

onMounted(()=>{

})
</script>

