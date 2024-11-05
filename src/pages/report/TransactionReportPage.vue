<template>
  <q-page class="bg-main q-py-xl q-px-xl bg-main">
    <div class="row text-title-menu items-center q-mb-md">
      <q-icon name="home" class="text-weight-bold" size="32px" />
      <span class="q-mx-md">Dashboard </span>
    </div>
    <div class="container q-pa-sm">
      <div class="row q-mb-md">
        <q-card class="q-mb-md">
          <q-card-section class="q-pa-md d-flex justify-center">
            <div class="row justify-center">
              <span class="text-center q-mb-sm text-bold">Pilih Tanggal</span>
            </div>
            <div class="row">
              <q-btn-group>
                <q-btn label="Today" @click="setToday" />
                <q-btn label="This Week" @click="setThisWeek" />
                <q-btn label="This Month" @click="setThisMonth" />
                <q-btn label="This Year" @click="setThisYear" />
              </q-btn-group>
            </div>
          </q-card-section>

          <q-card-section class="custom-range">
            <q-input
              filled
              :modelValue="formattedDateRange"
              label="Select Date Range for Custom Range"
              readonly
            >
              <template v-slot:prepend>
                <q-icon name="event" />
              </template>
              <q-popup-proxy v-model="showCustomRange">
                <q-date v-model="dateRange" range @change="onUpdateSummary" />
              </q-popup-proxy>
            </q-input>
          </q-card-section>
          <q-card-section v-if="summary?.totalIncome">
            <Bar v-if="loaded" :data="chartData" :options="chartOptions" />
          </q-card-section>
          <q-card-section>
            <span>
              Tanggal Laporan :
              <template v-if="dateRange?.from"
                >{{ dateRange.from }} - {{ dateRange.to }}</template
              >
              <template v-else>{{
                date.formatDate(dateRange, "YYYY/MM/DD")
              }}</template>
            </span>
          </q-card-section>
        </q-card>
      </div>
      <div class="row">
        <div class="col-6 q-px-md">
          <q-card class="q-pb-xl">
            <q-card-section>
              <h4 class="text-center">Transaction Summary</h4>
            </q-card-section>
            <q-card-section v-if="summary">
              <div class="row q-px-xl">
                <div class="col-6">
                  <div class="row">
                    <div class="col-12 text-center">
                      <span class="text-bold"> Pet Shop </span>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-6">
                      <span class="text-bold text-right q-pr-md">
                        Pemasukan
                      </span>
                    </div>
                    <div class="col-6">
                      <span class="text-bold text-left q-pr-md">
                        : {{ currencyFormatter(summary.income.groceries) }}
                      </span>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-6">
                      <span class="text-bold text-right q-pr-md">
                        Keuntungan
                      </span>
                    </div>
                    <div class="col-6">
                      <span class="text-bold text-left q-pr-md">
                        : {{ currencyFormatter(summary.profit.groceries) }}
                      </span>
                    </div>
                  </div>
                </div>
                <div class="col-6">
                  <div class="row">
                    <div class="col-12 text-center">
                      <span class="text-bold"> Klinik </span>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-6">
                      <span class="text-bold q-pr-md"> Pemasukan </span>
                    </div>
                    <div class="col-6">
                      <span class="text-bold text-left q-pr-md">
                        : {{ currencyFormatter(summary.income.medicine) }}
                      </span>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-6">
                      <span class="text-bold text-right q-pr-md">
                        Keuntungan
                      </span>
                    </div>
                    <div class="col-6">
                      <span class="text-bold text-left q-pr-md">
                        : {{ currencyFormatter(summary.profit.medicine) }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-6 q-px-md">
          <q-card class="q-pb-xl">
            <q-card-section>
              <h4 class="text-center">Most Popular</h4>
            </q-card-section>

            <q-card-section v-if="summary">
              <div class="row q-px-xl">
                <div class="col-6">
                  <div class="row q-mb-sm">
                    <div class="col-12 text-center">
                      <span class="text-bold"> Pet Shop </span>
                    </div>
                  </div>
                  <div
                    class="row"
                    v-for="(gro, idx) in summary?.topGroceries"
                    :key="gro"
                  >
                    <div class="col-9">
                      <span class="text-bold text-right q-pr-md">
                        {{ idx + 1 }}. {{ gro.name }}
                      </span>
                    </div>
                    <div class="col-3">
                      <span class="text-bold text-left q-pr-md">
                        : {{ gro.quantity }}
                      </span>
                    </div>
                  </div>
                </div>
                <div class="col-6">
                  <div class="row q-mb-sm">
                    <div class="col-12 text-center">
                      <span class="text-bold"> Klinik </span>
                    </div>
                  </div>
                  <div
                    class="row"
                    v-for="(med, idx) in summary?.topMedicine"
                    :key="med"
                  >
                    <div class="col-9">
                      <span class="text-bold q-pr-md">
                        {{ idx + 1 }}. {{ med.name }}
                      </span>
                    </div>
                    <div class="col-3">
                      <span class="text-bold text-left q-pr-md">
                        : {{ med.quantity }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { useStore } from "vuex";
import { computed, onMounted, ref, watch } from "vue";
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { date } from "quasar";
import { currencyFormatter } from "src/utils/ui";

const store = useStore();
const loaded = ref(false);
const dateRange = ref();

const summary = computed(() => store.state.transaction.summary);

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

onMounted(async () => {
  setToday();
});

const onUpdateSummary = async (isToday) => {
  console.log("masuk", dateRange.value);
  let res;
  if (isToday) {
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));
    res = await store.dispatch("transaction/getSummary", {
      startDate: new Date(startOfDay).toISOString(),
      endDate: new Date(endOfDay).toISOString(),
    });
    dateRange.value = {
      from: date.formatDate(startOfDay, "YYYY/MM/DD"),
      to: date.formatDate(endOfDay, "YYYY/MM/DD"),
    };
  } else if (typeof dateRange.value !== "string") {
    console.log("masuk if");
    const start = new Date(dateRange.value.from).setHours(0, 0, 0, 0);
    const end = new Date(dateRange.value.to).setHours(23, 59, 59, 999);
    res = await store.dispatch("transaction/getSummary", {
      startDate: new Date(start).toISOString(),
      endDate: new Date(end).toISOString(),
    });
  } else {
    console.log("else");
    const date = new Date(dateRange.value);
    const start = new Date(date.setHours(0, 0, 0, 0));
    const end = new Date(date.setHours(23, 59, 59, 999));
    res = await store.dispatch("transaction/getSummary", {
      startDate: start.toISOString(),
      endDate: end.toISOString(),
    });
  }
  if (res) {
    chartData.value = {
      labels: ["Total", "Groceries", "Medicine"],
      datasets: [
        {
          label: "Income",
          backgroundColor: "#42A5F5",
          data: [
            summary.value.totalIncome,
            summary.value.income.groceries,
            summary.value.income.medicine,
          ],
        },
        {
          label: "Profit",
          backgroundColor: "#66BB6A",
          data: [
            summary.value.totalProfit,
            summary.value.profit.groceries,
            summary.value.profit.medicine,
          ],
        },
      ],
    };
  }
};

watch(dateRange, (newRange) => {
  if (newRange) {
    // const { from, to } = newRange;
    onUpdateSummary();
  }
});

const showCustomRange = ref(false);

const formattedDateRange = computed(() => {
  if (dateRange.value && dateRange.value.from && dateRange.value.to) {
    return `${dateRange.value.from} - ${dateRange.value.to}`;
  }
  return "";
});

const chartData = ref(
  summary.value
    ? {
        labels: ["Total", "Groceries", "Medicine"],
        datasets: [
          {
            label: "Income",
            backgroundColor: "#42A5F5",
            data: [
              summary.value.totalIncome ?? 0,
              summary.value.income.groceries ?? 0,
              summary.value.income.medicine ?? 0,
            ],
          },
          {
            label: "Profit",
            backgroundColor: "#66BB6A",
            data: [
              summary.value.totalProfit ?? 0,
              summary.value.profit.groceries ?? 0,
              summary.value.profit.medicine ?? 0,
            ],
          },
        ],
      }
    : null
);

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
    },
  },
  plugins: {
    tooltip: {
      callbacks: {
        label: function (tooltipItem) {
          const value = tooltipItem.raw;
          return currencyFormatter(value); // Format the tooltip value to IDR
        },
      },
    },
  },
};

const setToday = () => {
  // const today = new Date();
  // dateRange.value = {
  //   from: date.formatDate(today.setHours(0, 0, 0, 0), "YYYY/MM/DD"),
  //   to: date.formatDate(today.setHours(23, 59, 59, 999), "YYYY/MM/DD"),
  // };
  onUpdateSummary(true);
};

const setThisWeek = () => {
  const today = new Date();
  const firstDayOfWeek = new Date(
    today.setDate(today.getDate() - today.getDay())
  );
  const lastDayOfWeek = new Date(firstDayOfWeek);
  lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);

  dateRange.value = {
    // from: formatDate(firstDayOfWeek),
    // to: formatDate(lastDayOfWeek),
    from: date.formatDate(firstDayOfWeek, "YYYY/MM/DD"),
    to: date.formatDate(
      lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 1),
      "YYYY/MM/DD"
    ),
  };
};

const setThisMonth = () => {
  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  dateRange.value = {
    // from: formatDate(firstDayOfMonth),
    // to: formatDate(lastDayOfMonth),
    from: date.formatDate(firstDayOfMonth, "YYYY/MM/DD"),
    to: date.formatDate(
      lastDayOfMonth.setDate(lastDayOfMonth.getDate() + 1),
      "YYYY/MM/DD"
    ),
  };
};

const setThisYear = () => {
  const today = new Date();
  const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
  const lastDayOfYear = new Date(today.getFullYear(), 11, 31);

  dateRange.value = {
    // from: formatDate(firstDayOfYear),
    // to: formatDate(lastDayOfYear),
    from: date.formatDate(firstDayOfYear, "YYYY/MM/DD"),
    to: date.formatDate(
      lastDayOfYear.setDate(lastDayOfYear.getDate() + 1),
      "YYYY/MM/DD"
    ),
  };
};
</script>

<style scoped>
.q-card {
  max-width: 800px;
  margin: auto;
}

.q-btn-group {
  display: flex;
  justify-content: space-between;
}

.custom-range {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  justify-items: center;

  & .q-field {
    width: 100% !important;
  }
}
</style>
