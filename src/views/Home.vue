<template>
  <div>
    <Modal v-show="showModal" :text="'Added to favorites!'" />
    <Title :title="'Products'" />
    <div style="margin-left: 70px">
      <Products :products="products" @add-favorite="emitFavorite" />
    </div>
  </div>
</template>

<script>
import Modal from "../components/Modal.vue";
import Title from "../components/Utilities/Title.vue";
import Products from "../components/Products/Products.vue";

export default {
  name: "Home",
  components: {
    Title,
    Products,
    Modal,
  },
  data() {
    return { showModal: false };
  },
  props: {
    products: Array,
  },
  watch: {
    showModal(val) {
      if (val) {
        setTimeout(() => (this.showModal = false), 500);
      }
    },
  },
  methods: {
    emitFavorite(id) {
      this.$emit("add-favorite", id);
      this.showModalBrief("Added to favorites!");
    },
    showModalBrief() {
      this.showModal = true;
    },
  },
  emits: ["add-favorite"],
};
</script>

<style scoped>
</style>