<template>
  <q-page class="bg-white q-py-xl q-px-xl">
    <div class="row text-title-menu items-center q-mb-md">
      <q-icon name="pets" class="text-weight-bold" size="32px" />
      <span class="q-mx-md">Pets</span>
    </div>
    <div class="container q-pa-sm">
      <TableData
        :data="data"
        :columns="columns"
        :loading="isLoading"
        @onRequest="requestData"
        :canDelete="store.state.global.userProfile.role === 'ADMIN'"
        :canEdit="store.state.global.userProfile.role === 'ADMIN'"
        @onAddData="addData"
        @onAction="addActionPets"
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
    name: "medicalNumber",
    label: "No. Rekam Medis",
    align: "center",
    field: "medicalNumber",
  },
  {
    name: "name",
    required: true,
    label: "Nama Hewan",
    align: "left",
    field: "name",
  },
  {
    name: "type",
    align: "left",
    label: "Jenis Hewan",
    field: "type",
    format: (val) => {
      switch (val) {
        case "KCG":
          return "Kucing";
        case "AYM":
          return "AYAM";
        case "EXO":
          return "Exotic Pet";
        case "FRM":
          return "Ternak";
      }
    },
  },
  {
    name: "sex",
    align: "left",
    label: "Jenis Kelamin",
    field: "sex",
    format: (val) => {
      switch (val) {
        case "P":
          return "Betina";
        case "L":
          return "Jantan";
      }
    },
  },
  {
    name: "characteristic",
    align: "left",
    label: "Ciri Hewan",
    field: "characteristic",
  },
  {
    name: "customer",
    align: "left",
    label: "Pemilik",
    field: (row) => row.customer,
    format: (val) => {
      if (val?.name) {
        return `${val.name}`;
      }
      return "-";
    },
  },
]);

const requestData = async (eventRequest) => {
  if (eventRequest.filter === "" || eventRequest.filter.length > 2) {
    store.commit("global/setLocalPagination", eventRequest.pagination);
    await store.dispatch("pets/getData", eventRequest.filter);
  } else {
    showNotification({
      message: "Masukkan minimal 3 huruf/angka untuk filter",
      color: "warning",
      icon: "warning",
    });
  }
};
const data = computed(() => store.state.pets.data);

onMounted(async () => {
  store.commit("global/setDefaultGlobalPagination");
  await store.dispatch("pets/getData");
});

const addData = () => {
  router.push("pets/addPets");
};

const addActionPets = async (type, id) => {
  switch (type) {
    case "detail":
      router.push(`pets/${id}`);
      break;
    case "edit":
      router.push(`pets/${id}/edit`);
      break;
    case "delete":
      isLoading.value = true;
      const res = await store.dispatch("pets/deleteData", id);
      if (res) {
        isLoading.value = false;
      }
      break;
  }
};
</script>
