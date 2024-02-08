<template>
  <div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
    <div class="flex flex-column align-items-center justify-content-center">
      <img :src="logoUrl" alt="Sakai logo" class="mb-5 w-6rem flex-shrink-0" />
      <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
        <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
          <div class="text-center mb-5">
            <div class="text-900 text-3xl font-medium mb-3">Register!</div>
            <span class="text-600 font-medium">Please, log in</span>
          </div>
          <div>
              <label for="email1" class="block text-900 text-xl font-medium mb-2">Username</label>
              <InputText id="email1" v-model="userForm.username" type="text" placeholder="Username" class="w-full md:w-30rem mb-5" style="padding: 1rem" />

              <label for="email1" class="block text-900 text-xl font-medium mb-2">Email</label>
              <InputText id="email1" v-model="userForm.email" type="text" placeholder="Email" class="w-full md:w-30rem mb-5" style="padding: 1rem" />

              <label for="password1" class="block text-900 font-medium text-xl mb-2">Password</label>
              <Password
                  id="password1"
                  v-model="userForm.password"
                  placeholder="Password"
                  class="w-full mb-3"
                  inputClass="w-full"
              >
              </Password>

              <label for="password1" class="block text-900 font-medium text-xl mb-2">Confirm Password</label>
              <Password
                  id="password1"
                  v-model="userForm.confirmPassword"
                  placeholder="Password"
                  class="w-full mb-3"
                  inputClass="w-full"
              >
              </Password>

              <div class="flex align-items-center justify-content-between mb-5 gap-5">
                <RouterLink to="/auth/login" class="p-link layout-topbar-button">
                  <i class="pi pi-user"></i>
                  <span>Авторизация</span>
                </RouterLink>
              </div>
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
    const { layoutConfig } = useLayout();

    const logoUrl = computed(() => {
      return `layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.png`;
    });

    const toast = useToast();
    const router = useRouter();

    return {
      logoUrl,
      toast,
      router
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
        confirmPassword: null
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
