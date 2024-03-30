<template>
  <q-page class="bg-white q-py-xl q-px-xl">
    <div class="row text-title-menu items-center q-mb-md">
      <q-icon name="local_hospital" class="text-weight-bold" size="32px" />
      <span class="q-mx-md">Detail Pets</span>
    </div>
    <!-- <div class="container q-pa-sm">
      <q-form class="q-mt-md" @submit="addPets">
        <div class="row q-gutter-x-lg q-mt-lg">
          <div class="col-md-6 col-sm-12">
            <div class="row q-mb-sm items-center">
              <div class="col-3 text-bold text-right">Nama Hewan</div>
              <div class="col-6 q-pl-md">
                <span class="custom-input-32">
                  <q-input
                    v-model="name"
                    name="NameGroceries"
                    outlined
                    dense
                    autocomplete="off"
                    :error="isError"
                    :error-message="errorMessage"
                    hide-bottom-space
                    disable
                  />
                </span>
              </div>
            </div>
            <div class="row q-mb-sm items-center">
              <div class="col-3 text-bold text-right">Nama Pemilik</div>
              <div class="col-6 q-pl-md">
                <span class="custom-input-32">
                  <q-input
                    v-model="ownerName"
                    name="NameGroceries"
                    outlined
                    dense
                    autocomplete="off"
                    :error="isError"
                    :error-message="errorMessage"
                    hide-bottom-space
                    disable
                  />
                </span>
              </div>
            </div>
            <div class="row q-mb-sm items-center">
              <div class="col-3 text-bold text-right">Jenis</div>
              <div class="col-6 q-pl-md">
                <span class="custom-input-32">
                  <q-input
                    v-model="type"
                    name="NameGroceries"
                    outlined
                    dense
                    autocomplete="off"
                    :error="isError"
                    :error-message="errorMessage"
                    hide-bottom-space
                    disable
                  />
                </span>
              </div>
            </div>
            <div class="row q-mb-sm items-center">
              <div class="col-3 text-bold text-right">Ciri - Ciri</div>
              <div class="col-6 q-pl-md">
                <span class="custom-input-32">
                  <q-input
                    v-model="characteristic"
                    name="NameGroceries"
                    outlined
                    dense
                    autocomplete="off"
                    :error="isError"
                    :error-message="errorMessage"
                    hide-bottom-space
                    disable
                  />
                </span>
              </div>
            </div>
            <div class="row q-mb-sm items-center">
              <div class="col-3"></div>
              <div class="col-6 q-pl-md">
                <q-btn
                  name="AddGroceries"
                  unelevated
                  no-caps
                  color="primary"
                  label="Add Groceries"
                  type="submit"
                />
              </div>
            </div>
          </div>
        </div>
      </q-form>
    </div> -->
  </q-page>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { onMounted, ref } from "vue";

const route = useRoute();
const store = useStore();
const router = useRouter();
const data = ref();

onMounted(async () => {
  console.log("route", route.params.id);
  // const res = await store.dispatch("pets/detail", route.params.id);
  // if (res) {
  // data.value = res;
  // }
});
</script>
