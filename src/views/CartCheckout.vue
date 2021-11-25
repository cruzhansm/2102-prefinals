<template>
  <div class="container-checkout">
    <div class="container-cart-products">
      <div class="cart-select-all">
        <div class="select-inline">
          <InputCheckbox id="selectAll" />
          <label for="selectAll">Select All</label>
        </div>
        <div class="select-inline-headers">
          <div><span>Unit Price</span></div>
          <div><span>Quantity</span></div>
          <div><span>Total Price</span></div>
        </div>
      </div>
      <CartBrands :brands="cart" />
    </div>
    <div class="container-checkout-area">
      <CartCheckoutForm :total-price="totalPrice" />
    </div>
  </div>
</template>

<script>
import CartBrands from "../components/Cart/CartBrands.vue";
import CartCheckoutForm from "../components/Cart/CartCheckoutForm.vue";
import InputCheckbox from "../components/Input/InputCheckbox.vue";

export default {
  name: "CartCheckout",
  components: {
    CartBrands,
    CartCheckoutForm,
    InputCheckbox,
  },
  data() {
    return {
      cart: [],
      finalCart: [],
      totalPrice: 0,
    };
  },
  props: {
    products: Array,
  },
  watch: {
    totalPrice: function () {
      // REBUILD THE FINAL CART
      console.log(this.totalPrice);
    },
  },
  created() {
    const brands = [
      ...new Set(
        this.$props.products.map((product) => {
          this.totalPrice += product.price * product.bquantity;
          return product.brand;
        })
      ),
    ];

    brands.forEach((brand) => {
      this.cart.push({
        brand: brand,
        products: this.$props.products.filter(
          (product) => product.brand == brand
        ),
      });
    });

    console.log(this.totalPrice);
  },
};
</script>

<style scoped>
.container-checkout {
  display: flex;
  gap: 70px;
  width: 100%;
}

.container-checkout-area {
  width: 20%;
}

.container-cart-products {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 65%;
}

.cart-select-all {
  background-color: var(--tph-secondary);
  border-radius: 12px;
  display: flex;
  align-items: center;
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

.select-inline-headers > div {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 33.33%;
}

.select-inline-headers > div > span {
  color: var(--tph-text-secondary);
  font-size: 16px;
}
</style>