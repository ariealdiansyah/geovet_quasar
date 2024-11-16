<template>
  <q-page class="bg-main q-py-xl q-px-xl bg-main">
    <div class="row text-title-menu items-center q-mb-md">
      <q-icon name="storefront" class="text-weight-bold" size="32px" />
      <span class="q-mx-md">Petshop </span>
    </div>
    <div class="container q-pa-sm">
      <TableData
        :data="data"
        :columns="columns"
        :loading="isLoading"
        @onRequest="requestData"
        @onAddData="addData"
        @onAction="addActionGroceries"
        :canDelete="store.state.global.userProfile.role === 'ADMIN'"
        :canEdit="store.state.global.userProfile.role === 'ADMIN'"
        needCheck
      />
    </div>
  </q-page>
</template>

<script setup>
import { useStore } from "vuex";
import { computed, onMounted, ref } from "vue";
import { showNotification } from "src/utils/ui";
import { useRouter } from "vue-router";
import TableData from "src/components/TableData/TableData.vue";

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
    name: "stock",
    align: "center",
    label: "Stock",
    field: "stock",
  },
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
  if (eventRequest.filter === "" || eventRequest.filter.length >= 2) {
    store.commit("global/setLocalPagination", eventRequest.pagination);
    await store.dispatch("groceries/getData", eventRequest.filter);
  } else {
    showNotification({
      message: "Masukkan minimal 3 huruf/angka untuk filter",
      color: "warning",
      icon: "warning",
    });
  }
};
const data = computed(() => store.state.groceries.data);
onMounted(async () => {
  store.commit("global/setDefaultGlobalPagination");
  await store.dispatch("groceries/getData");
});

const addData = () => {
  router.push("groceries/addGroceries");
};
const addActionGroceries = async (type, id) => {
  switch (type) {
    case "detail":
      router.push(`groceries/${id}`);
      break;
    case "edit":
      router.push(`groceries/${id}/edit`);
      break;
    case "delete":
      isLoading.value = true;
      const res = await store.dispatch("groceries/deleteData", id);
      if (res) {
        showNotification({
          message: "Sukses hapus data",
          color: "warning",
          icon: "warning",
        });
        isLoading.value = false;
      }
      break;
    default:
      break;
  }
};
</script>
