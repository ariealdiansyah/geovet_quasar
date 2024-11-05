<template>
  <q-page class="bg-white q-py-xl q-px-xl bg-main">
    <div class="row text-title-menu items-center q-mb-md">
      <q-icon name="local_hospital" class="text-weight-bold" size="32px" />
      <span class="q-mx-md">Detail Grooming</span>
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
