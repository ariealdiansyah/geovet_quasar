<template>
  <div class="container q-pa-sm">
    <div class="row q-gutter-x-lg q-mt-lg">
      <div class="col-md-6 col-sm-12">
        <div class="row q-mb-sm items-center">
          <div class="col-3 text-bold text-right">Jenis Item</div>
          <div class="col-7 col-lg-4 col-sm-4 q-pl-md">
            <q-btn-dropdown color="primary" :label="type">
              <q-list>
                <q-item v-close-popup clickable @click="setType('petshop')">
                  <q-item-section>
                    <q-item-label>Petshop</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item v-close-popup clickable @click="setType('medicine')">
                  <q-item-section>
                    <q-item-label>Obat</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </div>
        </div>
        <DynamicSelect
          classContainer="row q-mb-sm items-center"
          classLabel="col-3 text-bold text-right"
          classSelect="col-7 q-pl-md"
          nameForm="Customer"
          :value="temp._id"
          :options="type === 'petshop' ? petList : medicineList"
          label="Pilih Item"
          @onChange="transactionChange"
        />
        <div class="row q-mb-sm items-center">
          <div class="col-3 text-bold text-right">Quantity</div>
          <div class="col-7 q-pl-md">
            <span class="custom-input-32">
              <q-input
                v-model.number="quantity"
                type="number"
                outlined
                dense
                hide-bottom-space
                hint="Tolong pilih item terlebih dahulu"
                :hide-hint="Object.keys(temp).length > 0"
                :disable="!Object.keys(temp).length"
                autocomplete="off"
                :rules="rulesQuantity()"
                @blur="onBlurQuantity"
                @keyup.enter="addItemToList"
              />
            </span>
          </div>
        </div>
        <div class="row">
          <div class="col-3"></div>
          <div class="col-7 q-pl-md flex justify-between q-mt-md">
            <q-btn
              name="Back"
              unelevated
              no-caps
              color="accent"
              label="Back"
              @click="router.back()"
            />
            <q-btn
              name="Add"
              unelevated
              no-caps
              :disable="quantity <= 0"
              color="primary"
              label="Add Item"
              @click="addItemToList"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="container q-pa-md">
    <q-table
      :rows="list"
      :columns="columns"
      row-key="_id"
      class="full-width custom-table"
      title="List Item"
      title-class="bg-primary text-subtitle text-white"
      hide-pagination
      table-header-class="bg-secondary text-white"
      separator="cell"
      wrap-cells
      hide-no-data
      :rows-per-page-options="[0]"
      v-model:pagination="pagination"
    >
      <template v-slot:bottom-row>
        <q-tr class="bg-brand">
          <q-td colspan="3" class="text-right text-subtitle">
            Total Belanja
          </q-td>
          <q-td class="text-right">{{ totalItem }}</q-td>
          <q-td class="text-right text-bold">{{
            new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
              maximumFractionDigits: 0,
            }).format(totalTransaction)
          }}</q-td>
        </q-tr>
        <q-tr class="bg-brand">
          <q-td colspan="3" class="text-right text-subtitle"> Discount </q-td>
          <q-td colspan="3" class="text-right text-bold">
            {{
              new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                maximumFractionDigits: 0,
              }).format(discount || 0)
            }}
            <q-popup-edit
              v-model="discount"
              v-slot="scope"
              @save="onDiscountSave"
            >
              <q-input
                v-model="scope.value"
                dense
                autofocus
                counter
                auto-save
                @keyup.enter="scope.set"
              />
            </q-popup-edit>
          </q-td>
        </q-tr>
        <q-tr class="bg-brand">
          <q-td colspan="3" class="text-right text-subtitle">
            Total Harga
          </q-td>
          <q-td colspan="3" class="text-right text-bold">{{
            new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
              maximumFractionDigits: 0,
            }).format(sumPrice)
          }}</q-td>
        </q-tr>
        <!-- Pay and Change Section -->
        <!-- <q-tr class="bg-brand">
          <q-td colspan="3" class="text-right text-subtitle"> Bayar </q-td>
          <q-td colspan="3" class="text-right text-bold">
            {{
              new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                maximumFractionDigits: 0,
              }).format(pay || 0)
            }}
            <q-popup-edit v-model="pay" v-slot="payScope" @save="onPayingSave">
              <q-input
                v-model="payScope.value"
                dense
                autofocus
                counter
                auto-save
                @keyup.enter="payScope.set"
              />
            </q-popup-edit>
          </q-td>
        </q-tr>
        <q-tr class="bg-brand">
          <q-td colspan="3" class="text-right text-subtitle"> Kembali </q-td>
          <q-td colspan="3" class="text-right text-bold">{{
            new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
              maximumFractionDigits: 0,
            }).format(change || 0)
          }}</q-td>
        </q-tr> -->
        <!-- End Pay and Change Section -->
      </template>
      <template v-slot:body-cell-action="props">
        <q-td>
          <q-btn flat icon="edit" color="primary" @click="editRow(props.row)" />
          <q-btn
            flat
            icon="delete"
            color="negative"
            @click="deleteRow(props.row._id)"
          />
        </q-td>
      </template>
    </q-table>
  </div>
  <div class="container q-pa-md">
    <div class="row">
      <div class="col-12">
        <div class="row">
          <div class="col-3"></div>
          <div class="col-9 flex justify-end">
            <q-btn
              name="Bayar"
              unelevated
              no-caps
              color="primary"
              :label="labelButton"
              @click="addTransaction"
            />
          </div>
        </div>
      </div>
    </div>
  </div>

  <q-dialog v-model="dialog" backdrop-filter="blur(4px) saturate(150%)">
    <q-card style="width: 600px; max-width: 80vw">
      <q-card-section class="row text-white bg-primary items-center q-pb-md">
        <div class="text-h6">Pilih Metode Pembayaran</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section class="q-pb-xl">
        <DynamicSelect
          classContainer="row q-mb-sm items-center"
          classLabel="col-4 text-bold text-right"
          classSelect="col-7 q-pl-md"
          nameForm="PaymentMethod"
          :value="paymentMethod"
          :options="paymentMethodOptions"
          label="Pilih Metode Pembayaran"
          @onChange="onPaymentMethodChange"
        />
        <template v-if="paymentMethod && paymentMethod === 'Cash'">
          <div class="row q-mb-sm items-center">
            <div class="col-4 text-bold text-right">Nominal Uang</div>
            <div class="col-7 q-pl-md">
              <span class="custom-input-32">
                <q-input
                  v-model="pay"
                  name="Characteristic"
                  outlined
                  dense
                  autocomplete="off"
                  hide-bottom-space
                  @change="onPayingSave"
                />
              </span>
            </div>
          </div>
          <div class="row q-mb-sm items-center">
            <div class="col-4 text-bold text-right">Kembali</div>
            <div class="col-7 q-pl-md">
              <span class="custom-input-32">
                {{
                  new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    maximumFractionDigits: 0,
                  }).format(change || 0)
                }}
              </span>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="row q-mb-sm items-center">
            <div class="col-4 text-bold text-right">Total Belanja</div>
            <div class="col-7 q-pl-md">
              <span class="custom-input-32">
                {{
                  new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    maximumFractionDigits: 0,
                  }).format(sumPrice)
                }}
              </span>
            </div>
          </div>
        </template>
      </q-card-section>
      <q-card-actions class="text-primary justify-end">
        <q-btn flat label="Bayar" @click="finishTransaction()" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ref, onMounted, computed, nextTick } from "vue";
import DynamicSelect from "src/components/Form/DynamicSelect.vue";

const emit = defineEmits(["onAddTransaction"]);
const props = defineProps({
  labelButton: { type: String, default: "Tambah Transaksi" },
});
const pagination = ref({
  rowsPerPage: 0,
});
const store = useStore();
const router = useRouter();
const temp = ref({});
const list = ref([]);
const quantity = ref();
const totalTransaction = ref(0);
const totalItem = ref(0);
const discount = ref();
const pay = ref();
const change = ref();
const paymentMethod = ref(null);
const dialog = ref(false);

const petList = ref([]);
const medicineList = ref([]);
const oriPetList = computed(() => store.state.global.petshopList);
const sumPrice = ref(0);

const columns = ref([
  { name: "action", label: "Actions", align: "center", field: "action" },
  {
    name: "name",
    label: "Nama Item",
    align: "center",
    field: "name",
  },
  {
    name: "price",
    label: "Harga",
    align: "right",
    field: "price",
    format: (val) =>
      new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
      }).format(val),
  },
  {
    name: "amount",
    label: "Total Item",
    align: "right",
    field: "amount",
  },
  {
    name: "totalPrice",
    label: "Total Harga",
    align: "right",
    field: "totalPrice",
    format: (val) =>
      new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
      }).format(val),
  },
]);

const paymentMethodOptions = ref([
  {
    label: "Tunai",
    value: "Cash",
  },
  {
    label: "Transfer",
    value: "tf",
  },
  {
    label: "QRIS",
    value: "qris",
  },
  {
    label: "Debt",
    value: "debt",
  },
]);

const onPaymentMethodChange = (value) => {
  paymentMethod.value = value.value;
  if (paymentMethod.value !== "Cash") {
    pay.value = sumPrice.value;
    change.value = 0;
    // } else if (paymentMethod.value === "debt") {
    //   sumPrice.value = -sumPrice.value;
    //   pay.value = -sumPrice.value;
  }
};

onMounted(() => {
  petList.value = [...store.state.global.petshopList];
  medicineList.value = [...store.state.global.medicineList];
});

const type = ref("petshop");

const setType = (tipe) => {
  type.value = tipe;
};

const transactionChange = (value) => {
  temp.value = value;
};

const addItemToList = () => {
  const alreadyInputIndex = list.value.findIndex(
    (x) => x._id === temp.value._id
  );

  const total = parseInt(temp.value.price) * quantity.value;
  if (alreadyInputIndex !== -1) {
    const updatedAmount = list.value[alreadyInputIndex].amount + quantity.value;
    list.value[alreadyInputIndex].amount = updatedAmount;
    list.value[alreadyInputIndex].totalPrice =
      parseInt(temp.value.price) * updatedAmount;
    updateList(list.value[alreadyInputIndex]._id, updatedAmount);
  } else {
    list.value.push({
      ...temp.value,
      isMedicine: type.value === "medicine" ?? false,
      isGroceries: type.value === "petshop" ?? false,
      medicineId: type.value === "medicine" ? temp.value._id : null,
      groceriesId: type.value === "petshop" ? temp.value._id : null,
      amount: quantity.value,
      discount: discount.value,
      totalPrice: total,
    });
    updateList(list.value[list.value.length - 1]._id, quantity.value);
  }
  totalTransaction.value = totalTransaction.value + total;
  updatePrice();
  totalItem.value = totalItem.value + quantity.value;

  quantity.value = null;
  temp.value = {};
};

const onBlurQuantity = () => {
  if (type.value === "petshop") {
    const isValid = quantity.value > 0 && quantity.value <= temp.value.stock;
    if (!isValid) {
      quantity.value = null;
    }
  } else {
    if (quantity.value < 1) {
      quantity.value = null;
    }
  }
};

const updateList = (id, currentAmount) => {
  if (type.value === "petshop") {
    const petListIndex = petList.value.findIndex((x) => x._id === id);
    if (currentAmount >= oriPetList.value[petListIndex].stock) {
      petList.value.splice(petListIndex, 1);
    } else {
      petList.value[petListIndex] = {
        ...petList.value[petListIndex],
        stock: oriPetList.value[petListIndex].stock - currentAmount,
      };
    }
  }
};

const updatePrice = () => {
  const discountValue = parseInt(discount.value) || 0; // Default to 0 if invalid
  sumPrice.value = totalTransaction.value - discountValue;
  change.value = pay.value ? parseInt(pay.value) - sumPrice.value : 0;
};

const onDiscountSave = () => {
  nextTick(() => {
    updatePrice(); // Wait for DOM updates before calling updatePrice
  });
};

const onPayingSave = () => {
  nextTick(() => {
    change.value = parseInt(pay.value) - sumPrice.value;
  });
};

const rulesQuantity = () => {
  let rule = [];
  if (type.value === "petshop") {
    rule.push(
      (val) =>
        val <= temp.value.stock ||
        `Stock maksimal dari ${temp.value.name} adalah ${temp.value.stock}`
    );
  }
  rule.push((val) => val > 0 || "Masukkan jumlah item lebih dari 0");
  return rule;
};

const addTransaction = () => {
  dialog.value = true;
};

const finishTransaction = () => {
  const data = {
    transactionDate: new Date().toISOString(),
    totalAmount: sumPrice.value,
    discount: discount.value ? parseInt(discount.value) : 0,
    totalPrice: totalTransaction.value,
    transactionDetails: list.value,
    pay: pay.value ? parseInt(pay.value) : 0,
    change: change.value ? parseInt(change.value) : 0,
    paymentMethod: paymentMethod.value,
  };

  emit("onAddTransaction", data);
};

const deleteRow = (id) => {
  const index = list.value.findIndex((item) => item._id === id);

  if (index !== -1) {
    const item = list.value[index];

    // Update the stock if the type is petshop
    if (item.isGroceries) {
      const petListIndex = petList.value.findIndex((pet) => pet._id === id);
      if (petListIndex !== -1) {
        // Increase the stock by the amount of the deleted item
        petList.value[petListIndex].stock += item.amount;
      }
    }

    // Remove the item from the list and update totals
    totalTransaction.value -= item.totalPrice;
    totalItem.value -= item.amount;
    list.value.splice(index, 1);
    updatePrice();
  }
};

const editRow = (row) => {
  const updatedQuantity = prompt("Enter new quantity:", row.amount);

  if (updatedQuantity !== null && updatedQuantity > 0) {
    const previousAmount = row.amount;
    const difference = (parseInt(updatedQuantity) - previousAmount) * row.price;

    // Update the row with the new quantity and price
    row.amount = parseInt(updatedQuantity);
    row.totalPrice = parseInt(updatedQuantity) * row.price;

    // Update totals
    totalTransaction.value += difference;
    totalItem.value += parseInt(updatedQuantity) - previousAmount;

    // If the type is petshop, update the stock
    if (row.isGroceries) {
      const petListIndex = petList.value.findIndex(
        (pet) => pet._id === row._id
      );
      if (petListIndex !== -1) {
        // Adjust stock accordingly
        const stockAdjustment = previousAmount - parseInt(updatedQuantity); // positive if decreasing, negative if increasing quantity
        petList.value[petListIndex].stock += stockAdjustment;
      }
    }

    updatePrice();
  }
};
</script>
