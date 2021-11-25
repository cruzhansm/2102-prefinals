<template>
  <div>
    <Title :title="'Products'" />
    <div style="margin-left: 70px">
      <Products :products="products" @add-favorite="emitFavorite" />
    </div>
  </div>
</template>

<script>
import Title from "../components/Utilities/Title.vue";
import Products from "../components/Products/Products.vue";

export default {
  name: "Home",
  components: {
    Title,
    Products,
  },
  props: {
    products: Array,
  },
  methods: {
    emitFavorite(id) {
      this.$emit("add-favorite", id);
    },
  },
  emits: ["add-favorite"],
};
</script>

<style scoped>
</style>