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
          use-input
          :input-debounce="500"
          autocomplete="off"
          hide-bottom-space
          @filter="filterFn"
          @update:model-value="changeValue"
        />
      </span>
    </div>
  </div>
</template>

<script setup>
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
});

const filteredOptions = ref(props.options);

const filterFn = (val, update) => {
  if (val === "") {
    update(() => {
      filteredOptions.value = props.options;
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    filteredOptions.value = props.options.filter((v) =>
      v.label.toLowerCase().includes(needle.toLowerCase())
    );
  });
};
const emit = defineEmits(["onChange"]);

const changeValue = (value) => {
  emit("onChange", value);
};
</script>

<style></style>
