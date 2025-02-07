<template>
  <q-page class="bg-main q-py-xl q-px-xl bg-main">
    <div class="row text-title-menu items-center q-mb-md">
      <q-btn
        flat
        round
        color="primary"
        icon="arrow_back"
        @click="router.back()"
      />
      <q-icon name="shop" class="text-weight-bold" size="32px" />
      <span class="q-mx-md">Transaksi</span>
    </div>
    <TransactionComponent
      @onAddTransaction="addTransaction"
      label-button="Bayar"
    />
  </q-page>

  <q-dialog v-model="dialog" backdrop-filter="blur(4px) saturate(150%)">
    <q-card style="width: 500px; max-width: 80vw">
      <q-card-section class="row text-white bg-primary items-center q-pb-md">
        <div class="text-h6">Print Transaksi</div>
        <q-space />
        <q-btn icon="close" flat round dense />
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
        <q-btn flat label="Lain Kali" @click="nextTime()" />
        <q-btn flat label="Print" @click="printNow()" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { showNotification } from "src/utils/ui";
import TransactionComponent from "src/components/Form/TransactionComponent.vue";

const store = useStore();
const router = useRouter();
const dialog = ref(false);

const dataTransaction = ref({});

const nextTime = () => {
  showNotification({
    message: "Sukses tambah data transaksi baru",
    color: "positive",
    icon: "task_alt",
  });
  router.push("/transaction");
};

const printNow = async () => {
  const dataPrint = {
    ...dataTransaction.value,
  };
  console.log("dataPrint", dataPrint);
  await store.dispatch("transaction/printInvoice", {
    data: dataPrint,
  });
  showNotification({
    message: "Sukses tambah data transaksi baru",
    color: "positive",
    icon: "task_alt",
  });
  router.push("/transaction");
};

const addTransaction = async (value) => {
  dataTransaction.value = value;
  console.log("dataTransaction", dataTransaction.value);
  const res = await store.dispatch(
    "transaction/addTransaction",
    dataTransaction.value
  );
  if (res) {
    dialog.value = true;
  }
};
</script>
