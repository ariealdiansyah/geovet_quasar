<template>
  <q-page class="q-py-xl q-px-xl">
    <div class="row text-title-menu items-center q-mb-md">
      <q-icon name="person" class="text-weight-bold" size="32px" />
      <span class="q-mx-md">Customer</span>
    </div>
    <div class="container q-pa-sm">
      <TableData
        :data="data"
        :columns="columns"
        :loading="isLoading"
        @onRequest="requestData"
        @onAddData="addDataMember"
        @onAction="addAction"
        :canDelete="store.state.global.userProfile.role === 'ADMIN'"
        :canEdit="store.state.global.userProfile.role === 'ADMIN'"
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
    name: "name",
    required: true,
    label: "Nama",
    align: "left",
    field: "name",
  },
  {
    name: "phone",
    required: true,
    label: "Nomor Telepon",
    align: "left",
    field: "phone",
  },
  {
    name: "address",
    required: true,
    label: "Alamat",
    align: "left",
    field: "address",
  },
]);

const requestData = async (eventRequest) => {
  if (eventRequest.filter === "" || eventRequest.filter.length > 2) {
    store.commit("global/setLocalPagination", eventRequest.pagination);
    await store.dispatch("customer/getData", eventRequest.filter);
  } else {
    showNotification({
      message: "Masukkan minimal 3 huruf/angka untuk filter",
      color: "warning",
      icon: "warning",
    });
  }
};
const data = computed(() => store.getters["customer/getData"]);

onMounted(async () => {
  store.commit("global/setDefaultGlobalPagination");
  await store.dispatch("customer/getData");
});

const addDataMember = () => {
  router.push("customer/addCustomer");
};

const addAction = async (type, id) => {
  switch (type) {
    case "detail":
      router.push(`customer/${id}`);
      break;
    case "edit":
      router.push(`customer/${id}/edit`);
      break;
    case "delete":
      isLoading.value = true;
      const res = await store.dispatch("customer/deleteData", id);
      if (res) {
        isLoading.value = false;
      }
      break;
  }
};
</script>
