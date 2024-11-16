<template>
  <q-page class="bg-main q-py-xl q-px-xl">
    <div class="row text-title-menu items-center q-mb-md">
      <q-icon name="event" class="text-weight-bold" size="32px" />
      <span class="q-mx-md">Jadwal Appointment</span>
    </div>
    <div class="container q-pa-md">
      <q-splitter v-model="splitterModel" style="height: 450px">
        <template v-slot:before>
          <div class="row justify-center q-pa-md">
            <div class="col-11 flex wrap justify-end q-pr-lg">
              <q-date
                v-model="date"
                :events="events"
                event-color="primary"
                class="custom-date"
                @navigation="onNavigationChange"
              />
            </div>
            <div
              class="col flex reverse wrap justify-start items-start content-start q-mt-md"
            >
              <q-btn
                round
                color="primary"
                icon="add"
                @click="router.push('/appointment/addAppointment')"
              />
            </div>
          </div>
        </template>

        <template v-slot:after>
          <q-tab-panels
            v-model="date"
            animated
            transition-prev="jump-up"
            transition-next="jump-up"
          >
            <q-tab-panel v-if="hasEvent" :name="date">
              <div class="text-h4 q-mb-md">
                {{ textDateWithtoutTime(date) }}
              </div>
              <div
                v-for="event in eventsForDate"
                :key="event._id"
                class="q-mb-md"
              >
                <p><strong>Pet Name:</strong> {{ event.petId.name }}</p>
                <p>
                  <strong>Owner:</strong> {{ event.customerId.name }} ({{
                    event.customerId.phone
                  }})
                </p>
                <p><strong>Context:</strong> {{ event.context }}</p>
                <q-separator inset />
              </div>
            </q-tab-panel>

            <q-tab-panel v-else :name="date">
              <div class="text-h4 q-mb-md">
                {{ textDateWithtoutTime(date) }}
              </div>
              <p>No event available on this date.</p>
            </q-tab-panel>
          </q-tab-panels>
        </template>
      </q-splitter>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { textDateWithtoutTime, dateToday } from "src/utils/date";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const splitterModel = ref(50),
  date = ref(dateToday(new Date()));
// events = ["2024/10/20"];

const events = computed(() => store.state.appointment.events);
const detailEvent = computed(() => store.state.appointment.detailEvent);
const hasEvent = computed(() => events.value.includes(date.value));
const eventsForDate = computed(() =>
  detailEvent.value.filter((event) => {
    return dateToday(event.date) === date.value;
  })
);

const onNavigationChange = ({ year, month }) => {
  const { start, end } = getMonthStartEnd(year, month);
  getEvents({ start, end });
};

const getMonthStartEnd = (year, month) => {
  const start = new Date(year, month - 1, 1, 0, 0, 0)
    .toISOString()
    .slice(0, 19);

  const end = new Date(year, month, 0, 23, 59, 59).toISOString().slice(0, 19);

  return { start, end };
};

const getEvents = async (date) => {
  await store.dispatch("appointment/getAppointment", date);
};

onMounted(async () => {
  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  await store.dispatch("appointment/getAppointment", {
    start: firstDayOfMonth,
    end: lastDayOfMonth,
  });
});
</script>
