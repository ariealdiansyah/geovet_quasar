<template>
  <div :class="props.classContainer">
    <div :class="props.classLabel">
      {{ props.label }}
    </div>
    <div :class="props.classSelect">
      <span class="custom-select-32">
        <q-select
          :modelValue="props.value"
          :name="props.nameForm"
          :options="props.options"
          outlined
          dense
          clearable
          :input-debounce="500"
          autocomplete="off"
          hide-bottom-space
          @update:model-value="changeValue"
        />
      </span>
    </div>
  </div>
  <div>
    <!-- {{ props.options }} -->
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const props = defineProps({
  value: { type: String, default: "" },
  label: { type: String, default: "" },
  classContainer: { type: String, default: "row q-mb-sm items-center" },
  classLabel: { type: String, default: "col-3 text-bold text-right" },
  classSelect: { type: String, default: "col-6 q-pl-md" },
  nameForm: { type: String, default: "" },
  options: { type: Array, default: () => [] },
});
const emit = defineEmits(["onChange"]);
const store = useStore();
// const options = computed(() => store.state.global.customerList);
const changeValue = (value) => {
  console.log("on emit", value);
  emit("onChange", value);
};
// console.log("options", options);
</script>
