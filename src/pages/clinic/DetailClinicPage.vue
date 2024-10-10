<template>
  <q-page class="bg-white q-py-xl q-px-xl">
    <div class="row text-title-menu items-center q-mb-md">
      <q-btn
        flat
        round
        color="primary"
        icon="arrow_back"
        @click="router.back()"
      />
      <q-icon name="local_hospital" class="text-weight-bold" size="32px" />
      <span class="q-mx-md">Detail Clinic</span>
    </div>
    <div class="container q-pa-sm"></div>
  </q-page>
</template>

<script setup>
import { useRoute } from "vue-router";
import { onMounted } from "vue";

const route = useRoute();

onMounted(() => {});
</script>
