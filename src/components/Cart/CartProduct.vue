<template>
  <div class="cart-product-formal">
    <div class="cart-product-left">
      <InputCheckbox @checkbox-checked="updateStatus" />
      <img :src="product.img" :alt="product.name" class="product-img" />
      <div class="product-info">
        <div class="product-name">{{ product.name }}</div>
        <div class="product-stocks">Stocks left: {{ product.quantity }}</div>
      </div>
    </div>
    <div class="cart-product-right">
      <div>P{{ product.price }}</div>
      <div class="product-quantity">
        <i
          class="fa-solid fa-circle-minus"
          @click="this.buyQuantity > 1 ? this.buyQuantity-- : this.buyQuantity"
        ></i>
        <Input
          :type="'number'"
          style="width: 50px"
          :min="1"
          :max="product.quantity"
          :value="getUpdatedQuantity"
          @input="updateQuantity"
          :style="validInput ? '' : 'border: 2px solid darkred'"
        />
        <i
          class="fa-solid fa-circle-plus"
          @click="
            this.buyQuantity < product.quantity
              ? this.buyQuantity++
              : this.buyQuantity
          "
        ></i>
      </div>
      <div>P{{ product.price * buyQuantity }}</div>
    </div>
  </div>
</template>

<script>
import Input from "../Input/Input.vue";
import InputCheckbox from "../Input/InputCheckbox.vue";
export default {
  name: "CartProduct",
  data() {
    return {
      buyQuantity: Number,
      validInput: true,
      isSelected: false,
    };
  },
  props: { product: Object, isAllSelected: Boolean },
  components: { Input, InputCheckbox },
  watch: {
    buyQuantity: function () {
      if (
        this.buyQuantity > this.$props.product.quantity ||
        this.buyQuantity < 1
      ) {
        this.validInput = false;
      } else {
        this.validInput = true;
      }

      this.isSelected
        ? this.$emit("update-quantity", {
            product: this.product,
            quantity: this.buyQuantity,
          })
        : "";
    },
  },
  methods: {
    updateQuantity(event) {
      this.buyQuantity = parseInt(event.target.value);
    },
    updateStatus(status) {
      this.isSelected = status;

      if (status === true) {
        this.$emit("product-checkout", {
          id: this.product.id,
          quantity: this.buyQuantity,
        });
      } else {
        this.$emit("product-remove", this.product.id);
      }
    },
  },
  created() {
    this.buyQuantity = this.$props.product.bquantity;
  },
  computed: {
    getUpdatedQuantity() {
      return this.buyQuantity;
    },
    determineStatus() {
      return this.isSelected
        ? true
        : this.$props.isAllSelected
        ? true
        : this.isSelected
        ? true
        : false;
    },
  },
  emits: ["product-checkout", "product-remove", "update-quantity"],
};
</script>

<style scoped>
.cart-product-formal {
  border-top: 1px solid var(--tph-tertiary);
  border-bottom: 1px solid var(--tph-tertiary);
  display: flex;
  align-items: center;
  width: 100%;
  height: 80px;
}

.cart-product-left,
.cart-product-right {
  width: 50%;
}

.cart-product-left {
  display: flex;
  align-items: center;
  gap: 20px;
  padding-left: 40px;
}

.cart-product-right {
  display: flex;
  justify-content: space-between;
}

.cart-product-right > div {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 33.33%;
}

.product-quantity {
  gap: 10px;
}

.product-quantity > i {
  color: var(--tph-tertiary);
  cursor: pointer;
}

.product-quantity > i:hover {
  color: var(--tph-highlight);
}

.product-img {
  width: 50px;
  height: 50px;
}

.product-stocks {
  color: var(--tph-text-secondary);
}

.product-info {
  display: flex;
  flex-direction: column;
  width: max-content;
}
</style>