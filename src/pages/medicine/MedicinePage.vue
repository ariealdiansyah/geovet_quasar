<template>
  <q-page class="bg-white q-py-xl q-px-xl">
    <div class="row text-title-menu items-center q-mb-md">
      <q-icon name="medication" class="text-weight-bold" size="32px" />
      <span class="q-mx-md">Medicine</span>
    </div>
    <div class="container q-pa-sm">
      <TableData
        :data="data"
        :columns="columns"
        :loading="isLoading"
        @onRequest="requestData"
        canDelete
        canEdit
        @onAddData="addDataMedicine"
        @onAction="addActionMedicine"
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
    name: "name",
    required: true,
    label: "Nama Item",
    align: "left",
    field: "name",
  },
  { name: "type", align: "left", label: "Tipe Item", field: "type" },
  { name: "stock", align: "center", label: "Stock", field: "stock" },
  {
    name: "price",
    label: "Harga",
    align: "center",
    field: "sell_price",
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
    await store.dispatch("member/getDataMember", eventRequest.filter);
  } else {
    showNotification({
      message: "Masukkan minimal 3 huruf/angka untuk filter",
      color: "warning",
      icon: "warning",
    });
  }
};
const data = computed(() => store.getters["medicine/getData"]);

onMounted(async () => {
  store.commit("global/setDefaultGlobalPagination");
  await store.dispatch("medicine/getData");
});

const addDataMedicine = () => {
  // router.push(`medicine/1`);
  router.push("medicine/addMedicine");
};

const addActionMedicine = async (type, id) => {
  console.log("action", type, id);
  switch (type) {
    case "detail":
      router.push(`medicine/${id}`);
      break;
    case "edit":
      router.push(`medicine/${id}/edit`);
      break;
    case "delete":
      isLoading.value = true;
      const res = await store.dispatch("medicine/deleteData", id);
      if (res) {
        isLoading.value = false;
      }
      break;
    default:
      break;
  }
};
</script>
