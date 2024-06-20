<template>
  <q-page class="bg-main q-py-xl q-px-xl">
    <div class="row text-title-menu items-center q-mb-md">
      <q-icon name="local_hospital" class="text-weight-bold" size="32px" />
      <span class="q-mx-md">Rekam Medis</span>
    </div>
    <div class="container q-pa-sm">
      <TableData
        :data="data"
        :columns="columns"
        :loading="isLoading"
        @onRequest="requestData"
        @onAddData="addData"
        @onAction="addActionGroceries"
      />
    </div>
  </q-page>
</template>

<script setup>
import { useStore } from "vuex";
import { onMounted, computed, ref } from "vue";
import TableData from "src/components/TableData/TableData.vue";
import { showNotification } from "src/utils/ui";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();
const isLoading = ref(false);
const columns = ref([
  {
    name: "medical_number",
    required: true,
    label: "No. Rekam Medis",
    align: "left",
    field: "medical_number",
  },
  {
    name: "date",
    required: true,
    label: "Tanggal",
    align: "left",
    field: "date",
  },
  {
    name: "customer_name",
    required: true,
    label: "Nama Pemilik",
    align: "left",
    field: "customer_name",
  },
  {
    name: "customer_phone",
    required: true,
    label: "Nomor Telepon",
    align: "left",
    field: "customer_phone",
  },
  {
    name: "pet_name",
    required: true,
    label: "Nama Hewan",
    align: "left",
    field: "pet_name",
  },
  {
    name: "pet_type",
    required: true,
    label: "Jenis Hewan",
    align: "left",
    field: "pet_type",
  },
  {
    name: "anamnase",
    required: true,
    label: "Anamnesa",
    align: "left",
    field: "anamnase",
  },
  {
    name: "diagnosis",
    required: true,
    label: "Diagnosa",
    align: "left",
    field: "diagnosis",
  },
  {
    name: "clinic_price",
    label: "Biaya Pemeriksaan",
    align: "center",
    field: "clinic_price",
    format: (val) =>
      new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
      }).format(val),
  },
  {
    name: "total_price",
    label: "Total Biaya",
    align: "center",
    field: "total_price",
    format: (val) =>
      new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
      }).format(val),
  },
]);

const requestData = async (eventRequest) => {
  if (eventRequest.filter === "" || eventRequest.filter.length > 2) {
    store.commit("global/setLocalPagination", eventRequest.pagination);
    await store.dispatch("clinic/getDataClinic", eventRequest.filter);
  } else {
    showNotification({
      message: "Masukkan minimal 3 huruf/angka untuk filter",
      color: "warning",
      icon: "warning",
    });
  }
};
const data = computed(() => store.getters["clinic/getDataClinic"]);
const addData = () => {
  router.push("clinic/addClinic");
};
const addActionGroceries = async (type, id) => {
  // console.log("action", type, id);
  switch (type) {
    case "detail":
      router.push(`clinic/${id}`);
      break;
    case "edit":
      // console.log("edit", type);
      router.push(`clinic/${id}/edit`);
      break;
    case "delete":
      // console.log("delete", type);
      isLoading.value = true;
      const res = await store.dispatch("clinic/deleteData", id);
      if (res) {
        isLoading.value = false;
      }
      break;
    default:
      break;
  }
};
onMounted(async () => {
  store.commit("global/setDefaultGlobalPagination");
  const res = await store.dispatch("clinic/getDataClinic");
  // console.log("onMounted", res, data.value);
});
</script>
