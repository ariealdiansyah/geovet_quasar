<template>
  <q-page class="bg-main q-py-xl q-px-xl">
    <div class="row text-title-menu items-center q-mb-md">
      <q-icon name="home" class="text-weight-bold" size="32px" />
      <span class="q-mx-md">Dashboard </span>
    </div>
    <div class="container q-pa-sm">
      <q-card>
        <q-card-section>
          <h4 class="text-center">Transaction Summary</h4>
        </q-card-section>

        <q-card-section class="q-pa-md">
          <q-btn-group>
            <q-btn label="Today" @click="setToday" />
            <q-btn label="This Week" @click="setThisWeek" />
            <q-btn label="This Month" @click="setThisMonth" />
            <q-btn label="This Year" @click="setThisYear" />
            <q-btn label="Custom Range" @click="openCustomDateRange" />
          </q-btn-group>
        </q-card-section>

        <q-card-section>
          <q-input
            filled
            :modelValue="formattedDateRange"
            label="Select Date Range"
            readonly
          >
            <template v-slot:prepend>
              <q-icon name="event" />
            </template>
            <q-popup-proxy v-model="showCustomRange">
              <q-date v-model="dateRange" range />
            </q-popup-proxy>
          </q-input>
        </q-card-section>
        <q-card-section v-if="summary?.totalIncome">
          <Bar v-if="loaded" :data="chartData" :options="chartOptions" />
        </q-card-section>
      </q-card>
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

const store = useStore();
const loaded = ref(false);
const dateRange = ref({ from: "2024/09/29", to: "2024/10/06" });

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
  const res = await store.dispatch("transaction/getSummary", {
    startDate: new Date(dateRange.value.from).toISOString(),
    endDate: new Date(dateRange.value.to).toISOString(),
  });
  if (res) {
    loaded.value = true;
  }
});

const onUpdateSummary = async (from, to) => {
  const res = await store.dispatch("transaction/getSummary", {
    startDate: new Date(dateRange.value.from).toISOString(),
    endDate: new Date(dateRange.value.to).toISOString(),
  });
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
    const { from, to } = newRange;
    onUpdateSummary(from, to);
  }
});

const showCustomRange = ref(false);

const currencyFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

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
          return currencyFormatter.format(value); // Format the tooltip value to IDR
        },
      },
    },
  },
};

const setToday = () => {
  const today = new Date();
  dateRange.value = {
    from: date.formatDate(today, "YYYY/MM/DD"),
    to: date.formatDate(today.setDate(today.getDate() + 1), "YYYY/MM/DD"),
  };
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

const openCustomDateRange = () => {
  showCustomRange.value = true;
};
</script>

<style scoped>
.q-card {
  max-width: 600px;
  margin: auto;
}

.q-btn-group {
  display: flex;
  justify-content: space-between;
}
</style>
