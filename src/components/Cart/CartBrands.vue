<template>
  <div class="brands">
    <CartBrand
      :key="index"
      v-for="(brand, index) in brands"
      :products="brand.products"
      :brand="brand.brand"
      :isAllSelected="
        isSelected === true || isAllSelected === true ? true : false
      "
      @brand-cart-update="collateAllProducts"
      @remove-from-cart="removeFromCart"
      @uncheck-select="$emit('uncheck-select')"
      @check-select="$emit('check-select')"
    />
  </div>
</template>

<script>
import CartBrand from "./CartBrand.vue";
export default {
  name: "CartBrands",
  data() {
    return {
      finalCart: [],
      isSelected: Boolean,
    };
  },
  props: {
    brands: Array,
    isAllSelected: Boolean,
  },
  methods: {
    collateAllProducts({ brand, products }) {
      let cleared = false;
      let finalFinalCart = [];
      this.finalCart[brand] = products;

      for (let b in this.finalCart) {
        if (this.finalCart[b].length > 0) {
          cleared = true;
          this.finalCart[b].forEach((product) => finalFinalCart.push(product));
        }
      }

      if (cleared) {
        this.$emit("update-cart", finalFinalCart);
      } else {
        this.$emit("update-cart", []);
      }
    },
    removeFromCart(id) {
      this.$emit("remove-from-cart", id);
    },
  },
  components: {
    CartBrand,
  },
  emits: ["update-cart", "remove-from-cart", "uncheck-select", "check-select"],
};
</script>

<style scoped>
.brands {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>