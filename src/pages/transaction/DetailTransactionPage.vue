<template>
  <q-page class="bg-white q-py-xl q-px-xl bg-main">
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
      <span class="q-mx-md">Detail Transaksi</span>
    </div>
    <div class="container q-pa-sm">
      <q-card class="row q-mt-lg">
        <q-card-section class="col-md-6 col-sm-12">
          <div class="row q-mb-sm items-center">
            <div class="col-6 text-bold text-right">Tanggal Transaksi</div>
            <div class="col-6 q-pl-md">
              <span class="custom-input-32">
                : {{ getTextDate(dataDetail.transactionDate) }}
              </span>
            </div>
          </div>
          <div class="row q-mb-sm items-center">
            <div class="col-6 text-bold text-right">Metode Pembayaran</div>
            <div class="col-6 q-pl-md">
              <span class="custom-input-32">
                : {{ getPaymentMethod(dataDetail.paymentMethod) }}
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
                  }).format(dataDetail.totalPrice)
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
                  }).format(dataDetail.discount)
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
                  }).format(dataDetail.totalAmount)
                }}
              </span>
            </div>
          </div>
        </q-card-section>
        <q-card-section class="col-md-6 col-sm-12">
          <q-btn
            @click="print"
            icon="print"
            color="primary"
            push
            :loading="loadingPrint"
          />
        </q-card-section>
      </q-card>
      <q-card class="row q-mt-lg">
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
                      {{ `${item.amount}x` }} - {{ item.medicineId.name }}</span
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
  </q-page>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { onMounted, computed, ref } from "vue";
// import { date } from "quasar";
import { getTextDate } from "src/utils/date";

const route = useRoute();
const store = useStore();
const router = useRouter();

const loadingPrint = ref(false);

const dataDetail = computed(() => store.state.transaction.detail);
const groupData = ref({
  groceries: [],
  medicine: [],
});

const getPaymentMethod = (value) => {
  switch (value) {
    case "tf":
      return "Transfer";
    case "Cash":
      return "Tunai";
    case "qris":
      return "QRIS";
  }
};

const groupTransactionDetails = (transactionDetails) => {
  const groceries = transactionDetails.filter((item) => item.isGroceries);
  const medicine = transactionDetails.filter((item) => item.isMedicine);

  return {
    groceries,
    medicine,
  };
};

onMounted(async () => {
  await store.dispatch("transaction/getDetail", route.params.id);
  groupData.value = groupTransactionDetails(
    dataDetail.value.transactionDetails
  );
});

const print = async () => {
  loadingPrint.value = true;
  console.log(dataDetail.value);
  await store.dispatch("transaction/printInvoice", {
    data: dataDetail.value,
  });
  loadingPrint.value = false;
};
</script>
