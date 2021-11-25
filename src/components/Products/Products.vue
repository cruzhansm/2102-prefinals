<template>
  <div class="container-products">
    <ProductCard
      :key="index"
      v-for="(product, index) in products"
      :productID="product.id"
      :name="product.name"
      :price="product.price"
      :quantity="product.quantity"
      :categories="product.category"
      :img="product.img"
      @add-favorite="emitFavorite"
      @remove-favorite="emitRemoveFavorite"
    />
  </div>
</template>

<script>
import ProductCard from "../Products/ProductCard.vue";

export default {
  name: "Products",
  components: {
    ProductCard,
  },
  props: {
    products: Array,
  },
  methods: {
    emitFavorite(id) {
      this.$emit("add-favorite", id);
    },
    emitRemoveFavorite(id) {
      this.$emit("remove-favorite", id);
    },
  },
  emits: ["add-favorite", "remove-favorite"],
};
</script>

<style scoped>
.container-products {
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
  width: 80%;
}
</style>