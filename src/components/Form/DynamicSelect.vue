<template>
  <div :class="classContainer">
    <div :class="classLabel">
      {{ label }}
    </div>
    <div :class="classSelect">
      <span class="custom-select-32">
        <q-select
          :modelValue="value"
          :name="nameForm"
          :options="filteredOptions"
          outlined
          dense
          :input-debounce="500"
          autocomplete="off"
          hide-bottom-space
          map-options
          :disable="disable"
          :filled="filled"
          use-input
          fill-input
          hide-selected
          :hide-dropdown-icon="disable"
          @update:model-value="changeValue"
          @filter="filterFn"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">
                Data Tidak Ada
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </span>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { ref } from "vue";

const props = defineProps({
  value: { type: String, default: "" },
  label: { type: String, default: "" },
  index: { type: Number, default: 0 },
  classContainer: { type: String, default: "row q-mb-sm items-center" },
  classLabel: { type: String, default: "col-3 text-bold text-right" },
  classSelect: { type: String, default: "col-6 q-pl-md" },
  classQty: { type: String, default: "col q-pl-md" },
  nameForm: { type: String, default: "" },
  options: { type: Array, default: () => [] },
  disable: { type: Boolean, default: false },
  filled: { type: Boolean, default: false },
});
const filteredOptions = ref(props.options);
const emit = defineEmits(["onChange"]);
const store = useStore();
const changeValue = (value) => {
  emit("onChange", value);
};

const filterFn = (val, update) => {
  if (val === "") {
    update(() => {
      filteredOptions.value = props.options;
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    filteredOptions.value = props.options.filter((v) => {
      return v.name.toLowerCase().indexOf(needle) > -1;
    });
  });
};
</script>
