<template>
  <q-dialog v-model="dialog" backdrop-filter="blur(4px) saturate(150%)">
    <q-card style="width: 500px; max-width: 80vw">
      <q-card-section class="row text-white bg-primary items-center q-pb-md">
        <div class="text-h6">Add Opname</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section class="q-pb-xl">
        <div class="row q-gutter-md q-mt-lg">
          <div class="col-12">
            <div class="row q-mb-sm items-center">
              <div class="col-3 text-bold text-right">Check-In</div>
              <div class="col-8 q-pl-md">
                <span class="custom-input-32">
                  <q-input
                    name="DateMedic"
                    outlined
                    dense
                    v-model="dateMedic"
                    hide-bottom-space
                  >
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer q-pl-sm">
                        <q-popup-proxy
                          cover
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-date
                            v-model="dateMedic"
                            today-btn
                            setToday
                            mask="YYYY-MM-DD HH:mm"
                          >
                            <div class="row items-center justify-end">
                              <q-btn v-close-popup label="Close" color="primary" flat />
                            </div>
                          </q-date>
                        </q-popup-proxy>
                      </q-icon>
                      <q-icon name="access_time" class="cursor-pointer q-pl-sm">
                        <q-popup-proxy
                          cover
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-time v-model="dateMedic" mask="YYYY-MM-DD HH:mm" format24h>
                            <div class="row items-center justify-end">
                              <q-btn v-close-popup label="Close" color="primary" flat />
                            </div>
                          </q-time>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </span>
              </div>
            </div>
            <div class="row q-mb-sm items-center">
              <div class="col-3 text-bold text-right">Check-In Status</div>
              <div class="col-8 q-pl-md">
                <q-input
                  class="custom-input-32"
                  v-model="check_in_status"
                  name="CheckInStatus"
                  outlined
                  dense
                  autocomplete="off"
                  hide-bottom-space
                />
              </div>
            </div>
            <div class="row q-mb-sm items-center">
              <div class="col-3 text-bold text-right">Nama Hewan</div>
              <div class="col-8 q-pl-md">
                <span class="custom-input-32">
                  <q-input
                    v-model="pet_name"
                    name="PetName"
                    outlined
                    dense
                    autocomplete="off"
                    hide-bottom-space
                  />
                </span>
              </div>
            </div>
            <div class="row q-mb-sm items-center">
              <div class="col-3 text-bold text-right">Jenis Hewan</div>
              <div class="col-8 q-pl-md">
                <span class="custom-input-32">
                  <q-input
                    v-model="pet_type"
                    name="PetType"
                    outlined
                    dense
                    autocomplete="off"
                    hide-bottom-space
                  />
                </span>
              </div>
            </div>
            <div class="row q-mb-sm items-center">
              <div class="col-3 text-bold text-right">Karakteristik</div>
              <div class="col-8 q-pl-md">
                <span class="custom-input-32">
                  <q-input
                    v-model="characteristic_pet"
                    name="CharacteristicPet"
                    outlined
                    dense
                    autocomplete="off"
                    hide-bottom-space
                  />
                </span>
              </div>
            </div>
            <div class="row q-mb-sm items-center">
              <div class="col-3 text-bold text-right">Umur Hewan</div>
              <div class="col-8 q-pl-md">
                <span class="custom-input-32">
                  <q-input
                    v-model="age_pet"
                    name="AgePet"
                    outlined
                    dense
                    autocomplete="off"
                    hide-bottom-space
                  />
                </span>
              </div>
            </div>
            <div class="row q-mb-sm items-center">
              <div class="col-3 text-bold text-right">Suhu Hewan</div>
              <div class="col-3 q-pl-md">
                <span class="custom-input-32">
                  <q-input
                    v-model="temperature_pet"
                    name="TemperaturePet"
                    outlined
                    dense
                    suffix="°C"
                    autocomplete="off"
                    hide-bottom-space
                  />
                </span>
              </div>
              <div class="col-2 text-bold text-right">BB Hewan</div>
              <div class="col-3 q-pl-md">
                <span class="custom-input-32">
                  <q-input
                    v-model="weight_pet"
                    name="WeightPet"
                    outlined
                    dense
                    suffix="Kg"
                    autocomplete="off"
                    hide-bottom-space
                  />
                </span>
              </div>
            </div>
            <div class="row q-mb-sm items-center">
              <div class="col-3 text-bold text-right">Tipe Kandang</div>
              <div class="col-3 q-pl-md">
                <span class="custom-input-32">
                  <q-input
                    v-model="room_type"
                    name="RoomType"
                    outlined
                    dense
                    autocomplete="off"
                    hide-bottom-space
                  />
                </span>
              </div>
              <div class="col-2 text-bold text-right">No Kandang</div>
              <div class="col-3 q-pl-md">
                <span class="custom-input-32">
                  <q-input
                    v-model="room_number"
                    name="RoomNumber"
                    outlined
                    dense
                    autocomplete="off"
                    hide-bottom-space
                  />
                </span>
              </div>
            </div>
            <!-- <div class="row q-mb-sm items-center">
              <div class="col-4 text-bold text-right">Check-Out Status</div>
              <div class="col-7 q-pl-md">
                <q-input
                  class="custom-input-32"
                  v-model="check_out_status"
                  name="CheckOutStatus"
                  outlined
                  dense
                  autocomplete="off"
                  hide-bottom-space
                />
              </div>
            </div> -->
            <div class="row q-mt-lg items-center">
              <div class="col-3 text-bold text-right"></div>
              <div class="col-8 q-pl-md row justify-end">
                <q-btn label="Save" color="primary" @click="saveOpname" />
              </div>
            </div>
          </div>
        </div>
      </q-card-section>

      <!-- <q-card-actions align="right">

      </q-card-actions> -->
    </q-card>
  </q-dialog>
</template>

<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { date } from "quasar";

const store = useStore();
const emit = defineEmits(["saveOpname"]);
const dateMedic = ref(date.formatDate(new Date(), "DD-MM-YYYY HH:mm"));
const pet_name = ref("");
const pet_type = ref("");
const characteristic_pet = ref("");
const age_pet = ref("");
const weight_pet = ref("");
const temperature_pet = ref("");
const room_type = ref("");
const room_number = ref("");
const check_in_status = ref("");
const check_out_status = ref("");
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
