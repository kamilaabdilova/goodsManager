<template>
  <div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
    <div class="flex flex-column align-items-center justify-content-center">

      <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
        <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
          <div class="text-center mb-5">
            <div class="text-900 text-3xl font-medium mb-3">Register!</div>
            <span class="text-600 font-medium">Please register a client</span>
          </div>
          <div>
              <label for="email1" class="block text-900 text-xl font-medium mb-2">Surname</label>
              <InputText id="email1" v-model="userForm.username" type="text" placeholder="Username" class="w-full md:w-30rem mb-5" style="padding: 1rem" />

              <label for="email1" class="block text-900 text-xl font-medium mb-2">Name</label>
              <InputText id="email1" v-model="userForm.email" type="text" placeholder="Email" class="w-full md:w-30rem mb-5" style="padding: 1rem" />

            <label for="email1" class="block text-900 text-xl font-medium mb-2">Patronymic</label>
            <InputText id="email1" v-model="userForm.email" type="text" placeholder="Email" class="w-full md:w-30rem mb-5" style="padding: 1rem" />


            <label for="status" class="block text-900 text-xl font-medium mb-2">Type of Client</label>
            <Dropdown v-model="userForm.typeOfClient" :options="typesClients" optionLabel="name" placeholder="Category" class="w-full mb-5" />

            <label for="status" class="block text-900 text-xl font-medium mb-2">Discount</label>
            <Dropdown v-model="userForm.discount" :options="discountForClients" optionLabel="name" placeholder="Category" class="w-full mb-5" />

              <Button :disabled="loading" @click="registerUser" label="Зарегистрироваться" class="w-full p-3 text-xl"></Button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <AppConfig simple /> -->
</template>

<script>
import { useLayout } from '@/layout/composables/layout';
import { ref, computed } from 'vue';
import AppConfig from '@/layout/AppConfig.vue';
import { useToast } from 'primevue/usetoast';
import UserService from "@/service/UserService";
import {useRouter} from "vue-router";

export default {

  setup() {
    const typesClients = ref([
      { name: 'Legal', code: '1' },
      { name: 'Individual', code: '2' },
    ]);

    // Опции для выпадающего списка Discount
    const discountForClients = ref([
      { name: 'bronze', code: '1', percentage: '5'},
      { name: 'silver', code: '2', percentage: '10'},
      { name: 'gold', code: '3', percentage: '15' },
      { name: 'no discount', code: '4', percentage: '0'}
    ]);
    const { layoutConfig } = useLayout();

    const logoUrl = computed(() => {
      return `layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.png`;
    });

    const toast = useToast();
    const router = useRouter();

    return {
      logoUrl,
      toast,
      router,
      typesClients,
      discountForClients
    };
  },
  name: 'register',
  components: {
    AppConfig,
    UserService
  },
  data() {
    return {
      loading: false,
      userForm: {
        username: null,
        email: null,
        password: null,
        confirmPassword: null,
        typeOfClient: null,
        discount: null
      }
    };
  },
  methods: {
    async registerUser() {
        try {
          console.log('we are here')
          console.log(this.userForm.username, this.userForm.email, this.userForm.password, this.userForm.confirmPassword)
          const response = await UserService.registerUser(this.userForm.username, this.userForm.email, this.userForm.password, this.userForm.confirmPassword);
          this.toast.add({ severity: 'success', summary: 'Success', detail: response, life: 3000 });
        } catch (error) {
          console.log(error)
          this.toast.add({ severity: 'error', summary: 'Error', detail: error, life: 3000 });
        }
      },
    }
};
</script>

<style scoped>
.pi-eye {
  transform: scale(1.6);
  margin-right: 1rem;
}

.pi-eye-slash {
  transform: scale(1.6);
  margin-right: 1rem;
}
</style>
