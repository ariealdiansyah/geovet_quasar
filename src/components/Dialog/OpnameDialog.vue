<template>
  <q-dialog v-model="dialog" backdrop-filter="blur(4px) saturate(150%)">
    <q-card>
      <q-card-section class="row items-center q-pb-none text-h6">
        Add Opname
      </q-card-section>

      <q-card-section> This dialog for adding data opname. </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Save" color="primary" @click="saveOpname" />
        <q-btn flat label="Close" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
const emit = defineEmits(["saveOpname"]);
const dialog = computed({
  get() {
    return store.getters["global/dialogOpname"];
  },
  set(val) {
    store.commit("global/setDialogOpname", val);
  },
});

const saveOpname = () => {
  store.commit("global/setDialogOpname", false);
  emit("saveOpname");
};
</script>

<style></style>
