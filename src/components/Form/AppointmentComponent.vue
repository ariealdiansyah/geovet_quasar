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
                    <q-date v-model="appointmentDate">
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
            @click="addPetHotel"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { date } from "quasar";

const emit = defineEmits(["onAddTransaction"]);
const props = defineProps({
  labelButton: { type: String, default: "Tambah Transaksi" },
});
const appointmentDate = ref(new Date());
const formattedDate = ref(
  date.formatDate(appointmentDate.value, "DD-MMM-YYYY")
);
const context = ref("");
const dateRule = (val) => !!val || "Please select a date";

watch(appointmentDate, (newDate) => {
  formattedDate.value = date.formatDate(newDate, "DD-MMM-YYYY");
});

const addPetHotel = () => {
  const data = {
    date: new Date(appointmentDate.value).toISOString(),
    context: context.value,
  };
  console.log("data", data);

  emit("onAddTransaction", data);
};
</script>
