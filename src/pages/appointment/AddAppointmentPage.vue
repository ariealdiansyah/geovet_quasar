<template>
  <q-page class="bg-main q-py-xl q-px-xl">
    <div class="row text-title-menu items-center q-mb-md">
      <q-btn
        flat
        round
        color="primary"
        icon="arrow_back"
        @click="router.back()"
      />
      <q-icon name="shop" class="text-weight-bold" size="32px" />
      <span class="q-mx-md">Janji Temu</span>
    </div>
    <AppointmentComponent
      @onAddTransaction="addAppointment"
      label-button="Add New Appointment"
      need-customer-data
    />
  </q-page>
</template>

<script setup>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { showNotification } from "src/utils/ui";
import AppointmentComponent from "src/components/Form/AppointmentComponent.vue";

const store = useStore();
const router = useRouter();

const dataTransaction = ref({});

const addAppointment = async (value) => {
  dataTransaction.value = value;
  const res = await store.dispatch(
    "appointment/addAppointment",
    dataTransaction.value
  );
  if (res) {
    showNotification({
      message: "Sukses tambah data janji baru",
      color: "positive",
      icon: "task_alt",
    });
    router.push("/appointment");
  }
};
</script>
