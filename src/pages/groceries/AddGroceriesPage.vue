<template>
  <q-page class="bg-white q-py-xl q-px-xl">
    <div class="row text-title-menu items-center q-mb-md">
      <q-btn
        flat
        round
        color="primary"
        icon="arrow_back"
        @click="router.back()"
      />
      <q-icon
        name="assignment_turned_in"
        class="text-weight-bold"
        size="32px"
      />
      <span class="q-mx-md">Add Petshop</span>
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
              <div class="col-3 text-bold text-right">Harga Beli</div>
              <div class="col-6 q-pl-md">
                <span class="custom-input-32">
                  <q-input
                    v-model="buyPrice"
                    name="BuyPriceGroceries"
                    outlined
                    dense
                    autocomplete="off"
                    hide-bottom-space
                    placeholder="0"
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
                    placeholder="0"
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
                    placeholder="0"
                  />
                </span>
              </div>
            </div>
            <div class="row">
              <div class="col-3"></div>
              <div class="col-6 q-pl-md flex justify-between">
                <q-btn
                  name="Back"
                  unelevated
                  no-caps
                  color="accent"
                  label="Back"
                  @click="router.back()"
                />
                <q-btn
                  name="Edit"
                  unelevated
                  no-caps
                  color="primary"
                  label="Add"
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
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { showNotification } from "src/utils/ui";

const store = useStore();
const router = useRouter();

const name = ref("");
const price = ref("");
const buyPrice = ref("");
const type = ref("");
const stock = ref("");
const options = [
  "Dry Food",
  "Wet Food",
  "Shampoo",
  "Food Bowl",
  "Cat Litter",
  "Accesories",
];

const addGroceries = async () => {
  const res = await store.dispatch("groceries/addData", {
    name: name.value,
    price: parseInt(price.value),
    type: type.value,
    stock: parseInt(stock.value),
    buyPrice: parseInt(buyPrice.value),
  });

  if (res) {
    showNotification({
      message: "Sukses tambah data petshop baru",
      color: "positive",
      icon: "task_alt",
    });
    router.push("/groceries");
  }
};

const testOnChange = (value) => {
  type.value = value.label;
};
</script>
