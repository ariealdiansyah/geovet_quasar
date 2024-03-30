<template>
  <q-page class="bg-white q-py-xl q-px-xl">
    <div class="row text-title-menu items-center q-mb-md">
      <q-icon name="assignment_turned_in" class="text-weight-bold" size="32px" />
      <span class="q-mx-md">Detail Groceries</span>
    </div>
    <div class="container q-pa-sm">
      <q-form class="q-mt-md" @submit="editGroceries">
        <div class="row q-gutter-x-lg q-mt-lg">
          <div class="col-md-6 col-sm-12">
            <div class="row q-mb-sm items-center">
              <div class="col-3 text-bold text-right">Nama</div>
              <div class="col-6 q-pl-md">
                <span class="custom-input-32">
                  <q-input
                    v-model="dataDetail.name"
                    name="NameGroceries"
                    outlined
                    filled
                    dense
                    autocomplete="off"
                    hide-bottom-space
                    disable
                  />
                </span>
              </div>
            </div>
            <div class="row q-mb-sm items-center">
              <div class="col-3 text-bold text-right">Harga</div>
              <div class="col-6 q-pl-md">
                <span class="custom-input-32">
                  <q-input
                    v-model="dataDetail.price"
                    name="NameGroceries"
                    outlined
                    dense
                    filled
                    autocomplete="off"
                    hide-bottom-space
                    disable
                  />
                </span>
              </div>
            </div>
            <div class="row q-mb-sm items-center">
              <div class="col-3 text-bold text-right">Type</div>
              <div class="col-6 q-pl-md">
                <span class="custom-input-32">
                  <q-input
                    v-model="dataDetail.type"
                    name="NameGroceries"
                    outlined
                    dense
                    filled
                    autocomplete="off"
                    hide-bottom-space
                    disable
                  />
                </span>
              </div>
            </div>
            <div class="row q-mb-sm items-center">
              <div class="col-3 text-bold text-right">Stok</div>
              <div class="col-6 q-pl-md">
                <span class="custom-input-32">
                  <q-input
                    v-model="dataDetail.stock"
                    name="NameGroceries"
                    filled
                    dense
                    autocomplete="off"
                    hide-bottom-space
                    disable
                  />
                </span>
              </div>
            </div>
            <div class="row q-mb-sm items-center">
              <div class="col-3"></div>
              <div class="col-6 q-pl-md">
                <q-btn
                  class="q-mr-md"
                  name="backButton"
                  unelevated
                  no-caps
                  color="secondary"
                  label="Back"
                  @click.prevent="back()"
                />
                <q-btn
                  name="AddGroceries"
                  unelevated
                  no-caps
                  color="primary"
                  label="Edit Groceries"
                  type="submit"
                />
              </div>
            </div>
          </div>
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { onMounted, ref, computed } from "vue";

const route = useRoute();
const store = useStore();
const router = useRouter();
// const dataDetail = ref();

const dataDetail = computed(() => store.state.groceries.dataDetail);

const editGroceries = () => {
  router.push(`${route.params.id}/edit`);
};

const back = () => {
  router.back();
};

onMounted(async () => {
  const res = await store.dispatch("groceries/getDetail", route.params.id);
  console.log("dataDetail detail", dataDetail);
});
</script>
