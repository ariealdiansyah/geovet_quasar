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
      <q-icon name="local_hospital" class="text-weight-bold" size="32px" />
      <span class="q-mx-md">Edit Medicine</span>
    </div>
    <div class="container q-pa-sm">
      <q-form class="q-mt-md" @submit="submitEdit">
        <div class="row q-gutter-x-lg q-mt-lg">
          <div class="col-md-6 col-sm-12">
            <div class="row q-mb-sm items-center">
              <div class="col-3 text-bold text-right">Nama Obat</div>
              <div class="col-6 q-pl-md">
                <span class="custom-input-32">
                  <q-input
                    v-model="editData.name"
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
              <div class="col-3 text-bold text-right">Harga Beli</div>
              <div class="col-6 q-pl-md">
                <span class="custom-input-32">
                  <q-input
                    v-model.number="editData.buyPrice"
                    type="number"
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
              <div class="col-3 text-bold text-right">Harga Jual</div>
              <div class="col-6 q-pl-md">
                <span class="custom-input-32">
                  <q-input
                    v-model.number="editData.price"
                    type="number"
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
                <span class="custom-select-32">
                  <q-select
                    outlined=""
                    autocomplete="off"
                    dense
                    v-model="editData.type"
                    :options="options"
                    hide-bottom-space=""
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
                  label="Edit"
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
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { onMounted, ref } from "vue";

const route = useRoute();
const editData = ref({});
const options = ["Inject", "Syrup", "Tablet", "Capsule"];
const store = useStore();
const router = useRouter();
const isError = ref(false);
const errorMessage = ref("");

onMounted(async () => {
  const res = await store.dispatch("medicine/getDetail", route.params.id);
  const data = store.getters["medicine/getDetail"];
  editData.value = { ...data };
});

const submitEdit = async () => {
  const res = await store.dispatch("medicine/editData", { ...editData.value });
  if (res) {
    showNotification({
      message: `Sukses edit data ${editData.value.name} `,
      color: "positive",
      icon: "task_alt",
    });
    router.push("/medicine");
  }
};
</script>
