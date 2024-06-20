<template>
  <q-page class="bg-white q-py-xl q-px-xl">
    <div class="row text-title-menu items-center q-mb-md">
      <q-icon name="assignment_turned_in" class="text-weight-bold" size="32px" />
      <span class="q-mx-md">Edit Groceries</span>
    </div>
    <q-form class="q-mt-md" @submit="editGroceries">
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
                  filled
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
                  filled
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
                  filled
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
                class="q-mr-md"
                name="backButton"
                unelevated
                no-caps
                color="secondary"
                label="Back"
                @click.prevent="back()"
              />
              <q-btn
                name="AddGroceries"
                unelevated
                no-caps
                color="primary"
                label="Edit Groceries"
                type="submit"
              />
            </div>
          </div>
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { onMounted, computed, ref } from "vue";

const route = useRoute();
const store = useStore();
const router = useRouter();
const options = ["Dry Food", "Wet Food", "Shampoo", "Food Bowl", "Cat Litter"];

const editGroceries = async () => {
  // router.push(`${route.params.id}/edit`);
  // console.log("aya data ", dataDetail);
  const res = await store.dispatch("groceries/editData", {
    id: route.params.id,
    value: dataDetail.value,
  });
  if (res) {
    router.push("/groceries");
  }
};

const back = () => {
  router.back();
};

const name = computed({
  get() {
    return store.state.groceries.dataDetail.name || "";
  },
  set(value) {
    store.commit("groceries/setDataTempEdit", {
      type: "name",
      value: value,
    });
  },
});

const price = computed({
  get() {
    return store.state.groceries.dataDetail.price || 0;
  },
  set(value) {
    store.commit("groceries/setDataTempEdit", {
      type: "price",
      value: value,
    });
  },
});

const type = computed({
  get() {
    return store.state.groceries.dataDetail.type || "";
  },
  set(value) {
    store.commit("groceries/setDataTempEdit", {
      type: "type",
      value: value,
    });
  },
});

const stock = computed({
  get() {
    return store.state.groceries.dataDetail.stock || "";
  },
  set(value) {
    store.commit("groceries/setDataTempEdit", {
      type: "stock",
      value: value,
    });
  },
});

const dataDetail = computed(() => store.state.groceries.dataDetail);
// const dataTemp = computed(() => store.state.groceries.dataTemp);

onMounted(async () => {
  const res = await store.dispatch("groceries/getDetail", route.params.id);
  // console.log("dataDetail detail", dataDetail);
  // if (res) {
  //   dataTemp.value = { ...dataDetail };
  // }
});
</script>
