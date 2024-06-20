<template>
  <q-page class="bg-white q-py-xl q-px-xl">
    <div class="row text-title-menu items-center q-mb-md">
      <q-icon name="shower" class="text-weight-bold" size="32px" />
      <span class="q-mx-md">Grooming</span>
    </div>
    <div class="container q-pa-sm">
      <TableData
        :data="data"
        :columns="columns"
        :loading="isLoading"
        @onRequest="requestData"
        @onAddData="addDataGrooming"
        @onAction="addActionGroomings"
        canDelete
        canEdit
      />
    </div>
  </q-page>
</template>

<script setup>
import { useStore } from "vuex";
import { computed, onMounted, ref } from "vue";
import TableData from "src/components/TableData/TableData.vue";
import { showNotification } from "src/utils/ui";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();
const isLoading = ref(false);
const columns = ref([
  {
    name: "date_grooming",
    align: "center",
    label: "Tanggal Grooming",
    field: "date_grooming",
  },
  {
    name: "customer_name",
    required: true,
    label: "Nama Customer",
    align: "left",
    field: "customer_name",
  },
  {
    name: "pet_name",
    required: true,
    label: "Nama Hewan",
    align: "left",
    field: "pet_name",
  },
  { name: "weight", align: "left", label: "BB", field: "weight" },
  { name: "temperature", align: "center", label: "Suhu", field: "temperature" },
  {
    name: "price",
    label: "Harga",
    align: "center",
    field: "price",
    format: (val) => `Rp ${Formatter.commaAmount(val)}`,
  },
]);

const requestData = async (eventRequest) => {
  if (eventRequest.filter === "" || eventRequest.filter.length > 2) {
    store.commit("global/setLocalPagination", eventRequest.pagination);
    await store.dispatch("groomings/getData", eventRequest.filter);
  } else {
    showNotification({
      message: "Masukkan minimal 3 huruf/angka untuk filter",
      color: "warning",
      icon: "warning",
    });
  }
};
const data = computed(() => store.state.groomings.data);

onMounted(async () => {
  store.commit("global/setDefaultGlobalPagination");
  const res = await store.dispatch("groomings/getData");
});

const addDataGrooming = () => {
  router.push("groomings/addGrooming");
  // router.push("grooming/addGrooming");
};

const addActionGroomings = async (type, id) => {
  console.log("action", type, id);
  switch (type) {
    case "detail":
      router.push(`groomings/${id}`);
      break;
    case "edit":
      router.push(`groomings/${id}/edit`);
      break;
    case "delete":
      isLoading.value = true;
      const res = await store.dispatch("groomings/deleteData", id);
      if (res) {
        isLoading.value = false;
      }
      break;
    default:
      break;
  }
};
</script>
