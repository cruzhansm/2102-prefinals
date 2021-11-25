<template>
  <em class="error-message">
    {{ message }}
  </em>
</template>

<script>
export default {
  name: "Error",
  props: {
    message: String,
  },
};
</script>

<style scoped>
.error-message {
  /* color: var(--tph-text-highlight); */
  color: orange;
  font-weight: 500;
  font-size: 12px;
}
</style>