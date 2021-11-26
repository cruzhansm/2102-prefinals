<template>
  <div>
    <Modal v-show="showModal" :text="'Removed from favorites!'" />
    <Title :title="'My Favorites'" />
    <Products
      :products="favorites"
      @remove-favorite="emitRemoveFavorite"
      style="margin-left: 70px"
    />
  </div>
</template>

<script>
import Modal from "../components/Modal.vue";
import Products from "../components/Products/Products.vue";
import Title from "../components/Utilities/Title.vue";

export default {
  name: "Favorites",
  props: {
    favorites: Array,
  },
  data() {
    return { showModal: false };
  },
  watch: {
    showModal: function (val) {
      if (val) {
        setTimeout(() => (this.showModal = false), 500);
      }
    },
  },
  components: {
    Products,
    Modal,
    Title,
  },
  methods: {
    emitRemoveFavorite(id) {
      this.$emit("remove-favorite", id);
      this.showModal = true;
    },
  },
};
</script>

<style scoped>
</style>