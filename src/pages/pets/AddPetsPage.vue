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
      <span class="q-mx-md">Add Pets</span>
    </div>
    <div class="container q-pa-sm">
      <q-form class="q-mt-md" @submit="addPets">
        <div class="row q-gutter-x-lg q-mt-lg">
          <div class="col-md-6 col-sm-12">
            <DynamicSelect
              v-if="customerId"
              classContainer="row q-mb-sm items-center"
              classLabel="col-5 text-bold text-right"
              classSelect="col-6 q-pl-md"
              nameForm="Customer"
              :value="customerId._id"
              :options="store.state.global.customerList"
              label="Nama Pemilik"
              @onChange="customerChange"
            />
            <div class="row q-mb-sm items-center">
              <div class="col-5 text-bold text-right">Nama Hewan</div>
              <div class="col-6 q-pl-md">
                <span class="custom-input-32">
                  <q-input
                    v-model="name"
                    name="NamePets"
                    outlined
                    dense
                    autocomplete="off"
                    hide-bottom-space
                  />
                </span>
              </div>
            </div>
            <DynamicSelect
              classContainer="row q-mb-sm items-center"
              classLabel="col-5 text-bold text-right"
              classSelect="col-6 q-pl-md"
              nameForm="PetSex"
              :value="type"
              :options="typePetOptions"
              label="Jenis Hewan"
              @onChange="onChangeType"
            />
            <DynamicSelect
              classContainer="row q-mb-sm items-center"
              classLabel="col-5 text-bold text-right"
              classSelect="col-6 q-pl-md"
              nameForm="PetSex"
              :value="sex"
              :options="optionsSex"
              label="Jenis Kelamin"
              @onChange="onChangeSex"
            />
            <div class="row q-mb-sm items-center">
              <div class="col-5 text-bold text-right">Ciri - Ciri</div>
              <div class="col-6 q-pl-md">
                <span class="custom-input-32">
                  <q-input
                    v-model="characteristic"
                    name="Characteristic"
                    outlined
                    dense
                    autocomplete="off"
                    hide-bottom-space
                  />
                </span>
              </div>
            </div>
            <div class="row">
              <div class="col-5"></div>
              <div class="col-6 q-pl-md flex justify-between q-mt-md">
                <q-btn
                  name="Back"
                  unelevated
                  no-caps
                  color="accent"
                  label="Back"
                  @click="router.back()"
                />
                <q-btn
                  name="Add"
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
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import DynamicSelect from "src/components/Form/DynamicSelect.vue";
import { showNotification } from "src/utils/ui";

const store = useStore();
const router = useRouter();

const customerId = ref({});
const name = ref("");
const type = ref("");
const sex = ref("");
const characteristic = ref("");
const optionsSex = ref([
  {
    label: "Jantan",
    value: "L",
  },
  {
    label: "Betina",
    value: "P",
  },
]);
const typePetOptions = ref([
  {
    label: "Kucing",
    value: "KCG",
  },
  {
    label: "Ayam",
    value: "AYM",
  },
  {
    label: "Exotic Pet",
    value: "EXO",
  },
  {
    label: "Hewan Ternak",
    value: "FRM",
  },
]);

const addPets = async () => {
  const dataPet = {
    customerId: customerId.value._id,
    name: name.value,
    type: type.value,
    sex: sex.value,
    characteristic: characteristic.value,
  };
  const res = await store.dispatch("pets/addData", dataPet);
  if (res) {
    showNotification({
      message: "Sukses tambah data hewan baru",
      color: "positive",
      icon: "task_alt",
    });
    router.push("/pets");
  }
};

const onChangeSex = (value) => {
  sex.value = value.value;
};

const onChangeType = (value) => {
  type.value = value.value;
};

const customerChange = (value) => {
  customerId.value = value;
};
</script>
