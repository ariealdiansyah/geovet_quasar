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
      <span class="q-mx-md">Detail Medicine</span>
    </div>
    <div class="row q-gutter-x-lg q-mt-lg">
      <div class="col-md-6 col-sm-12">
        <div class="row q-mb-sm items-center">
          <div class="col-3 text-bold text-right">Nama Obat</div>
          <div class="col-6 q-pl-md">
            <span class="custom-input-32">
              <q-input
                v-model="detailData.name"
                name="NameGroceries"
                outlined
                dense
                autocomplete="off"
                hide-bottom-space
                disable
                filled
              />
            </span>
          </div>
        </div>
        <div class="row q-mb-sm items-center">
          <div class="col-3 text-bold text-right">Harga Beli</div>
          <div class="col-6 q-pl-md">
            <span class="custom-input-32">
              <q-input
                v-model.number="detailData.buyPrice"
                type="number"
                name="NameGroceries"
                outlined
                dense
                autocomplete="off"
                hide-bottom-space
                disable
                filled
              />
            </span>
          </div>
        </div>
        <div class="row q-mb-sm items-center">
          <div class="col-3 text-bold text-right">Harga Jual</div>
          <div class="col-6 q-pl-md">
            <span class="custom-input-32">
              <q-input
                v-model.number="detailData.price"
                type="number"
                name="NameGroceries"
                outlined
                dense
                autocomplete="off"
                hide-bottom-space
                disable
                filled
              />
            </span>
          </div>
        </div>
        <div class="row q-mb-sm items-center">
          <div class="col-3 text-bold text-right">Type</div>
          <div class="col-6 q-pl-md">
            <span class="custom-select-32">
              <q-select
                outlined=""
                autocomplete="off"
                dense
                v-model="detailData.type"
                :options="options"
                hide-bottom-space
                disable
                filled
              />
            </span>
          </div>
        </div>
        <div class="row">
          <div class="col-3"></div>
          <div class="col-6 q-pl-md flex justify-between">
            <q-btn
              name="Back"
              unelevated
              no-caps
              color="accent"
              label="Back"
              @click="router.back()"
            />
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { onMounted, ref } from "vue";

const route = useRoute();
const store = useStore();
const router = useRouter();
const data = ref();
const detailData = ref({});

onMounted(async () => {
  const res = await store.dispatch("medicine/getDetail", route.params.id);
  const data = store.getters["medicine/getDetail"];
  detailData.value = { ...data };
});
</script>
