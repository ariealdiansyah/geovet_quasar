<template>
  <q-page class="bg-main q-py-xl q-px-xl bg-main">
    <div class="row text-title-menu items-center q-mb-md">
      <q-icon name="local_hospital" class="text-weight-bold" size="32px" />
      <span class="q-mx-md">Pet Hotel</span>
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

const store = useStore();
const router = useRouter();
const isLoading = ref(false);
const columns = ref([
  {
    name: "checkinDate",
    required: true,
    label: "Tanggal Masuk",
    align: "center",
    field: "checkinDate",
    format: (val) => {
      return getTextDate(val);
    },
  },
  {
    name: "customer",
    align: "center",
    label: "Nama Pemilik",
    field: (row) => row.customerId,
    format: (val) => {
      if (val?.name) {
        return `${val.name}`;
      }
      return "-";
    },
  },
  {
    name: "petName",
    align: "center",
    label: "Nama Hewan",
    field: (row) => row.petId,
    format: (val) => {
      if (val?.name) {
        return `${val.name}`;
      }
      return "-";
    },
  },
  {
    name: "healthStatus",
    required: true,
    label: "Status Sehat Saat Masuk",
    align: "center",
    field: "healthStatus",
  },
  {
    name: "healthInfo",
    required: true,
    label: "Info Kesehatan Hewan",
    align: "center",
    field: "healthInfo",
  },
  {
    name: "roomNumber",
    required: true,
    label: "Nomor Ruangan",
    align: "center",
    field: "roomNumber",
  },
  {
    name: "roomType",
    required: true,
    label: "Tipe Ruangan",
    align: "center",
    field: "roomType",
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
    await store.dispatch("petHotel/getDataPetHotel", eventRequest.filter);
  } else {
    showNotification({
      message: "Masukkan minimal 3 huruf/angka untuk filter",
      color: "warning",
      icon: "warning",
    });
  }
};
const data = computed(() => store.getters["petHotel/getData"]);
const addData = () => {
  router.push("petHotel/addpetHotel");
};
const addActionGroceries = async (type, id) => {
  switch (type) {
    case "detail":
      router.push(`petHotel/${id}`);
      break;
    case "edit":
      router.push(`petHotel/${id}/edit`);
      break;
    case "delete":
      isLoading.value = true;
      const res = await store.dispatch("petHotel/deleteData", id);
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
  await store.dispatch("petHotel/getDatapetHotel");
});
</script>
