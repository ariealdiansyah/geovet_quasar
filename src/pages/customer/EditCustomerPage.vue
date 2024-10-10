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
      <span class="q-mx-md">Edit Customer</span>
    </div>
    <div class="container q-pa-sm">
      <div class="row q-gutter-x-lg q-mt-lg">
        <div class="col-md-6 col-sm-12">
          <div class="row q-mb-sm items-center">
            <div class="col-3 text-bold text-right">Nama</div>
            <div class="col-6 q-pl-md">
              <span class="custom-input-32">
                <q-input
                  v-model="editData.name"
                  name="NameCustomer"
                  outlined
                  dense
                  autocomplete="off"
                  hide-bottom-space
                />
              </span>
            </div>
          </div>
          <div class="row q-mb-sm items-center">
            <div class="col-3 text-bold text-right">Alamat</div>
            <div class="col-6 q-pl-md">
              <span class="custom-input-32">
                <q-input
                  v-model="editData.address"
                  name="CustomerAddress"
                  outlined
                  dense
                  autocomplete="off"
                  hide-bottom-space
                />
              </span>
            </div>
          </div>
          <div class="row q-mb-sm items-center">
            <div class="col-3 text-bold text-right">No. HP</div>
            <div class="col-6 q-pl-md">
              <span class="custom-input-32">
                <q-input
                  v-model="editData.phone"
                  name="PhoneNumber"
                  outlined
                  dense
                  autocomplete="off"
                  hide-bottom-space
                />
              </span>
            </div>
          </div>
          <DynamicSelect
            classContainer="row q-mb-sm items-center"
            classLabel="col-3 text-bold text-right"
            classSelect="col-6 q-pl-md"
            nameForm="CustomerType"
            :value="editData.memberType"
            :options="memberTypeOptions"
            label="Tipe Member"
            @onChange="onChangeMember"
          />
          <div class="row">
            <div class="col-3"></div>
            <div class="col-6 q-pl-md flex justify-between q-mt-md">
              <q-btn
                name="Back"
                unelevated
                no-caps
                color="accent"
                label="Back"
                @click="router.back()"
              />
              <q-btn
                name="Edit"
                unelevated
                no-caps
                color="primary"
                label="Edit"
                @click="saveEditData"
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
import { onMounted, ref } from "vue";
import DynamicSelect from "src/components/Form/DynamicSelect.vue";
import { showNotification } from "src/utils/ui";

const route = useRoute();
const editData = ref({});
const store = useStore();
const router = useRouter();

const memberTypeOptions = ref([
  {
    label: "Basic Member",
    value: "Basic",
  },
  {
    label: "Premium Member",
    value: "Premium",
  },
  {
    label: "VIP Member",
    value: "VIP",
  },
]);

onMounted(async () => {
  await store.dispatch("customer/getDetail", route.params.id);
  const customerData = store.getters["customer/getDetail"];
  editData.value = { ...customerData };
});

const onChangeMember = (value) => {
  editData.value = {
    ...editData.value,
    memberType: value.value,
  };
};

const saveEditData = async () => {
  try {
    const res = await store.dispatch("customer/editData", editData.value);
    router.push("/customer");
    if (res) {
      showNotification({
        message: `Sukses edit data ${editData.value.name} `,
        color: "positive",
        icon: "task_alt",
      });
      router.push("/customer");
    }
  } catch (error) {
    console.error("Error updating customer editData", error);
  }
};
</script>
