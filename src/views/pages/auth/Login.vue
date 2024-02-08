<template>
  <div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
    <Toast />
    <div class="flex flex-column align-items-center justify-content-center">
      <img :src="logoUrl" alt="Sakai logo" class="mb-5 w-6rem flex-shrink-0" />
      <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
        <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
          <div class="text-center mb-5">
            <div class="text-900 text-3xl font-medium mb-3">Welcome to Dear!</div>
            <span class="text-600 font-medium">Please, log in</span>
          </div>
          <div>
              <label for="email1" class="block text-900 text-xl font-medium mb-2">Username</label>
              <InputText id="email1" v-model="userForm.pin" type="text" placeholder="Username" class="w-full md:w-30rem mb-5" style="padding: 1rem" />
              <label for="password1" class="block text-900 font-medium text-xl mb-2">Password</label>
              <Password
                  id="password1"
                  v-model="userForm.password"
                  placeholder="Password"
                  class="w-full mb-3"
                  inputClass="w-full"
              >
              </Password>
              <label for="email1" class="block text-900 text-xl font-medium mb-2">Filial</label>
              <InputText id="email1" type="text" placeholder="Filial" class="w-full md:w-30rem mb-5" style="padding: 1rem" v-model="userForm.filCode" />

<!--              <div class="flex align-items-center justify-content-between mb-5 gap-5">-->
<!--                <p>Нет аккаунта?</p>-->
<!--                <RouterLink to="/auth/register" class="p-link layout-topbar-button">-->
<!--                  <i class="pi pi-user"></i>-->
<!--                  <span>Регистрация</span>-->
<!--                </RouterLink>-->
<!--              </div>-->
              <Button :disabled="loading" @click="handleLogin()" type="submit" label="Войти" class="w-full p-3 text-xl"></Button>

          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <AppConfig simple /> -->
</template>

<script setup>
import { useLayout } from '@/layout/composables/layout';
import {ref, computed, reactive} from 'vue';
import AppConfig from '@/layout/AppConfig.vue';
import { useToast } from 'primevue/usetoast';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const { layoutConfig } = useLayout();
const checked = ref(false);

const logoUrl = computed(() => {
  return `layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.png`;
});

const toast = useToast();
const router = useRouter();
const store = useStore();

const loading = ref(false);
const userForm = reactive({
  pin: '',
  password: '',
  filCode: '',
});

const handleLogin = async () => {
  loading.value = true;

  const response = await store.dispatch('auth/signIn', userForm)
  if(response.status == 201){
    router.push('/')
  }

}
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
