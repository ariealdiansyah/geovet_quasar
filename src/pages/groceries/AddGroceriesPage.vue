<template>
  <q-page class="bg-white q-py-xl q-px-xl">
    <div class="row text-title-menu items-center q-mb-md">
      <q-icon name="assignment_turned_in" class="text-weight-bold" size="32px" />
      <span class="q-mx-md">Add Groceries</span>
    </div>
    <div class="container q-pa-sm">
      <q-form class="q-mt-md" @submit="addGroceries">
        <div class="row q-gutter-x-lg q-mt-lg">
          <div class="col-md-6 col-sm-12">
            <div class="row q-mb-sm items-center">
              <div class="col-3 text-bold text-right">Nama</div>
              <div class="col-6 q-pl-md">
                <span class="custom-input-32">
                  <q-input
                    v-model="name"
                    name="NameGroceries"
                    outlined
                    dense
                    autocomplete="off"
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
                    hide-bottom-space
                  />
                </span>
              </div>
            </div>
            <div class="row q-mb-sm items-center">
              <div class="col-3 text-bold text-right">Type</div>
              <div class="col-6 q-pl-md">
                <span class="custom-select-32">
                  <q-select
                    outlined=""
                    autocomplete="off"
                    dense
                    v-model="type"
                    :options="options"
                    hide-bottom-space=""
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
    </div>
  </q-page>
</template>

<script setup>
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const name = ref("");
const price = ref(0);
const type = ref("");
const stock = ref(0);
const options = ["Dry Food", "Wet Food", "Shampoo", "Food Bowl", "Cat Litter"];

const addGroceries = async () => {
  console.log("Add Groceries", name.value, price.value, type.value, stock.value);
  const res = await store.dispatch("groceries/addData", {
    name: name.value,
    price: price.value,
    type: type.value,
    stock: stock.value,
  });

  if (res) {
    console.log("Sukses Add data");
    router.push("/groceries");
  }
};
</script>
