<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <q-page class="login-page bg-main">
        <q-card class="login-card">
          <q-card-section>
            <q-img src="https://example.com/logo.png" class="logo" />
            <div class="login-title">Masuk</div>
            <div class="login-subtitle">aplikasi geovet</div>
          </q-card-section>

          <q-card-section>
            <q-form @submit="login">
              <q-input
                filled
                v-model="username"
                label="Nama Pengguna / Email"
                type="email"
                placeholder="example@gmail.com"
                dense
                class="q-mb-md"
              />
              <q-input
                filled
                v-model="password"
                label="Kata Sandi"
                type="password"
                placeholder="kata sandi anda"
                dense
                class="q-mb-md"
              >
                <template v-slot:append>
                  <q-btn
                    flat
                    round
                    color="primary"
                    icon="visibility"
                    @click="togglePasswordVisibility"
                  />
                </template>
              </q-input>

              <q-btn
                label="Masuk"
                color="primary"
                type="submit"
                class="full-width q-mb-md"
              />
              <q-btn
                flat
                label="Lupa kata sandi?"
                color="primary"
                class="forgot-password"
                @click="forgotPassword()"
              />
            </q-form>
          </q-card-section>

          <q-card-section class="q-mt-md">
            <div class="register-link">
              Belum punya akun? <a href="/register">Daftar</a>
            </div>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";

const username = ref("");
const password = ref("");
const showPassword = ref(false);

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const login = async () => {
  // Handle login logic here
  const dataLogin = {
    username: username.value,
    password: password.value,
  };
  const res = await store.dispatch("login/loginUser", dataLogin);
  if (res) {
    router.push("/");
  }
};

const forgotPassword = () => {
  router.push("/forgot-password");
};
</script>

<style lang="scss" scoped>
// .login-page {
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 100vh;
// }

// .login-card {
//   background: #fff;
//   padding: 2rem;
//   border-radius: 8px;
//   box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1); // Adjust this value for a stronger or softer shadow
//   text-align: center;
//   width: 100%;
//   max-width: 400px;
// }

// .logo {
//   display: block;
//   margin: 0 auto 20px;
//   width: 150px;
// }

// .login-title {
//   font-size: 24px;
//   font-weight: bold;
//   text-align: center;
//   margin-bottom: 10px;
// }

// .login-subtitle {
//   font-size: 14px;
//   color: #6c757d;
//   text-align: center;
//   margin-bottom: 20px;
// }

// .q-form {
//   .q-input {
//     margin-bottom: 15px;
//   }

//   .q-btn.full-width {
//     width: 100%;
//   }

//   .forgot-password {
//     display: block;
//     text-align: right;
//     font-size: 14px;
//     color: #007bff;
//   }
// }

// .register-link {
//   text-align: center;
//   font-size: 14px;
//   a {
//     color: #007bff;
//     text-decoration: none;
//   }
// }
</style>
