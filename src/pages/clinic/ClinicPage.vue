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
        :hasAction="false"
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
import { getTextDate } from "src/utils/date";
import { date } from "quasar";

const store = useStore();
const router = useRouter();
const isLoading = ref(false);
const columns = ref([
  {
    name: "medicalDate",
    required: true,
    label: "Tanggal",
    align: "center",
    field: "medicalDate",
    format: (val) => {
      return getTextDate(val);
    },
  },
  {
    name: "customer",
    align: "center",
    label: "Nama Pemilik",
    field: (row) => row.customer,
    format: (val) => {
      if (val?.name) {
        return `${val.name}`;
      }
      return "-";
    },
  },
  {
    name: "medicalNumber",
    align: "center",
    label: "No. Rekam Medis",
    field: (row) => row.pet,
    format: (val) => {
      if (val?.medicalNumber) {
        return `${val.medicalNumber}`;
      }
      return "-";
    },
  },
  {
    name: "petName",
    align: "center",
    label: "Nama Hewan",
    field: (row) => row.pet,
    format: (val) => {
      if (val?.name) {
        return `${val.name}`;
      }
      return "-";
    },
  },
  {
    name: "diagnosis",
    required: true,
    label: "Diagnosa",
    align: "center",
    field: "diagnosis",
  },
  {
    name: "action",
    required: true,
    label: "Tindakan",
    align: "center",
    field: "action",
  },
  {
    name: "petHotel",
    required: true,
    label: "Menginap",
    align: "center",
    field: (row) => row.petHotel,
    format: (val) => {
      if (val?.codeString) {
        return `${val.codeString}`;
      }
      return "Tidak";
    },
  },
  {
    name: "appointment",
    required: true,
    label: "Pemeriksaan Lanjutan",
    align: "center",
    field: (row) => row.appointment,
    format: (val) => {
      if (val?.date) {
        return date.formatDate(new Date(val.date), "DD MMM YYYY");
      }
      return "Tidak";
    },
  },
  {
    name: "totalPrice",
    label: "Total Biaya",
    align: "center",
    field: (row) => row.transaction,
    format: (val) => {
      if (val?.totalPrice) {
        return new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          maximumFractionDigits: 0,
        }).format(val.totalPrice);
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
    await store.dispatch("clinic/getDataClinic", eventRequest.filter);
  } else {
    showNotification({
      message: "Masukkan minimal 3 huruf/angka untuk filter",
      color: "warning",
      icon: "warning",
    });
  }
};
const data = computed(() => store.getters["clinic/getData"]);
const addData = () => {
  router.push("clinic/addClinic");
};
const addActionGroceries = async (type, id) => {
  switch (type) {
    case "detail":
      router.push(`clinic/${id}`);
      break;
    case "edit":
      router.push(`clinic/${id}/edit`);
      break;
    case "delete":
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
  await store.dispatch("clinic/getDataClinic");
});
</script>
