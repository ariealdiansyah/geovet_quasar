<template>
  <q-page class="q-py-xl q-px-xl bg-main">
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
        @onAddData="addDataMedicine"
        @onAction="addActionMedicine"
        :canDelete="store.state.global.userProfile.role === 'ADMIN'"
        :canEdit="store.state.global.userProfile.role === 'ADMIN'"
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
  {
    name: "price",
    label: "Harga",
    align: "center",
    field: "price",
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
    await store.dispatch("medicine/getData", eventRequest.filter);
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
  router.push("medicine/addMedicine");
};

const addActionMedicine = async (type, id) => {
  switch (type) {
    case "detail":
      router.push(`medicine/${id}`);
      break;
    case "edit":
      router.push(`medicine/${id}/edit`);
      break;
    case "delete":
      isLoading.value = true;
      await store.dispatch("medicine/deleteData", id);
      showNotification({
        message: "Sukses hapus data",
        color: "warning",
        icon: "warning",
      });
      if (res) {
        isLoading.value = false;
      }
      break;
    default:
      break;
  }
};
</script>
