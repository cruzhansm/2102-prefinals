<template>
  <div class="pill">{{ text }}</div>
</template>

<script>
export default {
  name: "Pill",
  props: {
    text: String,
  },
};
</script>

<style scoped>
.pill {
  background-color: var(--tph-tertiary);
  border-radius: 10px;
  color: var(--tph-text-highlight);
  padding: 5px 10px;
  font-size: 12px;
  font-weight: 700;
}
</style>