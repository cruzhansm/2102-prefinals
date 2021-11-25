<template>
  <div class="pill-container">
    {{ heading }}
    <Pill :key="index" v-for="(item, index) in items" :text="item" />
  </div>
</template>

<script>
import Pill from "../Pills/Pill.vue";
export default {
  components: {
    Pill,
  },
  props: {
    heading: {
      type: String,
      default: "",
    },
    items: Array,
  },
};
</script>

<style scoped>
.pill-container {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
</style>