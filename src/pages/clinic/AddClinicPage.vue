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
      <span class="q-mx-md">Tambah Rekam Medis</span>
    </div>
    <div class="container q-pa-sm">
      <q-stepper
        v-model="step"
        header-nav
        ref="stepper"
        color="primary"
        animated
        alternative-labels
      >
        <q-step
          :name="1"
          title="Rekam Medis Form"
          icon="health_and_safety"
          :done="done1"
        >
          <div class="row q-mt-lg">
            <div class="col-md-6 col-sm-12 q-px-sm">
              <div class="row q-mb-sm items-center">
                <div class="col-3 text-bold text-right">Tanggal</div>
                <div class="col-9 q-pl-md">
                  <span class="custom-input-32">
                    <q-input
                      name="DateMedic"
                      outlined
                      dense
                      disable
                      filled
                      v-model="dateMedic"
                      hide-bottom-space
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="row q-mt-lg">
            <div class="col-md-6 col-sm-12 q-px-sm">
              <template v-if="customerId">
                <DynamicSelect
                  classContainer="row q-mb-sm items-center"
                  classLabel="col-3 text-bold text-right"
                  classSelect="col-9 q-pl-md"
                  nameForm="Customer"
                  :value="customerId._id"
                  :options="store.state.global.customerList"
                  label="Nama Pemilik"
                  @onChange="customerChange"
                />
                <div class="row q-mb-sm items-center">
                  <div class="col-3 text-bold text-right">Alamat</div>
                  <div class="col-9 q-pl-md">
                    <q-input
                      class="custom-input-32"
                      v-model="customerId.address"
                      name="CustomerAddress"
                      outlined
                      dense
                      disable
                      filled
                      autogrow
                      autocomplete="off"
                      hide-bottom-space
                    />
                  </div>
                </div>
                <div class="row q-mb-sm items-center">
                  <div class="col-3 text-bold text-right">No.Tlp</div>
                  <div class="col-9 q-pl-md">
                    <q-input
                      class="custom-input-32"
                      v-model="customerId.phone"
                      name="CustomerPhone"
                      outlined
                      dense
                      disable
                      filled
                      unmasked-value
                      mask="#### - #### - #####"
                      autogrow
                      autocomplete="off"
                      hide-bottom-space
                    />
                  </div>
                </div>
              </template>
              <template v-if="petId">
                <DynamicSelect
                  classContainer="row q-mb-sm items-center"
                  classLabel="col-3 text-bold text-right"
                  classSelect="col-9 q-pl-md"
                  nameForm="Customer"
                  :value="petId._id"
                  :options="petOptions"
                  label="Nama Hewan"
                  @onChange="petChange"
                />
                <div class="row q-mb-sm items-center">
                  <div class="col-3 text-bold text-right">Jenis Kelamin</div>
                  <div class="col-9 q-pl-md">
                    <q-input
                      class="custom-input-32"
                      v-model="petId.sex"
                      name="PetSex"
                      outlined
                      dense
                      disable
                      filled
                      autogrow
                      autocomplete="off"
                      hide-bottom-space
                    />
                  </div>
                </div>
                <div class="row q-mb-sm items-center" v-if="petId._id">
                  <div class="col-3 text-bold text-right">Medical Number</div>
                  <div class="col-9 q-pl-md">
                    <q-input
                      v-if="petId.medicalNumber"
                      class="custom-input-32"
                      v-model="petId.medicalNumber"
                      name="PetMedicalNumber"
                      outlined
                      dense
                      disable
                      filled
                      autogrow
                      autocomplete="off"
                      hide-bottom-space
                    />
                    <q-btn
                      v-else
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
                <div class="row q-mb-sm items-center">
                  <div class="col-3 text-bold text-right">Ciri - Ciri</div>
                  <div class="col-9 q-pl-md">
                    <q-input
                      class="custom-input-32"
                      v-model="petId.characteristic"
                      name="PetCharacteristic"
                      outlined
                      dense
                      disable
                      filled
                      autogrow
                      autocomplete="off"
                      hide-bottom-space
                    />
                  </div>
                </div>
              </template>
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
            <div class="col-md-6 col-sm-12 q-px-sm">
              <div class="row q-mb-sm items-start">
                <div class="col-3 text-bold text-right">Anamnase</div>
                <div class="col-9 q-pl-md">
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
                <div class="col-3 text-bold text-right">Diagnosa</div>
                <div class="col-9 q-pl-md">
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
                <div class="col-3 text-bold text-right">Tindakan</div>
                <div class="col-9 q-pl-md">
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
              <div class="row q-mb-sm items-start">
                <div class="col-3 text-bold text-right">Obat</div>
                <div class="col-9 q-pl-md">
                  <q-input
                    class="custom-input-32"
                    v-model="medicalPrescription"
                    name="medicalPrescription"
                    outlined
                    dense
                    autogrow
                    autocomplete="off"
                    hide-bottom-space
                  />
                </div>
              </div>
            </div>
          </div>
          <q-stepper-navigation class="button-nav-stepper">
            <q-btn
              name="AddGroceries"
              unelevated
              no-caps
              :disabled="!allowToStep2"
              color="primary"
              label="Next"
              @click="goStep2"
            />
          </q-stepper-navigation>
        </q-step>
        <q-step
          :name="2"
          title="Petshop Form"
          icon="shopping_basket"
          :done="done2"
        >
          <div class="container q-pa-sm">
            <div class="row">
              <div class="col-md-6 col-sm-12">
                <div class="row q-mb-sm items-center">
                  <div class="col-3 text-bold text-right">Ada Transaksi</div>
                  <div class="col-7 col-lg-4 col-sm-4 q-pl-md">
                    <q-toggle
                      v-model="hasTransaction"
                      color="primary"
                      keep-color
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <template v-if="hasTransaction">
            <TransactionComponent
              label-button="Tambah Transaksi"
              @onAddTransaction="addTransaction"
            />
          </template>
          <template v-else>
            <q-stepper-navigation class="button-nav-stepper">
              <q-btn
                name="AddGroceries"
                unelevated
                no-caps
                color="primary"
                label="Next"
                @click="goStep3"
              />
            </q-stepper-navigation>
          </template>
        </q-step>
        <q-step :name="3" title="Pet Hotel Form" icon="pets" :done="done3">
          <div class="container q-pa-sm">
            <div class="row">
              <div class="col-md-12 col-sm-12">
                <div class="row q-mb-sm items-center">
                  <div class="col-3 text-bold text-right">
                    Apakah Hewan ini akan menginap ?
                  </div>
                  <div class="col-7 col-lg-4 col-sm-4 q-pl-md">
                    <q-toggle
                      v-model="needPetHotel"
                      color="primary"
                      keep-color
                    />
                  </div>
                </div>
              </div>
            </div>
            <template v-if="needPetHotel">
              <PetHotelPage
                label-button="Tambah Data Ranap"
                @onAddTransaction="addPetHotel"
              />
            </template>
            <template v-else>
              <q-stepper-navigation class="button-nav-stepper">
                <q-btn
                  name="AddGroceries"
                  unelevated
                  no-caps
                  color="primary"
                  label="Next"
                  @click="goStep4"
                />
              </q-stepper-navigation>
            </template>
          </div>
        </q-step>
        <q-step :name="4" title="Appointment Form" icon="pets" :done="done4">
          <div class="container q-pa-sm">
            <div class="row">
              <div class="col-md-12 col-sm-12">
                <div class="row q-mb-sm items-center">
                  <div class="col-3 text-bold text-right">
                    Apakah akan ada janji temu ?
                  </div>
                  <div class="col-7 col-lg-4 col-sm-4 q-pl-md">
                    <q-toggle
                      v-model="needAppointment"
                      color="primary"
                      keep-color
                    />
                  </div>
                </div>
              </div>
            </div>
            <template v-if="needAppointment">
              <AppointmentComponent
                label-button="Tambah Data Janji"
                @onAddTransaction="addAppointment"
              />
            </template>
            <template v-else>
              <q-stepper-navigation class="button-nav-stepper">
                <q-btn
                  name="AddGroceries"
                  unelevated
                  no-caps
                  color="primary"
                  label="Next"
                  @click="goStep5"
                />
              </q-stepper-navigation>
            </template>
          </div>
        </q-step>
        <q-step :name="5" title="Simpan Rekam Medis" icon="checklist_rtl">
          <div class="container q-pa-sm">
            <div class="row">
              <div class="col-md-12 col-sm-12">
                <div class="row q-mb-sm items-center">
                  <div class="col-6 text-bold text-right">
                    Apakah anda sudah yakin data terisi dengan benar semua ?
                  </div>
                  <div class="col-6 col-lg-4 col-sm-4 q-pl-md">
                    <q-toggle
                      v-model="alreadyCheck"
                      color="primary"
                      keep-color
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <q-stepper-navigation class="button-nav-stepper">
            <q-btn
              name="AddGroceries"
              unelevated
              no-caps
              :disable="!alreadyCheck"
              color="primary"
              label="Simpan Rekam Medis"
              @click="addMedicalRecord"
            />
          </q-stepper-navigation>
        </q-step>
      </q-stepper>
    </div>
  </q-page>
  <q-dialog v-model="dialog" backdrop-filter="blur(4px) saturate(150%)">
    <q-card style="width: 500px; max-width: 80vw">
      <q-card-section class="row text-white bg-primary items-center q-pb-md">
        <div class="text-h6">Print Transaksi</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section class="q-pb-xl">
        <div class="row q-gutter-md q-mt-lg">
          <div class="col-12">
            <div class="row q-mb-sm items-center justify-center">
              <span class="text-h6">
                Apakah anda ingin Print Transaksi Ini ?
              </span>
            </div>
          </div>
        </div>
      </q-card-section>
      <q-card-actions class="text-primary justify-end">
        <q-btn flat label="Lain Kali" @click="nextTime()" v-close-popup />
        <q-btn flat label="Print" @click="printNow()" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { date } from "quasar";
import DynamicSelect from "src/components/Form/DynamicSelect.vue";
import { showNotification } from "src/utils/ui";
import { getISOString } from "src/utils/date";
import TransactionComponent from "src/components/Form/TransactionComponent.vue";
import PetHotelPage from "../../components/Form/PetHotelComponent.vue";
import AppointmentComponent from "src/components/Form/AppointmentComponent.vue";

const store = useStore();
const router = useRouter();
const step = ref(1);
const done1 = ref(false);
const done2 = ref(false);
const done3 = ref(false);
const done4 = ref(false);
const dialog = ref(false);

const dateMedic = ref(date.formatDate(new Date(), "DD-MMM-YYYY HH:mm"));
const customerId = ref({});
const petId = ref({});
const age_pet = ref("");
const weight_pet = ref("");
const temperature_pet = ref("");
const anamnase = ref("");
const diagnosis = ref("");
const medical_action = ref("");
const medicalPrescription = ref("");

const hasTransaction = ref(false);
const needPetHotel = ref(false);
const alreadyCheck = ref(false);
const needAppointment = ref(false);

const petOptions = computed(
  () =>
    store.state.global.petList.filter(
      (x) => x.customerId._id === customerId.value._id
    ) ?? []
);

const allowToStep2 = computed(() => {
  return (
    dateMedic.value !== "" &&
    customerId.value &&
    Object.keys(customerId.value).length > 0 &&
    petId.value &&
    Object.keys(petId.value).length > 0 &&
    age_pet.value !== ""
  );
});

const dataClinic = ref({});

const addClinic = async () => {
  dataClinic.value = {
    medicalDate: getISOString(dateMedic.value),
    medicalNumber: petId.value.medicalNumber,
    petId: petId.value._id,
    customerId: customerId.value._id,
    temperature: temperature_pet.value,
    weight: weight_pet.value,
    anamnesis: anamnase.value,
    diagnosis: diagnosis.value,
    action: medical_action.value,
    age: age_pet.value,
    medicalPrescription: medicalPrescription.value,
  };
};

const customerChange = (value) => {
  customerId.value = { ...value };
  petId.value = {};
};

const petChange = (value) => {
  petId.value = { ...value };
};

const generateNumber = async () => {
  const res = await store.dispatch(
    "pets/generateMedicalNumber",
    petId.value._id
  );
  petId.value.medicalNumber = res;
};

const addTransaction = (value) => {
  dataClinic.value = {
    ...dataClinic.value,
    transaction: value,
    hasTransaction: hasTransaction.value,
  };
  step.value = 3;
  done2.value = true;
};

const addPetHotel = (value) => {
  dataClinic.value = {
    ...dataClinic.value,
    petHotel: {
      ...value,
      petId: petId.value._id,
      customerId: customerId.value._id,
      temperature: temperature_pet.value,
      weight: weight_pet.value,
    },
  };
  step.value = 4;
  done3.value = true;
};

const addAppointment = (value) => {
  dataClinic.value = {
    ...dataClinic.value,
    appointment: {
      ...value,
      petId: petId.value._id,
      customerId: customerId.value._id,
    },
  };
  step.value = 5;
  done4.value = true;
};

const addMedicalRecord = async () => {
  const res = await store.dispatch("clinic/addData", dataClinic.value);
  if (res) {
    dialog.value = true;
  }
};

const goStep2 = () => {
  step.value = 2;
  done1.value = true;
  addClinic();
};

const goStep3 = () => {
  step.value = 3;
  done2.value = true;
  dataClinic.value = {
    ...dataClinic.value,
    transaction: undefined,
    hasTransaction: hasTransaction.value,
  };
  // addTransaction();
};

const goStep4 = () => {
  step.value = 4;
  done3.value = true;
  dataClinic.value = {
    ...dataClinic.value,
    petHotel: undefined,
  };
};

const goStep5 = () => {
  step.value = 5;
  done4.value = true;
  dataClinic.value = {
    ...dataClinic.value,
    appointment: undefined,
  };
};

const printNow = async () => {
  const dataPrint = {
    ...dataClinic.value.transaction,
  };
  await store.dispatch("transaction/printInvoice", {
    data: dataPrint,
  });
  showNotification({
    message: "Sukses tambah data rekam medis baru",
    color: "positive",
    icon: "task_alt",
  });
  router.push("/clinic");
};

const nextTime = () => {
  showNotification({
    message: "Sukses tambah data transaksi baru",
    color: "positive",
    icon: "task_alt",
  });
  router.push("/clinic");
};
</script>
