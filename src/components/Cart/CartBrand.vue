<template>
  <div class="cart-product-group">
    <div style="margin-bottom: 5px">
      <div class="select-inline" @click="pr">
        <InputCheckbox :checked="isSelected" :id="brand" v-model="isSelected" />
        <label :for="brand">{{ brand }}</label>
      </div>
      <div class="select-inline-headers">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
    <CartProduct
      v-for="product in products"
      :key="product.id"
      :product="product"
      :isAllSelected="isSelected"
      @product-checkout="addToFinalCart"
      @product-remove="removeFromFinalCart"
      @update-quantity="updateProductQuantity"
      @remove-from-cart="removeFromCart"
    />
  </div>
</template>

<script>
import CartProduct from "./CartProduct.vue";
import InputCheckbox from "../Input/InputCheckbox.vue";
export default {
  name: "CartBrand",
  components: {
    CartProduct,
    InputCheckbox,
  },
  data() {
    return {
      isSelected: Boolean,
      finalSelection: [],
      cart: [],
    };
  },
  props: {
    products: Array,
    brand: String,
    isAllSelected: Boolean,
  },
  watch: {
    isAllSelected: function () {
      this.isAllSelected === true
        ? (this.isSelected = true)
        : (this.isSelected = false);
    },
    isSelected: function (val) {
      val === false ? this.$emit("uncheck-select") : this.$emit("check-select");
    },
  },
  methods: {
    addToFinalCart({ product, quantity }) {
      const p = product;
      p.bquantity = quantity;

      if (this.finalSelection.find((item) => item.id === p.id) == undefined) {
        this.finalSelection.push(p);
      }

      this.$emit("brand-cart-update", {
        brand: this.brand,
        products: this.finalSelection,
      });
    },
    removeFromFinalCart(id) {
      this.finalSelection = this.finalSelection.filter(
        (product) => product.id !== id
      );
      this.$emit("brand-cart-update", {
        brand: this.brand,
        products: this.finalSelection,
      });
    },
    removeFromCart(id) {
      this.$emit("remove-from-cart", id);
      this.removeFromFinalCart(id);
    },
    updateProductQuantity({ id, quantity }) {
      const index = this.finalSelection.findIndex(
        (product) => product.id == id
      );
      this.finalSelection[index].bquantity = quantity;
      this.$emit("brand-cart-update", {
        brand: this.brand,
        products: this.finalSelection,
      });
    },
  },
  mounted() {
    this.products.forEach((product) => this.cart.push(product));
  },
  emits: [
    "brand-cart-update",
    "remove-from-cart",
    "check-select",
    "uncheck-select",
  ],
};
</script>

<style scoped>
.cart-product-group {
  background-color: var(--tph-secondary);
  border-radius: 12px;
  width: 100%;
  padding: 30px 45px;
}

.select-inline,
.select-inline-headers {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  width: max-content;
  width: 50%;
}

.select-inline-headers {
  justify-content: space-between;
  gap: 0;
}

.select-inline-headers > span {
  color: var(--tph-text-secondary);
  font-size: 16px;
}
</style>