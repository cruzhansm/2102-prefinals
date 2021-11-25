<template>
  <div class="brands">
    <CartBrand
      :key="index"
      v-for="(brand, index) in this.$props.brands"
      :products="brand.products"
      :brand="brand.brand"
    />
  </div>
</template>

<script>
import CartBrand from "./CartBrand.vue";
export default {
  name: "CartBrands",
  props: {
    brands: Array,
  },
  components: {
    CartBrand,
  },
};
</script>

<style scoped>
.brands {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>