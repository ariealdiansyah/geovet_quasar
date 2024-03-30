<template>
  <q-page class="bg-white q-py-xl q-px-xl">
    <div class="row text-title-menu items-center q-mb-md">
      <q-icon name="assignment_turned_in" class="text-weight-bold" size="32px" />
      <span class="q-mx-md">Add Pets</span>
    </div>
    <div class="container q-pa-sm">
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

const name = ref("");
const ownerName = ref("");
const idOwner = ref("");
const type = ref("");
const characteristic = ref("");
const isError = ref(false);
const errorMessage = ref("");

const addPets = async () => {
  console.log("Add Pets", name.value, ownerName.value, type.value, characteristic.value);
  const res = await store.dispatch("groceries/addData", {
    name: name.value,
    idOwner: idOwner.value,
    ownerName: ownerName.value,
    type: type.value,
    characteristic: characteristic.value,
  });

  if (res) {
    console.log("Sukses Add data");
    router.push("/groceries");
  }
};
</script>
