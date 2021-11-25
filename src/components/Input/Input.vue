<template>
  <input
    :style="getStyle"
    :type="type"
    :min="min"
    :max="max"
    :placeholder="placeholder"
  />
</template>

<script>
export default {
  name: "Input",
  props: {
    type: String,
    min: Number,
    max: Number,
    placeholder: String,
    width: {
      type: String,
      default: "max-content",
    },
    height: { type: String, default: "max-content" },
  },
  computed: {
    getStyle() {
      return `width: ${this.width}; height: ${this.height};`;
    },
  },
};
</script>

<style scoped>
input,
input:focus,
input:hover,
input:checked,
input:focus-visible {
  background-color: var(--tph-tertiary);
  border-radius: 73px;
  border: 0;
  box-shadow: none;
  color: var(--tph-text-primary);
  font-family: "Poppins-Regular", sans-serif;
  outline: none;
  font-size: 16px;
  padding: 5px 15px;
  width: 100%;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}
</style>