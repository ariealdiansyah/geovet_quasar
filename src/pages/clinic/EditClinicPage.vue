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
      <q-icon name="local_hospital" class="text-weight-bold" size="32px" />
      <span class="q-mx-md">Detail Clinic</span>
    </div>
    <div class="container q-pa-sm">
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
          <template v-if="dataEdit.customer">
            <DynamicSelect
              classContainer="row q-mb-sm items-center"
              classLabel="col-3 text-bold text-right"
              classSelect="col-9 q-pl-md"
              nameForm="Customer"
              :value="dataEdit.customer._id"
              :options="store.state.global.customerList"
              disable
              filled
              label="Nama Pemilik"
            />
            <div class="row q-mb-sm items-center">
              <div class="col-3 text-bold text-right">Alamat</div>
              <div class="col-9 q-pl-md">
                <q-input
                  class="custom-input-32"
                  v-model="dataEdit.customer.address"
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
                  v-model="dataEdit.customer.phone"
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
          <template v-if="dataEdit.pet">
            <DynamicSelect
              classContainer="row q-mb-sm items-center"
              classLabel="col-3 text-bold text-right"
              classSelect="col-9 q-pl-md"
              nameForm="Customer"
              :value="dataEdit.pet.name"
              :options="store.state.global.petList"
              disable
              filled
              label="Nama Hewan"
            />
            <div class="row q-mb-sm items-center">
              <div class="col-3 text-bold text-right">Jenis Kelamin</div>
              <div class="col-9 q-pl-md">
                <q-input
                  class="custom-input-32"
                  v-model="dataEdit.pet.sex"
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
            <div class="row q-mb-sm items-center" v-if="dataEdit.pet._id">
              <div class="col-3 text-bold text-right">Medical Number</div>
              <div class="col-9 q-pl-md">
                <q-input
                  v-if="dataEdit.pet.medicalNumber"
                  class="custom-input-32"
                  v-model="dataEdit.pet.medicalNumber"
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
                  v-model="dataEdit.pet.characteristic"
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
                  v-model="dataEdit.age"
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
                  v-model="dataEdit.temperature"
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
                  v-model="dataEdit.weight"
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
                v-model="dataEdit.anamnesis"
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
                v-model="dataEdit.diagnosis"
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
                v-model="dataEdit.action"
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
                v-model="dataEdit.medicalPrescription"
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
      <div class="row q-mb-sm items-center">
        <div class="col-12 flex justify-end">
          <div class="col-3"></div>
          <div class="col-6 q-pl-md">
            <q-btn
              class="q-mr-md"
              name="backButton"
              unelevated
              no-caps
              color="secondary"
              label="Back"
              @click.prevent="router.back()"
            />
            <q-btn
              name="EditClinic"
              unelevated
              no-caps
              color="primary"
              label="Edit Rekam Medis"
              @click="editClinic()"
            />
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import { onMounted, ref } from "vue";
import { date } from "quasar";
import DynamicSelect from "src/components/Form/DynamicSelect.vue";
import { showNotification } from "src/utils/ui";

const router = useRouter();
const route = useRoute();
const store = useStore();

const dataEdit = ref({});
const dateMedic = ref();

const editClinic = async () => {
  const res = await store.dispatch("clinic/editData", {
    ...dataEdit.value,
    customerId: dataEdit.value.customer._id,
    petId: dataEdit.value.pet._id,
    weight: dataEdit.value.weight.toString(),
    transactionId: dataEdit.value.transaction
      ? dataEdit.value.transaction._id
      : undefined,
  });
  if (res) {
    showNotification({
      message: `Sukses edit data ${dataEdit.value.name} `,
      color: "positive",
      icon: "task_alt",
    });
    router.push("/clinic");
  }
};

onMounted(async () => {
  await store.dispatch("clinic/getDetail", route.params.id);
  const data = store.getters["clinic/getDetail"];
  dataEdit.value = { ...data };
  dateMedic.value = date.formatDate(
    new Date(dataEdit.value.medicalDate),
    "DD-MMM-YYYY HH:mm"
  );
});
</script>
