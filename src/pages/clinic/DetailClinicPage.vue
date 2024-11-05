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
              <template v-if="dataDetail.customer">
                <DynamicSelect
                  classContainer="row q-mb-sm items-center"
                  classLabel="col-3 text-bold text-right"
                  classSelect="col-9 q-pl-md"
                  nameForm="Customer"
                  :value="dataDetail.customer._id"
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
                      v-model="dataDetail.customer.address"
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
                      v-model="dataDetail.customer.phone"
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
              <template v-if="dataDetail.pet">
                <DynamicSelect
                  classContainer="row q-mb-sm items-center"
                  classLabel="col-3 text-bold text-right"
                  classSelect="col-9 q-pl-md"
                  nameForm="Customer"
                  :value="dataDetail.pet.name"
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
                      v-model="dataDetail.pet.sex"
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
                <div class="row q-mb-sm items-center" v-if="dataDetail.pet._id">
                  <div class="col-3 text-bold text-right">Medical Number</div>
                  <div class="col-9 q-pl-md">
                    <q-input
                      v-if="dataDetail.pet.medicalNumber"
                      class="custom-input-32"
                      v-model="dataDetail.pet.medicalNumber"
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
                      v-model="dataDetail.pet.characteristic"
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
                      v-model="dataDetail.age"
                      name="AgePet"
                      outlined
                      dense
                      disable
                      filled
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
                      v-model="dataDetail.temperature"
                      name="TemperaturePet"
                      outlined
                      dense
                      suffix="°C"
                      autocomplete="off"
                      hide-bottom-space
                      disable
                      filled
                    />
                  </span>
                </div>
                <div class="col-3 text-bold text-right">BB Hewan</div>
                <div class="col-3 q-pl-md">
                  <span class="custom-input-32">
                    <q-input
                      v-model="dataDetail.weight"
                      name="WeightPet"
                      outlined
                      dense
                      suffix="Kg"
                      autocomplete="off"
                      hide-bottom-space
                      disable
                      filled
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
                    v-model="dataDetail.anamnesis"
                    name="Anamnase"
                    autogrow
                    outlined
                    dense
                    autocomplete="off"
                    hide-bottom-space
                    disable
                    filled
                  />
                </div>
              </div>
              <div class="row q-mb-sm items-start">
                <div class="col-3 text-bold text-right">Diagnosa</div>
                <div class="col-9 q-pl-md">
                  <q-input
                    class="custom-input-32"
                    v-model="dataDetail.diagnosis"
                    autogrow
                    name="Diagnosis"
                    outlined
                    dense
                    autocomplete="off"
                    disable
                    filled
                    hide-bottom-space
                  />
                </div>
              </div>
              <div class="row q-mb-sm items-start">
                <div class="col-3 text-bold text-right">Tindakan</div>
                <div class="col-9 q-pl-md">
                  <q-input
                    class="custom-input-32"
                    v-model="dataDetail.action"
                    name="Medical_action"
                    outlined
                    dense
                    autogrow
                    autocomplete="off"
                    hide-bottom-space
                    disable
                    filled
                  />
                </div>
              </div>
              <div class="row q-mb-sm items-start">
                <div class="col-3 text-bold text-right">Obat</div>
                <div class="col-9 q-pl-md">
                  <q-input
                    class="custom-input-32"
                    v-model="dataDetail.medicalPrescription"
                    name="medicalPrescription"
                    outlined
                    dense
                    autogrow
                    autocomplete="off"
                    hide-bottom-space
                    disable
                    filled
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
                    {{ dataDetail.transaction ? "Ya" : "Tidak" }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <template v-if="dataDetail.hasTransaction">
            <div class="container q-pa-sm">
              <q-card class="row q-gutter-x-lg q-mt-lg">
                <q-card-section class="col-md-6 col-sm-12">
                  <div class="row q-mb-sm items-center">
                    <div class="col-6 text-bold text-right">
                      Tanggal Transaksi
                    </div>
                    <div class="col-6 q-pl-md">
                      <span class="custom-input-32">
                        :
                        {{
                          getTextDate(dataDetail.transaction.transactionDate)
                        }}
                      </span>
                    </div>
                  </div>
                  <div class="row q-mb-sm items-center">
                    <div class="col-6 text-bold text-right">Total Belanja</div>
                    <div class="col-6 q-pl-md">
                      <span class="custom-input-32">
                        :
                        {{
                          new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                            maximumFractionDigits: 0,
                          }).format(dataDetail.transaction.totalPrice)
                        }}
                      </span>
                    </div>
                  </div>
                  <div class="row q-mb-sm items-center">
                    <div class="col-6 text-bold text-right">Diskon Belanja</div>
                    <div class="col-6 q-pl-md">
                      <span class="custom-input-32">
                        :
                        {{
                          new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                            maximumFractionDigits: 0,
                          }).format(dataDetail.transaction.discount)
                        }}
                      </span>
                    </div>
                  </div>
                  <div class="row q-mb-sm items-center">
                    <div class="col-6 text-bold text-right">Total Harga</div>
                    <div class="col-6 q-pl-md">
                      <span class="custom-input-32">
                        :
                        {{
                          new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                            maximumFractionDigits: 0,
                          }).format(dataDetail.transaction.totalAmount)
                        }}
                      </span>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
              <q-card class="row q-gutter-x-lg q-mt-lg">
                <q-card-section class="col-md-12 col-sm-12">
                  <div class="row q-mb-sm items-center">
                    <span class="text-bold">List Item</span>
                  </div>
                  <div class="row q-mb-sm q-mt-lg">
                    <template v-if="groupData.medicine.length">
                      <div class="col-6">
                        <div class="row q-mb-sm">
                          <span class="text-bold">Medicine</span>
                        </div>
                        <div
                          class="row q-mb-sm"
                          v-for="(item, index) in groupData.medicine"
                          :key="index"
                        >
                          <div class="col-1">{{ index + 1 }}.</div>
                          <div class="col">
                            <span>
                              {{ `${item.amount}x` }} -
                              {{ item.medicineId.name }}</span
                            >
                          </div>
                          <div class="col">
                            :
                            {{
                              new Intl.NumberFormat("id-ID", {
                                style: "currency",
                                currency: "IDR",
                                maximumFractionDigits: 0,
                              }).format(item.totalPrice)
                            }}
                          </div>
                        </div>
                      </div>
                    </template>
                    <template v-if="groupData.groceries.length">
                      <div class="col-6">
                        <div class="row q-mb-sm">
                          <span class="text-bold">Petshop</span>
                        </div>
                        <div
                          class="row q-mb-sm"
                          v-for="(item, index) in groupData.groceries"
                          :key="index"
                        >
                          <div class="col-1">{{ index + 1 }}.</div>
                          <div class="col">
                            <span>
                              {{ `${item.amount}x` }} -
                              {{ item.groceriesId.name }}</span
                            >
                          </div>
                          <div class="col">
                            :
                            {{
                              new Intl.NumberFormat("id-ID", {
                                style: "currency",
                                currency: "IDR",
                                maximumFractionDigits: 0,
                              }).format(item.totalPrice)
                            }}
                          </div>
                        </div>
                      </div>
                    </template>
                  </div>
                </q-card-section>
              </q-card>
            </div>
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
      </q-stepper>
    </div>
  </q-page>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import { onMounted, computed, ref } from "vue";
import { date } from "quasar";
import DynamicSelect from "src/components/Form/DynamicSelect.vue";
import { getTextDate } from "src/utils/date";

const router = useRouter();
const route = useRoute();
const store = useStore();

const step = ref(1);
const done1 = ref(false);
const done2 = ref(false);
const goStep2 = () => {
  step.value = 2;
  done1.value = true;
};
const goStep3 = () => {
  step.value = 3;
  done2.value = true;
};

const dataDetail = computed(() => store.state.clinic.dataDetail);
const dateMedic = ref(
  date.formatDate(new Date(dataDetail.value.medicalDate), "DD-MMM-YYYY HH:mm")
);

const groupData = ref({
  groceries: [],
  medicine: [],
});

const groupTransactionDetails = (transaction) => {
  const groceries = transaction.filter((item) => item.isGroceries);
  const medicine = transaction.filter((item) => item.isMedicine);

  return {
    groceries,
    medicine,
  };
};

onMounted(async () => {
  await store.dispatch("clinic/getDetail", route.params.id);
  if (dataDetail.value.transaction) {
    groupData.value = groupTransactionDetails(
      dataDetail.value.transaction.transactionDetails
    );
  }
});
</script>
