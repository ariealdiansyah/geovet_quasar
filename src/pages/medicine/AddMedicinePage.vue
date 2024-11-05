<template>
  <q-page class="q-py-xl q-px-xl bg-main">
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
      <span class="q-mx-md">Add Medicine</span>
    </div>
    <div class="container q-pa-sm">
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
              <div class="col-3 text-bold text-right">Harga Beli</div>
              <div class="col-6 q-pl-md">
                <span class="custom-input-32">
                  <q-input
                    v-model.number="buyPrice"
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
                    v-model.number="price"
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
                    v-model="type"
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
import { useRouter } from "vue-router";
import { ref } from "vue";
import { useStore } from "vuex";
import { showNotification } from "src/utils/ui";

const store = useStore();
const router = useRouter();

const name = ref("");
const price = ref(0);
const type = ref("");
const buyPrice = ref(0);
const isError = ref(false);
const errorMessage = ref("");
const options = ["Inject", "Syrup", "Tablet", "Capsule", "Consultation"];

const addMedicine = async () => {
  const res = await store.dispatch("medicine/addData", {
    name: name.value,
    price: price.value,
    type: type.value,
    buyPrice: buyPrice.value,
  });

  if (res) {
    showNotification({
      message: "Sukses tambah data obat baru",
      color: "positive",
      icon: "task_alt",
    });
    router.push("/medicine");
  }
};
</script>
