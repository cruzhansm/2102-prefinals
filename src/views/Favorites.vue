<template>
  <div>
    <Title :title="'My Favorites'" />
    <Products :products="favorites" @remove-favorite="emitRemoveFavorite" />
  </div>
</template>

<script>
import Products from "../components/Products/Products.vue";
import Title from "../components/Utilities/Title.vue";

export default {
  name: "Favorites",
  props: {
    favorites: Array,
  },
  components: {
    Products,
    Title,
  },
  methods: {
    emitRemoveFavorite(id) {
      this.$emit("remove-favorite", id);
    },
  },
};
</script>

<style scoped>
</style>