<template>
  <q-page class="bg-white q-py-xl q-px-xl">
    <div class="row text-title-menu items-center q-mb-md">
      <q-icon
        name="assignment_turned_in"
        class="text-weight-bold"
        size="32px"
      />
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
            <!-- <div class="row q-mb-sm items-center">
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
            </div> -->
            <DynamicSelect
              classContainer="row q-mb-sm items-center"
              classLabel="col-3 text-bold text-right"
              classSelect="col-6 q-pl-md"
              nameForm="Customer"
              :value="ownerName"
              :options="store.state.global.customerList"
              label="Nama Pelanggan"
              @onChange="testOnChange"
            />
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
                  label="Add Pets"
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
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import DynamicSelect from "src/components/Form/DynamicSelect.vue";

const store = useStore();
const router = useRouter();

const name = ref("");
const ownerName = ref("");
const idOwnerName = ref("");
const idOwner = ref("");
const type = ref("");
const characteristic = ref("");
const isError = ref(false);
const errorMessage = ref("");

const testOnChange = (value) => {
  console.log("value", value);
  console.log("id", value.id);
  console.log("label", value.label);
  ownerName.value = value.label;
  idOwnerName.value = value.id;
};

const addPets = async () => {
  console.log(
    "Add Pets",
    name.value,
    ownerName.value,
    type.value,
    characteristic.value
  );
  const res = await store.dispatch("pets/addData", {
    name: name.value,
    id_customer: idOwnerName.value,
    customer_name: ownerName.value,
    type: type.value,
    characteristic: characteristic.value,
    sex: "Male",
  });

  if (res) {
    router.push("/pets");
  }
};
</script>
