<template>
  <q-page class="bg-white q-py-xl q-px-xl">
    <div class="row text-title-menu items-center q-mb-md">
      <q-icon name="person" class="text-weight-bold" size="32px" />
      <span class="q-mx-md">Customer</span>
    </div>
    <div class="container q-pa-sm">
      <TableData :data="data" @onRequest="requestData" @onAddData="addDataMember" />
    </div>
  </q-page>
</template>

<script setup>
import { useStore } from "vuex";
import { onBeforeMount, computed } from "vue";
import TableData from "src/components/TableData/TableData.vue";
import { showNotification } from "src/utils/ui";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

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

onBeforeMount(async () => {
  store.commit("global/setDefaultGlobalPagination");
  const res = await store.dispatch("customer/getData");
  // console.log("onMounted", res, data.value);
});

const addDataMember = () => {
  // console.log("addData");
  // router.push(`member/1`);
  router.push("customer/addCustomer");
};
</script>
