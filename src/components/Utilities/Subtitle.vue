<template>
  <h2>{{ title }}</h2>
</template>

<script>
export default {
  name: "Subtitle",
  props: {
    title: String,
  },
};
</script>

<style scoped>
h2 {
  font-size: 24px;
  font-weight: 400;
  margin: 0;
  margin-bottom: 24px;
}
</style>