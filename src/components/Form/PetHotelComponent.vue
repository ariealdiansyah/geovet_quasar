<template>
  <div class="row q-mt-lg">
    <div class="col-md-12 col-sm-12 q-px-sm">
      <div class="row q-mb-sm items-center">
        <div class="col-3 text-bold text-right">Tanggal Masuk</div>
        <div class="col-6 q-pl-md">
          <span class="custom-input-32">
            <q-input
              name="DateMedic"
              outlined
              dense
              filled
              disable
              v-model="checkinDate"
              hide-bottom-space
            />
          </span>
        </div>
      </div>
      <div class="row q-mb-sm items-center">
        <div class="col-3 text-bold text-right">Status Kesehatan</div>
        <div class="col-6 q-pl-md">
          <span class="custom-input-32">
            <q-input
              name="DateMedic"
              outlined
              dense
              v-model="healthStatus"
              hide-bottom-space
            />
          </span>
        </div>
      </div>
      <div class="row q-mb-sm items-center">
        <div class="col-3 text-bold text-right">Info Kesehatan Hewan</div>
        <div class="col-6 q-pl-md">
          <span class="custom-input-32">
            <q-input
              name="DateMedic"
              outlined
              dense
              v-model="healthInfo"
              hide-bottom-space
            />
          </span>
        </div>
      </div>
      <div class="row q-mb-sm items-center">
        <div class="col-3 text-bold text-right">Nomor Ruangan</div>
        <div class="col-6 q-pl-md">
          <span class="custom-input-32">
            <q-input
              name="DateMedic"
              outlined
              dense
              v-model="roomNumber"
              hide-bottom-space
            />
          </span>
        </div>
      </div>
      <div class="row q-mb-sm items-center">
        <div class="col-3 text-bold text-right">Tipe Ruangan</div>
        <div class="col-6 q-pl-md">
          <span class="custom-input-32">
            <q-input
              name="DateMedic"
              outlined
              dense
              v-model="roomType"
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
            @click="addPetHotel"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { date } from "quasar";

const emit = defineEmits(["onAddTransaction"]);
const props = defineProps({
  labelButton: { type: String, default: "Tambah Transaksi" },
});
const checkinDate = ref(date.formatDate(new Date(), "DD-MMM-YYYY HH:mm"));
const healthStatus = ref();
const healthInfo = ref();
const roomNumber = ref();
const roomType = ref();

const addPetHotel = () => {
  const data = {
    checkinDate: new Date().toISOString(),
    healthStatus: healthStatus.value,
    healthInfo: healthInfo.value,
    roomNumber: roomNumber.value,
    roomType: roomType.value,
  };

  emit("onAddTransaction", data);
};
</script>
