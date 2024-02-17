<script setup>
import ProductService from '@/service/ProductService';
import PhotoService from '@/service/PhotoService';
import {ref, onMounted} from 'vue';
import {getListProduct} from "@/service/AddProductService";

const products = ref([]);
const images = ref([]);
const carouselResponsiveOptions = ref([
  {
    breakpoint: '1024px',
    numVisible: 3,
    numScroll: 3
  },
  {
    breakpoint: '768px',
    numVisible: 2,
    numScroll: 2
  },
  {
    breakpoint: '560px',
    numVisible: 1,
    numScroll: 1
  }
]);

const productService = new ProductService();
const photoService = new PhotoService();

async function getAllProduct() {
  try {
    const response = await getListProduct();
    products.value = response.map(item => ({
      category: item.productCategory,
      description: item.description,
      id: item.id,
      image: item.image,
      status: item.status,
      name: item.name,
      price: item.price
    }));
  } catch (e) {
    console.error(e);
  }
}

onMounted(() => {
  getAllProduct()
  // console.log(products.value)
  // productService.getProductsSmall().then((data) => (products.value = data));
  // photoService.getImages().then((data) => (images.value = data));
});
</script>

<template>
  <div class="grid p-fluid">
    <div class="col-12">
      <div class="card">
        <h5>Carousel</h5>
        <Carousel :value="products" :numVisible="3" :numScroll="3" :circular="false"
                  :responsiveOptions="carouselResponsiveOptions">
          <template #item="{ data: product }">
            <div class="product-item">
              <div class="product-item-content">
                <div class="mb-3">
                  <img style="width: 500px; height: 600px"
                       v-if="product.image && product.image.image"
                       :src="'data:image/png;base64,' + product.image.image"/></div>
                <div>
                  <h4 class="mb-1">
                    {{ product.name }}
                  </h4>
                  <h6 class="mt-0 mb-3">${{ product.price }}</h6>
                </div>
              </div>
            </div>
          </template>
        </Carousel>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
@import '@/assets/demo/styles/badges.scss';
@import '@/assets/demo/styles/items.scss';
</style>
