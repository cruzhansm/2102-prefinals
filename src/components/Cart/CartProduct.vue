<template>
  <div class="cart-product-formal">
    <div class="cart-product-left">
      <InputCheckbox :checked="isSelected" v-model="isSelected" />
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
      <div>
        P{{
          validInput
            ? product.price * buyQuantity
            : product.price * product.bquantity
        }}
      </div>
    </div>
    <div class="delete">
      <i class="fa-solid fa-trash" @click="removeFromCart"> </i>
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
  props: { product: Object, isAllSelected: { type: Boolean, default: false } },
  components: { Input, InputCheckbox },
  watch: {
    buyQuantity: function () {
      if (this.buyQuantity > this.product.quantity || this.buyQuantity < 1) {
        this.validInput = false;
      } else {
        this.validInput = true;
      }

      this.isSelected && this.validInput
        ? this.$emit("update-quantity", {
            id: this.product.id,
            quantity: this.buyQuantity,
          })
        : "";
    },
    isAllSelected: function (val) {
      if (val == true && this.isSelected != true) {
        this.isSelected = true;
      } else if (val == false && this.isSelected == true) {
        this.isSelected = false;
      }
    },
    isSelected: function (val) {
      this.updateStatus(val);
    },
  },
  methods: {
    updateQuantity(event) {
      const q = parseInt(event.target.value);
      this.buyQuantity = isNaN(q)
        ? !this.validInput
          ? this.buyQuantity
          : ""
        : q;
    },
    updateStatus(status) {
      this.isSelected = status;

      if (status === true && this.validInput) {
        this.$emit("product-checkout", {
          product: this.product,
          quantity: this.buyQuantity,
        });
      } else {
        this.$emit("product-remove", this.product.id);
      }
    },
    removeFromCart() {
      this.$emit("remove-from-cart", this.product.id);
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
  emits: [
    "product-checkout",
    "product-remove",
    "update-quantity",
    "remove-from-cart",
  ],
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

.cart-product-left {
  display: flex;
  align-items: center;
  gap: 20px;
  width: 45%;
  padding-left: 40px;
}

.cart-product-right {
  display: flex;
  justify-content: space-between;
  width: 50%;
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

.delete > i,
.product-quantity > i {
  color: var(--tph-tertiary);
  cursor: pointer;
}

.delete > i:hover,
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

.delete > i {
  font-size: 24px;
}
</style>