<template>
  <div class="card m-3 border-1 surface-border">
    <div class="flex align-items-center justify-content-between">
<!--      <img style="width: 140px; height: 100px"-->
<!--           :src="'data:image/png;base64,' + product.image.image"/>-->
      <img style="width: 500px; height: 600px"
           v-if="product.image && product.image.image"
           :src="'data:image/png;base64,' + product.image.image"/>
      <div class="font-semi-bold">{{ product.category == null ? '' : product.category.nameCategory }}</div>
      <div>{{ product.description }}</div>
      <div class="text-2xl font-semi-bold">${{ product.price }}</div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, reactive, ref} from "vue";
import {useRoute} from "vue-router";
import {getListProduct} from "@/service/AddProductService";

const route = useRoute();

const id = Number(route.query.id);

const product = reactive({
  id: null,
  category: null,
  price: null,
  image: null,
  description: null
})

const productList = ref([])

const getAllProduct = async () => {
  await getListProduct().then(response => {
    let products = []
    for (let i = 0; i < response.length; i++) {
      let item = response[i]
      products.push({
        category: item.category,
        description: item.description,
        id: item.id,
        image: item.image,
        inventoryStatus: item.status,
        // name: 'null',
        price: item.price
      })
    }

    productList.value = products
  })
}
const getProductById = async () => {
  const foundProduct = productList.value.find((item) => item.id === id);
  product.category = foundProduct.category
  product.description = foundProduct.description;
  product.price = foundProduct.price;
  product.id = foundProduct.id;
  product.image = foundProduct.image;
}

onMounted(async () => {
  await getAllProduct()
  await getProductById()
})

</script>

