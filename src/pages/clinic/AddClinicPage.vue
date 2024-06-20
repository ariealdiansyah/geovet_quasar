<template>
  <q-page class="bg-white q-py-xl q-px-xl">
    <div class="row text-title-menu items-center q-mb-md">
      <q-icon
        name="assignment_turned_in"
        class="text-weight-bold"
        size="32px"
      />
      <span class="q-mx-md">Tambah Rekam Medis</span>
    </div>
    <div class="container q-pa-sm">
      <q-form class="q-mt-md" @submit="addClinic">
        <div class="row q-gutter-x-lg q-mt-lg">
          <div class="col-md-5 col-sm-12">
            <div class="row q-mb-sm items-center">
              <div class="col-4 text-bold text-right">Tanggal</div>
              <div class="col-8 q-pl-md">
                <span class="custom-input-32">
                  <q-input
                    name="DateMedic"
                    outlined
                    dense
                    disable
                    filled
                    v-model="dateMedic"
                    hide-bottom-space
                  >
                    <!-- <template v-slot:prepend>
                      <q-icon name="event" class="cursor-pointer">
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
                    </template> -->
                    <!--
                    <template v-slot:append>
                      <q-icon name="access_time" class="cursor-pointer">
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
                    </template> -->
                  </q-input>
                </span>
              </div>
            </div>
            <div class="row q-mb-sm items-center">
              <div class="col-4 text-bold text-right">Nomor Rekam Medis</div>
              <div class="col-6 q-pl-md">
                <q-input
                  class="custom-input-32"
                  v-model="medical_number"
                  name="MedicalNumber"
                  outlined
                  dense
                  disable
                  filled
                  autocomplete="off"
                  hide-bottom-space
                />
              </div>
              <div class="col-2 q-pl-sm">
                <q-btn
                  name="GenerateMedicalNumber"
                  unelevated
                  no-caps
                  padding="sm"
                  color="primary"
                  label="Generate"
                  @click.prevent="generateNumber"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="row q-gutter-x-lg q-mt-lg">
          <div class="col-md-5 col-sm-12">
            <div class="row q-mb-sm items-center">
              <div class="col-3 text-bold text-right">Nama Pemilik</div>
              <div class="col-9 q-pl-md">
                <span class="custom-input-32">
                  <q-input
                    v-model="customer_name"
                    name="CustomerName"
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
              <div class="col-9 q-pl-md">
                <!-- <span class="custom-input-32"> -->
                <q-input
                  class="custom-input-32"
                  v-model="customer_address"
                  name="CustomerAddress"
                  outlined
                  dense
                  autogrow
                  autocomplete="off"
                  hide-bottom-space
                />
                <!-- </span> -->
              </div>
            </div>
            <div class="row q-mb-sm items-center">
              <div class="col-3 text-bold text-right">No. Tlp</div>
              <div class="col-9 q-pl-md">
                <span class="custom-input-32">
                  <q-input
                    v-model="customer_phone"
                    name="CustomerPhone"
                    outlined
                    dense
                    mask="#### - #### - #### - #### - ####"
                    unmasked-value
                    autocomplete="off"
                    hide-bottom-space
                  />
                </span>
              </div>
            </div>
            <div class="row q-mb-sm items-center">
              <div class="col-3 text-bold text-right">Nama Hewan</div>
              <div class="col-9 q-pl-md">
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
              <div class="col-9 q-pl-md">
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
              <div class="col-9 q-pl-md">
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
              <div class="col-9 q-pl-md">
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
              <div class="col-3 text-bold text-right">BB Hewan</div>
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
          </div>
          <div class="col-md-5 col-sm-12">
            <div class="row q-mb-sm items-start">
              <div class="col-4 text-bold text-right">Anamnase</div>
              <div class="col-8 q-pl-md">
                <q-input
                  class="custom-input-32"
                  v-model="anamnase"
                  name="Anamnase"
                  autogrow
                  outlined
                  dense
                  autocomplete="off"
                  hide-bottom-space
                />
              </div>
            </div>
            <div class="row q-mb-sm items-start">
              <div class="col-4 text-bold text-right">Diagnosa</div>
              <div class="col-8 q-pl-md">
                <q-input
                  class="custom-input-32"
                  v-model="diagnosis"
                  autogrow
                  name="Diagnosis"
                  outlined
                  dense
                  autocomplete="off"
                  hide-bottom-space
                />
              </div>
            </div>
            <div class="row q-mb-sm items-start">
              <div class="col-4 text-bold text-right">Tindakan</div>
              <div class="col-8 q-pl-md">
                <q-input
                  class="custom-input-32"
                  v-model="medical_action"
                  name="Medical_action"
                  outlined
                  dense
                  autogrow
                  autocomplete="off"
                  hide-bottom-space
                />
              </div>
            </div>
            <template v-for="(item, idx) in recipe" :key="item">
              <div class="row q-mb-sm items-start">
                <div class="col-4 text-bold text-right" v-if="idx === 0">
                  Obat Resep
                </div>
                <div class="col-4 text-bold text-right" v-else></div>
                <div class="col-7 q-pl-md">
                  <q-input
                    class="custom-input-32"
                    :name="`Recipe-${idx}`"
                    v-model="recipe[idx]"
                    outlined
                    :placeholder="`Test - ${idx}`"
                    dense
                    debounce="500"
                    autogrow
                    hide-bottom-space
                  />
                </div>
                <div class="col q-pl-sm" v-if="idx === 0">
                  <q-btn color="primary" icon="add" @click="addRecipe" />
                </div>
              </div>
            </template>
            <div class="row q-mb-sm items-start">
              <div class="col-4 text-bold text-right"></div>
              <div class="col-8 q-pl-md">
                <q-checkbox
                  v-model="isOpname"
                  :disable="disableOpname"
                  label="Opname"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="row q-gutter-x-lg q-mt-lg">
          <div class="col-md-5 col-sm-12">
            <div class="row q-mb-sm items-center">
              <div class="col-12 flex justify-start">
                <q-btn-dropdown
                  auto-close
                  no-caps
                  unelevated
                  align="left"
                  color="primary"
                  label="Add Item or Medicine"
                >
                  <q-list>
                    <q-item clickable v-close-popup @click="addMedicine">
                      <q-item-section>
                        <q-item-label>Add Medicine</q-item-label>
                      </q-item-section>
                    </q-item>

                    <q-item clickable v-close-popup @click="addPetshop">
                      <q-item-section>
                        <q-item-label>Add Petshop</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-btn-dropdown>
              </div>
            </div>
          </div>
        </div>
        <template v-if="listMedicine.length > 0 || listPetshop.length > 0">
          <div class="row q-gutter-x-lg q-mt-lg">
            <div class="col-md-5 col-sm-12" v-if="listMedicine.length > 0">
              <template v-for="(item, idx) in listMedicine" :key="item">
                <div class="row q-mb-sm items-center">
                  <div class="col-3 text-bold text-right">Nama Obat</div>
                  <div class="col-8 q-pl-md">
                    <q-field
                      class="custom-input-32"
                      :value="item[idx]"
                      :name="`Obat-${item[idx]}`"
                      autogrow
                      outlined
                      dense
                      autocomplete="off"
                      hide-bottom-space
                    />
                  </div>
                  <div class="col q-pl-sm">
                    <q-btn
                      color="primary"
                      icon="remove"
                      @click="deleteListMedicine(idx)"
                    />
                  </div>
                </div>
              </template>
            </div>
            <div class="col-md-5 col-sm-12" v-if="listPetshop.length > 0">
              <template v-for="(item, idx) in listPetshop" :key="item">
                <div class="row q-mb-sm items-start">
                  <div class="col-3 text-bold text-right">Nama Item</div>
                  <div class="col-8 q-pl-md">
                    <q-field
                      class="custom-input-32"
                      :value="item[idx]"
                      :name="`Petshop-${item[idx]}`"
                      autogrow
                      outlined
                      dense
                      autocomplete="off"
                      hide-bottom-space
                    />
                  </div>
                  <div class="col q-pl-sm">
                    <q-btn
                      color="primary"
                      icon="remove"
                      @click="deleteListPetshop(idx)"
                    />
                  </div>
                </div>
              </template>
            </div>
          </div>
        </template>
        <div class="row q-gutter-x-lg q-mt-lg">
          <div class="col-md-11">
            <div class="row q-mb-sm items-center">
              <div class="col-12 flex justify-end">
                <q-btn
                  name="AddGroceries"
                  unelevated
                  no-caps
                  color="primary"
                  label="Add Clinic"
                  type="submit"
                />
              </div>
            </div>
          </div>
        </div>
      </q-form>
    </div>
  </q-page>
  <OpnameDialog @save-opname="saveOpname" />
</template>

<script setup>
import { useRoute } from "vue-router";
import { onMounted, ref, watch, reactive } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { date } from "quasar";
import OpnameDialog from "src/components/Dialog/OpnameDialog.vue";

const store = useStore();
const router = useRouter();

const customer_name = ref("");
const customer_phone = ref("");
const customer_address = ref("");
const pet_name = ref("");
const pet_type = ref("");
const characteristic_pet = ref("");
const age_pet = ref("");
const weight_pet = ref("");
const temperature_pet = ref("");
const anamnase = ref("");
const diagnosis = ref("");
const medical_action = ref("");
const isOpname = ref(false);
const disableOpname = ref(false);
const recipe = ref([""]);
const listMedicine = ref([]);
const listPetshop = ref([]);
const dialogOpname = ref(false);
const dateMedic = ref(date.formatDate(new Date(), "DD-MM-YYYY HH:mm"));
const medical_number = ref("");

const addClinic = async () => {
  console.log(
    "Add Groceries",
    customer_name.value,
    dateMedic.value,
    medical_number.value,
    customer_phone.value,
    customer_address.value,
    pet_name.value,
    pet_type.value,
    characteristic_pet.value,
    age_pet.value,
    weight_pet.value,
    temperature_pet.value,
    anamnase.value,
    diagnosis.value,
    medical_action.value,
    recipe.value
  );
};

const generateNumber = () => {
  medical_number.value = `KC-00001`;
};

const addRecipe = () => {
  console.log(recipe.value);
  recipe.value.push("Test");
};

watch(isOpname, (value) => {
  // console.log("check val", value);
  store.commit("global/setDialogOpname", value);
});

const saveOpname = () => {
  disableOpname.value = true;
};

const addMedicine = () => {
  // alert("Add Medicine");
  listMedicine.value.push("Object Obat 1");
};

const addPetshop = () => {
  // alert("Add Petshop");
  listPetshop.value.push("Object Petshop 1");
};

const deleteListPetshop = (id) => {
  console.log("test", listPetshop.value);
  listPetshop.value.splice(id, 1);
  console.log("test petshop", listPetshop.value);
};

const deleteListMedicine = (id) => {
  console.log("test", listMedicine.value);
  listMedicine.value.splice(id, 1);
  console.log("test", listMedicine.value);
};
</script>
