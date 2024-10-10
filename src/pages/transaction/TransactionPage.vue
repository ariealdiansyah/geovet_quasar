<template>
  <q-page class="bg-main q-py-xl q-px-xl">
    <div class="row text-title-menu items-center q-mb-md">
      <q-icon name="local_hospital" class="text-weight-bold" size="32px" />
      <span class="q-mx-md">Transaksi</span>
    </div>
    <div class="container q-pa-sm">
      <TableData
        :data="data"
        :columns="columns"
        :loading="isLoading"
        :hasAction="true"
        :canDelete="false"
        :canEdit="false"
        @onRequest="requestData"
        @onAddData="addData"
        @onAction="addActionTransaction"
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
import { getTextDate } from "src/utils/date";
import { date } from "quasar";

const store = useStore();
const router = useRouter();
const isLoading = ref(false);
const columns = ref([
  {
    name: "transactionDate",
    required: true,
    label: "Tanggal",
    align: "center",
    field: "transactionDate",
    format: (val) => {
      return getTextDate(val);
    },
  },
  {
    name: "totalPrice",
    label: "Total Transaksi",
    align: "center",
    field: "totalPrice",
    format: (val) => {
      if (val) {
        return new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          maximumFractionDigits: 0,
        }).format(val);
      } else {
        return new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          maximumFractionDigits: 0,
        }).format(0);
      }
    },
  },
  {
    name: "discount",
    label: "Diskon",
    align: "center",
    field: "discount",
    format: (val) => {
      if (val) {
        return new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          maximumFractionDigits: 0,
        }).format(val);
      } else {
        return new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          maximumFractionDigits: 0,
        }).format(0);
      }
    },
  },
  {
    name: "totalAmount",
    label: "Total Biaya",
    align: "center",
    field: "totalAmount",
    format: (val) => {
      if (val) {
        return new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          maximumFractionDigits: 0,
        }).format(val);
      } else {
        return new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          maximumFractionDigits: 0,
        }).format(0);
      }
    },
  },
]);

const requestData = async (eventRequest) => {
  if (eventRequest.filter === "" || eventRequest.filter.length > 2) {
    store.commit("global/setLocalPagination", eventRequest.pagination);
    await store.dispatch("transaction/getDataTransaction", eventRequest.filter);
  } else {
    showNotification({
      message: "Masukkan minimal 3 huruf/angka untuk filter",
      color: "warning",
      icon: "warning",
    });
  }
};
const data = computed(() => store.getters["transaction/getData"]);
const addData = () => {
  router.push("transaction/addTrx");
};
const addActionTransaction = async (type, id) => {
  switch (type) {
    case "detail":
      router.push(`transaction/${id}`);
      break;
    case "edit":
      router.push(`transaction/${id}/edit`);
      break;
    case "delete":
      isLoading.value = true;
      const res = await store.dispatch("transaction/deleteData", id);
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
  const res = await store.dispatch("transaction/getDataTransaction");
});
</script>
