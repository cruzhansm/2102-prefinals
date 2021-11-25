<template>
  <div class="checkout">
    <div class="checkout-details">
      <div class="checkout-calculations">
        <div class="checkout-details-left">
          <div>Subtotal</div>
          <div>Voucher</div>
        </div>
        <div class="checkout-details-right">
          <div>P{{ totalPrice }}</div>
          <div>- P0</div>
        </div>
      </div>
      <div class="checkout-total">
        <div class="checkout-details-left">TOTAL</div>
        <div class="checkout-details-right total-price">
          P{{ totalPrice - voucherDiscount }}
        </div>
      </div>
    </div>
    <div style="display: inline-flex; gap: 20px">
      <Input
        :type="'text'"
        :width="'60%'"
        :height="'45px'"
        :placeholder="'Voucher code'"
      />
      <Input
        :type="'number'"
        :width="'40%'"
        :height="'45px'"
        :min="1"
        :placeholder="'Amount'"
      />
    </div>
    <div class="checkout-button">
      <Button
        :text="'Checkout'"
        :bgcolor="'var(--tph-text-highlight)'"
        :width="'100%'"
      />
    </div>
  </div>
</template>

<script>
import Input from "../Input/Input.vue";
import Button from "../Button.vue";
export default {
  name: "CartCheckoutForm",
  components: {
    Button,
    Input,
  },
  data() {
    return { voucherDiscount: 0 };
  },
  props: {
    totalPrice: Number,
  },
};
</script>

<style scoped>
.checkout {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
}

.checkout-details {
  background-color: var(--tph-secondary);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 20px;
}

.checkout-details-left {
  width: 60%;
  text-align: right;
}

.checkout-details-right {
  width: 40%;
}

.checkout-calculations,
.checkout-total {
  display: inline-flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  width: 100%;
}

.checkout-calculations {
  border-bottom: 2px solid var(--tph-text-secondary);
  padding-bottom: 20px;
}

.checkout-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.total-price {
  color: var(--tph-text-highlight);
  font-size: 24px;
  font-weight: 700;
}
</style>