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
      <q-icon
        name="assignment_turned_in"
        class="text-weight-bold"
        size="32px"
      />
      <span class="q-mx-md">Detail Customer</span>
    </div>
    <div class="container q-pa-sm">
      <div class="row q-gutter-x-lg q-mt-lg">
        <div class="col-md-6 col-sm-12">
          <div class="row q-mb-sm items-center">
            <div class="col-3 text-bold text-right">Nama</div>
            <div class="col-6 q-pl-md">
              <span class="custom-input-32">
                <q-input
                  v-model="data.name"
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
            <div class="col-3 text-bold text-right">Alamat</div>
            <div class="col-6 q-pl-md">
              <span class="custom-input-32">
                <q-input
                  v-model="data.address"
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
            <div class="col-3 text-bold text-right">No. HP</div>
            <div class="col-6 q-pl-md">
              <span class="custom-input-32">
                <q-input
                  v-model="data.phone"
                  name="NameGroceries"
                  outlined
                  dense
                  autocomplete="off"
                  disable
                  filled
                  hide-bottom-space
                />
              </span>
            </div>
          </div>
          <div class="row q-mb-sm items-center">
            <div class="col-3 text-bold text-right">Tipe Member</div>
            <div class="col-6 q-pl-md">
              <span class="custom-input-32">
                <q-input
                  v-model="data.memberType"
                  name="MemberType"
                  outlined
                  dense
                  autocomplete="off"
                  disable
                  filled
                  hide-bottom-space
                />
              </span>
            </div>
          </div>
          <div class="row q-mt-md items-center">
            <div class="col-3"></div>
            <div class="col-6 flex justify-between q-pl-md">
              <q-btn
                name="AddGroceries"
                unelevated
                no-caps
                color="accent"
                label="Back"
                class="q-mr-sm"
                @click="router.back()"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { onMounted, computed } from "vue";

const route = useRoute();
const store = useStore();
const router = useRouter();
const data = computed(() => store.getters["customer/getDetail"]);

onMounted(async () => {
  await store.dispatch("customer/getDetail", route.params.id);
});

const addDataMember = () => {
  router.push("customer/addCustomer");
};
</script>
