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
      <span class="q-mx-md">Detail Pets</span>
    </div>
    <div class="container q-pa-sm">
      <div class="row q-gutter-x-lg q-mt-lg">
        <div class="col-md-6 col-sm-12">
          <DynamicSelect
            v-if="data.customerId"
            classContainer="row q-mb-sm items-center"
            classLabel="col-5 text-bold text-right"
            classSelect="col-6 q-pl-md"
            nameForm="Customer"
            :value="data.customerId._id"
            :options="store.state.global.customerList"
            label="Nama Pemilik"
            disable
            filled
          />
          <div class="row q-mb-sm items-center">
            <div class="col-5 text-bold text-right">Nama Hewan</div>
            <div class="col-6 q-pl-md">
              <span class="custom-input-32">
                <q-input
                  v-model="data.name"
                  name="NamePets"
                  outlined
                  dense
                  autocomplete="off"
                  hide-bottom-space
                  disable
                  filled
                />
              </span>
            </div>
          </div>
          <DynamicSelect
            classContainer="row q-mb-sm items-center"
            classLabel="col-5 text-bold text-right"
            classSelect="col-6 q-pl-md"
            nameForm="PetSex"
            :value="data.type"
            :options="typePetOptions"
            label="Jenis Hewan"
            disable
            filled
          />
          <DynamicSelect
            classContainer="row q-mb-sm items-center"
            classLabel="col-5 text-bold text-right"
            classSelect="col-6 q-pl-md"
            nameForm="PetSex"
            :value="data.sex"
            :options="optionsSex"
            label="Jenis Kelamin"
            disable
            filled
          />
          <div class="row q-mb-sm items-center">
            <div class="col-5 text-bold text-right">Ciri - Ciri</div>
            <div class="col-6 q-pl-md">
              <span class="custom-input-32">
                <q-input
                  v-model="data.characteristic"
                  name="Characteristic"
                  outlined
                  dense
                  autocomplete="off"
                  hide-bottom-space
                  disable
                  filled
                />
              </span>
            </div>
          </div>
          <div class="row q-mb-sm items-center">
            <div class="col-5 text-bold text-right">Nomor Rekam Medis</div>
            <div class="col-6 q-pl-md">
              <span class="custom-input-32">
                <q-input
                  v-model="data.medicalNumber"
                  name="MedicalNumber"
                  outlined
                  dense
                  autocomplete="off"
                  hide-bottom-space
                  disable
                  filled
                />
              </span>
            </div>
          </div>
          <div class="row">
            <div class="col-5"></div>
            <div class="col-6 flex justify-between q-pl-md q-mt-md">
              <q-btn
                name="back"
                unelevated
                no-caps
                color="accent"
                label="Back"
                class="q-mr-sm"
                @click="router.back()"
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
import { onMounted, computed, ref } from "vue";
import DynamicSelect from "src/components/Form/DynamicSelect.vue";

const route = useRoute();
const store = useStore();
const router = useRouter();
const data = ref({});
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

onMounted(async () => {
  console.log("route", route.params.id);
  await store.dispatch("pets/getDetail", route.params.id);
  const petData = store.getters["pets/getDetail"];
  data.value = { ...petData };
});
</script>
