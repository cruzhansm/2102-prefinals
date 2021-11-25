<template>
  <h1>{{ title }}</h1>
</template>

<script>
export default {
  name: "Title",
  props: {
    title: String,
  },
};
</script>

<style scoped>
h1 {
  color: var(--tph-text-highlight);
  font-size: 24px;
  font-weight: 700;
  margin: 0;
  margin-bottom: 24px;
}
</style>