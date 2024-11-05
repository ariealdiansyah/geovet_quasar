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
      <q-icon name="local_hospital" class="text-weight-bold" size="32px" />
      <span class="q-mx-md">Edit Pets</span>
    </div>
    <div class="container q-pa-sm">
      <div class="row q-gutter-x-lg q-mt-lg">
        <div class="col-md-6 col-sm-12">
          <DynamicSelect
            v-if="editData.customerId"
            classContainer="row q-mb-sm items-center"
            classLabel="col-5 text-bold text-right"
            classSelect="col-6 q-pl-md"
            nameForm="Customer"
            :value="editData.customerId._id"
            :options="store.state.global.customerList"
            label="Nama Pemilik"
            @onChange="customerChange"
          />
          <div class="row q-mb-sm items-center">
            <div class="col-5 text-bold text-right">Nama Hewan</div>
            <div class="col-6 q-pl-md">
              <span class="custom-input-32">
                <q-input
                  v-model="editData.name"
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
            :value="editData.type"
            :options="typePetOptions"
            label="Jenis Hewan"
            @onChange="onChangeType"
          />
          <DynamicSelect
            classContainer="row q-mb-sm items-center"
            classLabel="col-5 text-bold text-right"
            classSelect="col-6 q-pl-md"
            nameForm="PetSex"
            :value="editData.sex"
            :options="optionsSex"
            label="Jenis Kelamin"
            @onChange="onChangeSex"
          />
          <div class="row q-mb-sm items-center">
            <div class="col-5 text-bold text-right">Ciri - Ciri</div>
            <div class="col-6 q-pl-md">
              <span class="custom-input-32">
                <q-input
                  v-model="editData.characteristic"
                  name="Characteristic"
                  outlined
                  dense
                  autocomplete="off"
                  hide-bottom-space
                />
              </span>
            </div>
          </div>
          <div class="row q-mb-sm items-center">
            <div class="col-5 text-bold text-right">Nomor Rekam Medis</div>
            <div class="col-6 q-pl-md">
              <span class="custom-input-32">
                <q-input
                  v-model="editData.medicalNumber"
                  name="MedicalNumber"
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
                name="Edit"
                unelevated
                no-caps
                color="primary"
                label="Edit"
                @click="submit"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { onMounted, ref } from "vue";
import DynamicSelect from "src/components/Form/DynamicSelect.vue";
import { showNotification } from "src/utils/ui";

const route = useRoute();
const store = useStore();
const router = useRouter();
const editData = ref({});
const optionsSex = ref([
  {
    label: "Laki - Laki",
    value: "L",
  },
  {
    label: "Perempuan",
    value: "P",
  },
]);
const typePetOptions = ref([
  {
    label: "Kucing",
    value: "KC",
  },
  {
    label: "Ayam",
    value: "AY",
  },
  {
    label: "Exotic Pet",
    value: "EX",
  },
  {
    label: "Hewan Ternak",
    value: "FM",
  },
]);

onMounted(async () => {
  await store.dispatch("pets/getDetail", route.params.id);
  const petData = store.getters["pets/getDetail"];
  editData.value = { ...petData };
});

const onChangeSex = (value) => {
  editData.value = {
    ...editData.value,
    sex: value.value,
  };
};

const onChangeType = (value) => {
  editData.value = {
    ...editData.value,
    type: value.value,
  };
};

const customerChange = (value) => {
  editData.value = {
    ...editData.value,
    customerId: value,
  };
};

const submit = async () => {
  const editedData = {
    ...editData.value,
    customerId: editData.value.customerId._id,
  };
  const res = await store.dispatch("pets/editData", editedData);
  if (res) {
    showNotification({
      message: `Sukses edit data ${editData.value.name} `,
      color: "positive",
      icon: "task_alt",
    });
    router.push("/pets");
  }
};
</script>
