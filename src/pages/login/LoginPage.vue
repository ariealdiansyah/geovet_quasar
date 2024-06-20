<template>
  <q-layout view="hHh lpR fFf" class="bg-main">
    <q-page-container>
      <q-page class="q-px-lg bg-main">
        <div class="flex height-page q-pa-sm justify-center items-center">
          <div class="bg-white text-primary q-pa-sm login-card">
            <div class="row text-title-menu justify-center items-center">
              <span class="q-mx-md">{{ title }}</span>
            </div>
            <q-form
              autocorrect="off"
              autocapitalize="off"
              autocomplete="off"
              spellcheck="false"
              class="q-mt-md"
              @submit.prevent="login"
            >
              <div class="row q-mt-lg">
                <div class="col-12 q-px-md">
                  <div class="row q-mb-sm items-center">
                    <div class="col-md-4 col-sm-4 col-xs-12 text-bold text-center">
                      Username
                    </div>
                    <div class="col-md-8 col-sm-8 col-xs-12 q-pl-md">
                      <q-input
                        v-model="username"
                        name="username"
                        outlined
                        dense
                        hide-bottom-space
                      />
                    </div>
                  </div>
                  <div class="row q-mb-sm items-center">
                    <div class="col-md-4 col-sm-4 col-xs-12 text-bold text-center">
                      Password
                    </div>
                    <div class="col-md-8 col-sm-8 col-xs-12 q-pl-md">
                      <q-input
                        v-model="password"
                        name="password"
                        type="password"
                        outlined
                        dense
                        hide-bottom-space
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="row q-mt-sm q-pl-md">
                <div class="col-12 q-px-md">
                  <div class="row q-mb-sm items-center">
                    <div class="col-md-4 col-sm-4" />
                    <div class="col-md-8 col-sm-8 q-pl-xs">
                      <div class="row q-gutter-x-md">
                        <q-btn
                          name="ButtonSubmit"
                          unelevated
                          no-caps
                          color="primary"
                          type="submit"
                          label="Login"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </q-form>
            <div class="row text-dark q-mt-xl">
              <span class="q-mx-md"
                >If you don't have account, please sign up with this button below</span
              >
            </div>
            <div class="row q-gutter-x-md q-pa-md">
              <q-btn
                name="ButtonSubmit"
                unelevated
                no-caps
                color="primary"
                type="submit"
                label="Sign Up"
                @click.prevent="signUp()"
              />
            </div>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const title = ref("Login");
const username = ref("");
const password = ref("");
const router = useRouter();

onMounted(async () => {
  await localStorage.removeItem("authUser");
  await localStorage.clear();
});

const login = async () => {
  const dataLogin = {
    username: username.value,
    password: password.value,
  };
  const res = await store.dispatch("login/loginUser", dataLogin);
  console.log('login page',res)
  if (res) {
    console.log('masuk if has res login page',res)
    router.push("/");
  }
};

const signUp = () => {
  // console.log("signUp", username.value, password.value);
};
</script>
