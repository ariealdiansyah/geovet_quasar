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
        <q-th style="font-weight: bold; text-align: center"> Action </q-th>
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
        <q-td style="text-align: center">
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
});

const store = useStore();
const filter = ref("");
const pagination = computed({
  get: () => {
    return store.getters["global/getPagination"];
  },
  set: (val) => {
    // console.log("value pagination", val);
  },
});

const onRequest = (e) => {
  emit("onRequest", e);
};
const addData = () => {
  emit("onAddData");
};

const onDetail = (data) => {
  console.log("test click table", data);
  emit("onAction", "detail", data.id);
};

const onEdit = (data) => {
  console.log("test click table", data);
  emit("onAction", "edit", data.id);
};

const onDelete = (data) => {
  console.log("test click table", data);
  emit("onAction", "delete", data.id);
};
</script>
