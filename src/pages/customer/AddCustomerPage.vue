<template>
  <q-page class="bg-white q-py-xl q-px-xl">
    <div class="row text-title-menu items-center q-mb-sm">
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
      <span class="q-mx-md">Add Customer</span>
    </div>
    <div class="container q-pa-sm">
      <q-form class="q-mt-md" @submit="addCustomer">
        <div class="row q-gutter-x-lg q-mt-lg">
          <div class="col-md-6 col-sm-12">
            <div class="row q-mb-sm items-center">
              <div class="col-3 text-bold text-right">Nama</div>
              <div class="col-6 q-pl-md">
                <span class="custom-input-32">
                  <q-input
                    v-model="name"
                    name="NameCustomer"
                    outlined
                    dense
                    autocomplete="off"
                    :error="isError"
                    :error-message="errorMessage"
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
                    v-model="address"
                    name="CustomerAddress"
                    outlined
                    dense
                    autocomplete="off"
                    :error="isError"
                    :error-message="errorMessage"
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
                    v-model="phoneNumber"
                    name="PhoneNumber"
                    outlined
                    dense
                    autocomplete="off"
                    :error="isError"
                    :error-message="errorMessage"
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
              :value="memberType"
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
                  name="Add"
                  unelevated
                  no-caps
                  color="primary"
                  label="Add"
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
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import DynamicSelect from "src/components/Form/DynamicSelect.vue";
import { showNotification } from "src/utils/ui";

const store = useStore();
const router = useRouter();

const name = ref("");
const address = ref("");
const phoneNumber = ref("");
const memberType = ref("");
const isError = ref(false);
const errorMessage = ref("");

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

const addCustomer = async () => {
  const res = await store.dispatch("customer/addData", {
    name: name.value,
    address: address.value,
    phone: phoneNumber.value,
    memberType: memberType.value,
  });

  if (res) {
    showNotification({
      message: `Sukses tambah data pelanggan baru`,
      color: "positive",
      icon: "task_alt",
    });
    router.push("/customer");
  }
};

const onChangeMember = (value) => {
  memberType.value = value.value;
};
</script>
