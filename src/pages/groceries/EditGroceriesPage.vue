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
      <span class="q-mx-md">Edit Petshop</span>
    </div>
    <q-form class="q-mt-md" @submit="editGroceries">
      <div class="row q-gutter-x-lg q-mt-lg">
        <div class="col-md-6 col-sm-12">
          <div class="row q-mb-sm items-center">
            <div class="col-3 text-bold text-right">Nama</div>
            <div class="col-6 q-pl-md">
              <span class="custom-input-32">
                <q-input
                  v-model="editData.name"
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
                  v-model.number="editData.buyPrice"
                  name="NameGroceries"
                  type="number"
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
                  v-model.number="editData.price"
                  name="NameGroceries"
                  type="number"
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
                  outlined
                  autocomplete="off"
                  dense
                  v-model="editData.type"
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
                  v-model.number="editData.stock"
                  name="NameGroceries"
                  type="number"
                  dense
                  outlined
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
import { onMounted, ref } from "vue";
import { showNotification } from "src/utils/ui";

const route = useRoute();
const store = useStore();
const router = useRouter();
const options = ["Dry Food", "Wet Food", "Shampoo", "Food Bowl", "Cat Litter"];
const editData = ref({});

const editGroceries = async () => {
  const res = await store.dispatch("groceries/editData", { ...editData.value });
  if (res) {
    showNotification({
      message: `Sukses edit data ${editData.value.name} `,
      color: "positive",
      icon: "task_alt",
    });
    router.push("/groceries");
  }
};

const back = () => {
  router.back();
};

onMounted(async () => {
  // const res = await store.dispatch("groceries/getDetail", route.params.id);
  await store.dispatch("groceries/getDetail", route.params.id);
  const data = store.getters["groceries/getDetail"];
  editData.value = { ...data };
});
</script>
