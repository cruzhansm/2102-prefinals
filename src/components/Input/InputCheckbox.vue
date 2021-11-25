<template>
  <input
    type="checkbox"
    v-model="isChecked"
    @change="$emit('checkbox-checked', isChecked)"
  />
</template>

<script>
export default {
  name: "InputCheckbox",
  data() {
    return {
      isChecked: false,
    };
  },
  emits: ["checkbox-checked"],
};
</script>

<style scoped>
input[type="checkbox"] {
  background: var(--tph-tertiary);
  border-radius: 3px;
  cursor: pointer;
  width: 18px !important;
  height: 18px !important;
  -webkit-appearance: none;
  -moz-appearance: none;
  -o-appearance: none;
  appearance: none;
  box-shadow: none;
  outline: 0;
  font-size: 21px;
  line-height: 21px;
  text-align: center;
}

input[type="checkbox"]:checked:after {
  content: "✔";
  font-size: 21px;
  line-height: 21px;
  color: white;
}
</style>