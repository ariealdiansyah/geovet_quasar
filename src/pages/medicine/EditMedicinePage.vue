<template>
  <q-page class="bg-white q-py-xl q-px-xl">
    <div class="row text-title-menu items-center q-mb-md">
      <q-icon name="local_hospital" class="text-weight-bold" size="32px" />
      <span class="q-mx-md">Edit Medicine</span>
    </div>
    <!-- <div class="container q-pa-sm">
      <q-form class="q-mt-md" @submit="addMedicine">
        <div class="row q-gutter-x-lg q-mt-lg">
          <div class="col-md-6 col-sm-12">
            <div class="row q-mb-sm items-center">
              <div class="col-3 text-bold text-right">Nama Obat</div>
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
                  />
                </span>
              </div>
            </div>
            <div class="row q-mb-sm items-center">
              <div class="col-3 text-bold text-right">Harga</div>
              <div class="col-6 q-pl-md">
                <span class="custom-input-32">
                  <q-input
                    v-model="price"
                    name="NameGroceries"
                    outlined
                    dense
                    autocomplete="off"
                    :error="isError"
                    :error-message="errorMessage"
                    hide-bottom-space
                  />
                </span>
              </div>
            </div>
            <div class="row q-mb-sm items-center">
              <div class="col-3 text-bold text-right">Type</div>
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
                  />
                </span>
              </div>
            </div>
            <div class="row q-mb-sm items-center">
              <div class="col-3 text-bold text-right">Stok</div>
              <div class="col-6 q-pl-md">
                <span class="custom-input-32">
                  <q-input
                    v-model="stock"
                    name="NameGroceries"
                    outlined
                    dense
                    autocomplete="off"
                    :error="isError"
                    :error-message="errorMessage"
                    hide-bottom-space
                  />
                </span>
              </div>
            </div>
            <div class="row q-mb-sm items-center">
              <div class="col-3 text-bold text-right">Manfaat Obat</div>
              <div class="col-6 q-pl-md">
                <span class="custom-input-32">
                  <q-input
                    v-model="benefits"
                    name="NameGroceries"
                    outlined
                    dense
                    autocomplete="off"
                    :error="isError"
                    :error-message="errorMessage"
                    hide-bottom-space
                  />
                </span>
              </div>
            </div>
            <div class="row q-mb-sm items-center">
              <div class="col-3 text-bold text-right">Bentuk Obat</div>
              <div class="col-6 q-pl-md">
                <span class="custom-input-32">
                  <q-input
                    v-model="piece_units"
                    name="piece_units"
                    outlined
                    dense
                    autocomplete="off"
                    :error="isError"
                    :error-message="errorMessage"
                    hide-bottom-space
                  />
                </span>
              </div>
            </div>
            <div class="row q-mb-sm items-center">
              <div class="col-3 text-bold text-right">Mode Penjualan Obat</div>
              <div class="col-6 q-pl-md">
                <span class="custom-input-32">
                  <q-input
                    v-model="retail_piece_units"
                    name="retail_piece_units"
                    outlined
                    dense
                    autocomplete="off"
                    :error="isError"
                    :error-message="errorMessage"
                    hide-bottom-space
                  />
                </span>
              </div>
            </div>
            <div class="row q-mb-sm items-center">
              <div class="col-3 text-bold text-right">
                Jumlah penjualan dalam per satuan obat
              </div>
              <div class="col-6 q-pl-md">
                <span class="custom-input-32">
                  <q-input
                    v-model="per_retail_used"
                    name="per_retail_used"
                    outlined
                    dense
                    autocomplete="off"
                    :error="isError"
                    :error-message="errorMessage"
                    hide-bottom-space
                  />
                </span>
              </div>
            </div>
            <div class="row q-mb-sm items-center">
              <div class="col-3 text-bold text-right">
                Jumlah penjualan maksimal dalam per satuan obat
              </div>
              <div class="col-6 q-pl-md">
                <span class="custom-input-32">
                  <q-input
                    v-model="max_piece_units"
                    name="max_piece_units"
                    outlined
                    dense
                    autocomplete="off"
                    :error="isError"
                    :error-message="errorMessage"
                    hide-bottom-space
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
// const store = useStore();
// const router = useRouter();
// const name = computed({
//   get() {
//     return store.state.groceries.data.name;
//   },
//   set(value) {
//     store.commit("groceries/setData", { name: value });
//   },
// });

onMounted(async () => {
  console.log("route", route.params.id);
  // const res = await store.dispatch("medicine/detail", route.params.id);
  // if (res) {
  // data.value = res;
  // }
});
</script>
