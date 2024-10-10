<template>
  <div class="row q-mt-lg">
    <div class="col-md-12 col-sm-12 q-px-sm">
      <div class="row q-mb-sm items-center">
        <div class="col-3 text-bold text-right">Tanggal Temu Janji</div>
        <div class="col-6 q-pl-md">
          <span class="custom-input-32">
            <q-input
              v-model="formattedDate"
              :rules="[dateRule]"
              hide-bottom-space
              dense
              outlined
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date
                      v-model="appointmentDate"
                      :navigation-min-year-month="minNavigation"
                      :options="optionsFn"
                    >
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </span>
        </div>
      </div>
      <template v-if="needCustomerData">
        <DynamicSelect
          classContainer="row q-mb-sm items-center"
          classLabel="col-3 text-bold text-right"
          classSelect="col-6 q-pl-md"
          nameForm="Customer"
          :value="customerId._id"
          :options="store.state.global.customerList"
          label="Nama Pemilik"
          @onChange="customerChange"
        />
        <DynamicSelect
          classContainer="row q-mb-sm items-center"
          classLabel="col-3 text-bold text-right"
          classSelect="col-6 q-pl-md"
          nameForm="Pet"
          :value="petId._id"
          :options="petOptions"
          label="Nama Hewan"
          @onChange="petChange"
        />
      </template>
      <div class="row q-mb-sm items-center">
        <div class="col-3 text-bold text-right">Catatan</div>
        <div class="col-6 q-pl-md">
          <span class="custom-input-32">
            <q-input
              name="DateMedic"
              outlined
              dense
              v-model="context"
              hide-bottom-space
            />
          </span>
        </div>
      </div>
    </div>
  </div>
  <div class="row q-mt-lg">
    <div class="col-12">
      <div class="row">
        <div class="col-3"></div>
        <div class="col-9 flex justify-end">
          <q-btn
            name="PetHotel"
            unelevated
            no-caps
            color="primary"
            :label="labelButton"
            @click="addAppointment"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import { date } from "quasar";
import DynamicSelect from "src/components/Form/DynamicSelect.vue";
import { useStore } from "vuex";

const store = useStore();
const emit = defineEmits(["onAddTransaction"]);
const props = defineProps({
  labelButton: { type: String, default: "Tambah Transaksi" },
  needCustomerData: { type: Boolean, default: false },
});
const appointmentDate = ref(new Date());
const formattedDate = ref(
  date.formatDate(appointmentDate.value, "DD-MMM-YYYY")
);
const context = ref("");
const dateRule = (val) => !!val || "Please select a date";
const customerId = ref({});
const petId = ref({});
const minNavigation = date.formatDate(new Date(), "YYYY/MM");

watch(appointmentDate, (newDate) => {
  formattedDate.value = date.formatDate(newDate, "DD-MMM-YYYY");
});

const petOptions = computed(
  () =>
    store.state.global.petList.filter(
      (x) => x.customerId._id === customerId.value._id
    ) ?? []
);

const customerChange = (value) => {
  customerId.value = { ...value };
  petId.value = {};
};

const petChange = (value) => {
  petId.value = { ...value };
};

const addAppointment = () => {
  let data = {
    date: new Date(appointmentDate.value).toISOString(),
    context: context.value,
  };
  if (props.needCustomerData) {
    data = {
      ...data,
      customerId: customerId.value._id,
      petId: petId.value._id,
    };
  }
  emit("onAddTransaction", data);
};

const optionsFn = (selectedDate) => {
  const today = new Date();
  return (
    selectedDate >=
    date.formatDate(today.setDate(today.getDate() + 1), "YYYY/MM/DD")
  );
};
</script>
