<template>
  <div class="container-checkout">
    <div class="container-cart-products">
      <div class="cart-select-all">
        <div class="select-inline">
          <InputCheckbox
            :checked="isChecked"
            id="selectAll"
            v-model="isSelected"
          />
          <label for="selectAll">Select All</label>
        </div>
        <div class="select-inline-headers">
          <div><span>Unit Price</span></div>
          <div><span>Quantity</span></div>
          <div><span>Total Price</span></div>
        </div>
      </div>
      <CartBrands
        :brands="cart"
        :isAllSelected="isSelected === true ? true : false"
        @update-cart="buildFinalCart"
        @remove-from-cart="removeFromCart"
        @uncheck-select="
          isChecked = false;
          selected = 0;
        "
        @check-select="getStatus"
      />
    </div>
    <div class="container-checkout-area">
      <CartCheckoutForm
        :totalPrice="totalPrice"
        :finalCart="finalCart"
        @update-total-price="updateTotalPrice"
        @reset-price="updateTotalPrice(totalPriceOrig)"
        @final-cart="$emit('final-cart', finalCart)"
      />
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
      totalPriceOrig: 0,
      selected: 0,
      isSelected: Boolean,
      isChecked: Boolean,
      total: Number,
    };
  },
  watch: {
    products: {
      handler() {
        console.log("DELETED");
        this.cart.splice(0);
        // val.forEach((product) => this.cart.push(product));
        this.createCart();
      },
      deep: true,
    },
    isSelected: function (val) {
      if (val) {
        this.total = this.selected;
      }
    },
  },
  props: {
    products: Array,
  },
  methods: {
    getStatus() {
      this.selected++;
      console.log(this.selected);
      if (this.selected == this.total) {
        this.isSelected = true;
        this.isChecked = true;
      }
    },
    buildFinalCart(cart) {
      const tp = cart.reduce((a, b) => {
        return a + b.bquantity * b.price;
      }, 0);
      this.totalPrice = tp.toString().length == 0 ? 0 : tp;
      this.totalPriceOrig = this.totalPrice;
      this.finalCart.splice(0);
      cart.forEach((product) => this.finalCart.push(product));
    },
    removeFromCart(id) {
      this.$emit("remove-from-cart", id);
    },
    createCart() {
      let brands = [
        ...new Set(
          this.$props.products.map((product) => {
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
    },
    updateTotalPrice(price) {
      this.totalPrice = price;
    },
  },
  mounted() {
    this.createCart();
  },
  emits: ["remove-from-cart", "final-cart"],
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
  width: 45%;
}

.select-inline-headers {
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