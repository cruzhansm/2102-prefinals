<template>
  <div class="cart-product-group">
    <div style="margin-bottom: 5px">
      <div class="select-inline">
        <InputCheckbox :id="brand" v-model="isSelected" />
        <div>{{ isSelected }}</div>
        <label :for="brand">{{ brand }}</label>
      </div>
      <div class="select-inline-headers">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
    <CartProduct
      v-for="(product, index) in products"
      :key="index"
      :product="product"
      :isAllSelected="childrenStatus"
      @product-checkout="addToFinalCart"
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
      isSelected: false,
      childrenIsSelected: false,
      childrenStatus: false,
      selectedCount: 0,
      finalSelection: [],
    };
  },
  methods: {
    addToFinalCart({ product, quantity }) {
      console.log(typeof product);
      console.log(typeof quantity);
    },
    removeFromFinalCart(id) {
      this.finalSelection = this.finalSelection.filter(
        (product) => product.id === id
      );
      console.log(this.finalSelection);
    },
    updateProductQuantity({ id, quantity }) {
      console.log(this.finalSelection);
      // const index = this.finalSelection.filter((product) => product.id == id);
      // this.finalSelection[index].bquantity = quantity;
      console.log(id + " " + quantity);
    },
  },
  props: {
    products: Array,
    brand: String,
    isAllSelected: Boolean,
  },
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