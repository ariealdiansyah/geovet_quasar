<template>
  <q-page class="bg-white q-py-xl q-px-xl">
    <div class="row text-title-menu items-center q-mb-md">
      <q-icon name="assignment_turned_in" class="text-weight-bold" size="32px" />
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
const piece_units = ref("");
const stock = ref(0);
const benefits = ref("");
const retail_piece_units = ref("");
const max_piece_units = ref("");
const per_retail_used = ref("");
const isError = ref(false);
const errorMessage = ref("");

const addMedicine = async () => {
  console.log(
    "Add Medicine",
    name.value,
    price.value,
    type.value,
    benefits.value,
    stock.value,
    piece_units.value,
    retail_piece_units.value,
    max_piece_units.value,
    per_retail_used.value
  );

  const res = await store.dispatch("medicine/addData", {
    name: name.value,
    price: price.value,
    type: type.value,
    benefits: benefits.value,
    stock: stock.value,
    piece_units: piece_units.value,
    retail_piece_units: retail_piece_units.value,
    max_piece_units: max_piece_units.value,
    per_retail_used: per_retail_used.value,
  });

  if (res) {
    console.log("Sukses Add data");
    router.push("/medicine");
  }
};
</script>
