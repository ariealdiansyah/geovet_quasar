<template>
  <q-table
    v-model:pagination="pagination"
    :rows="props.data"
    :columns="props.columns"
    :filter="filter"
    row-key="id"
    :loading="props.loading"
    :class="classTable"
    @request="onRequest"
    :no-data-label="noDataLabel"
    :no-results-label="noResultsLabel"
    :virtual-scroll="pagination.rowsPerPage === 0"
    :style="
      pagination.rowsPerPage === 0 ? 'max-height: 700px' : 'max-height: inherit'
    "
  >
    <template #top-right>
      <q-input
        v-model="filter"
        borderless
        dense
        outlined
        debounce="300"
        placeholder="Search"
      >
        <template #append>
          <q-icon name="search" />
        </template>
      </q-input>
    </template>
    <template v-slot:header="props">
      <q-tr :props="props">
        <q-th
          v-for="col in props.cols"
          :key="col.name"
          :props="props"
          style="font-weight: bold"
        >
          {{ col.label }}
        </q-th>
        <q-th style="font-weight: bold; text-align: center" v-if="hasAction">
          Action
        </q-th>
      </q-tr>
    </template>
    <template v-slot:body="lists">
      <q-tr :lists="lists">
        <q-td
          :lists="lists"
          v-for="col in lists.cols"
          :key="col.name"
          :style="`text-align:${col.align || 'left'}`"
        >
          {{ col.value || "-" }}
        </q-td>
        <q-td style="text-align: center" v-if="hasAction">
          <q-btn-group flat rounded push>
            <q-btn
              :name="`ButtonDetail${lists.rowIndex + 1}`"
              color="primary"
              icon="visibility"
              size="sm"
              flat
              outline
              :loading="props.loading"
              @click.prevent="onDetail(lists.row)"
            >
              <q-tooltip
                content-class="primary"
                anchor="top middle"
                self="bottom middle"
                :offset="[10, 10]"
              >
                Detail
              </q-tooltip>
            </q-btn>
            <q-btn
              v-if="props.canEdit"
              :name="`ButtonEdit${lists.rowIndex + 1}`"
              color="warning"
              icon="edit"
              size="sm"
              :loading="props.loading"
              flat
              @click.prevent="onEdit(lists.row)"
            >
              <q-tooltip
                content-class="primary"
                anchor="top middle"
                self="bottom middle"
                :offset="[10, 10]"
              >
                Edit
              </q-tooltip>
            </q-btn>
            <q-btn
              v-if="props.canDelete"
              :name="`ButtonDelete${lists.rowIndex + 1}`"
              color="negative"
              icon="delete"
              :loading="props.loading"
              flat
              size="sm"
              @click.prevent="onDelete(lists.row)"
            >
              <q-tooltip
                content-class="primary"
                anchor="top middle"
                self="bottom middle"
                :offset="[10, 10]"
              >
                Delete
              </q-tooltip>
            </q-btn>
          </q-btn-group>
          <slot name="action" v-bind="lists" />
        </q-td>
      </q-tr>
    </template>
    <template #top-left>
      <q-btn color="secondary" icon="add" label="Add" @click="addData()" />
    </template>
  </q-table>
  <!-- <span>{{ pagination }} - {{ pagination.rowsPerPage === 0 }}</span> -->
</template>

<script setup>
import { ref, computed, reactive, toRefs } from "vue";
import { useStore } from "vuex";

const emit = defineEmits(["onRequest", "onAddData", "onAction"]);
const props = defineProps({
  data: {
    type: Array,
  },
  columns: {
    type: Array,
  },
  classTable: { type: String, default: "full-width" },
  loading: { type: Boolean, default: false },
  canDelete: { type: Boolean, default: false },
  canEdit: { type: Boolean, default: false },
  hasAction: { type: Boolean, default: true },
  noDataLabel: { type: String, default: "Tidak ada data saat ini" },
  noResultsLabel: {
    type: String,
    default: "Tidak ada data yang ditemukan dengan filter tersebut",
  },
});

const store = useStore();
const filter = ref("");
const pagination = computed({
  get: () => {
    return store.getters["global/getPagination"];
  },
  set: (val) => {
    console.log("value pagination", val);
  },
});

const onRequest = (e) => {
  emit("onRequest", e);
};
const addData = () => {
  emit("onAddData");
};

const onDetail = (data) => {
  emit("onAction", "detail", data._id);
};

const onEdit = (data) => {
  emit("onAction", "edit", data._id);
};

const onDelete = (data) => {
  emit("onAction", "delete", data._id);
};
</script>
