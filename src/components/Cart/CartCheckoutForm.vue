<template>
  <div class="checkout">
    <div class="checkout-details">
      <div class="checkout-calculations">
        <div class="checkout-details-left">
          <div>Subtotal</div>
          <div>Voucher</div>
        </div>
        <div class="checkout-details-right">
          <div>P{{ totalPrice + voucherDiscount }}</div>
          <div>P{{ voucherDiscount }}</div>
        </div>
      </div>
      <div class="checkout-total">
        <div class="checkout-details-left">TOTAL</div>
        <div class="checkout-details-right total-price">P{{ totalPrice }}</div>
      </div>
    </div>
    <div style="display: inline-flex; gap: 20px">
      <Input
        :type="'text'"
        :width="'60%'"
        :height="'45px'"
        :placeholder="'Voucher'"
        @input="verifyVoucher"
      />
      <Input
        :type="'number'"
        :width="'40%'"
        :height="'45px'"
        :min="1"
        :placeholder="'Cash'"
        :style="validInput == false ? 'border: 2px solid darkred;' : ''"
        @input="sanitizeCash"
      />
    </div>
    <div class="checkout-button">
      <Button
        :text="'Checkout'"
        :bgcolor="'var(--tph-text-highlight)'"
        :width="'100%'"
        @click="checkout"
      />
    </div>
    <Error
      v-if="validInput == false"
      :message="'Cash entered is lesser than total price.'"
    />
  </div>
</template>

<script>
import Button from "../Button.vue";
import Error from "../Utilities/Error.vue";
import Input from "../Input/Input.vue";
export default {
  name: "CartCheckoutForm",
  components: {
    Button,
    Error,
    Input,
  },
  data() {
    return { voucherDiscount: 0, cash: 0, validInput: Boolean };
  },
  props: {
    totalPrice: Number,
    voucherPrice: Number,
    finalCart: Array,
  },
  methods: {
    verifyVoucher(event) {
      const voucher = event.target.value.toLowerCase();
      const vouchers = ["menu50", "menu20", "menu10", "menu200flat"];
      const voucherDiscount = {
        menu50: 0.5,
        menu20: 0.8,
        menu10: 0.9,
        menu200flat: -200,
      };
      let valid = voucher.length > 0 ? true : false;

      if (valid) {
        valid = vouchers.some((v) => v === voucher);

        if (valid) {
          let updated;
          updated =
            voucher !== "menu200flat"
              ? this.totalPrice * voucherDiscount[voucher]
              : this.totalPrice > 1000
              ? this.totalPrice + voucherDiscount[voucher]
              : this.totalPrice;

          this.voucherDiscount = this.totalPrice - updated;
          this.$emit("update-total-price", updated);
        } else {
          this.voucherDiscount = 0;
          this.$emit("reset-price");
        }
      }
    },
    sanitizeCash(event) {
      let cash = event.target.value;
      cash.replace(/\D/g, "");

      if (cash < this.totalPrice) {
        this.validInput = false;
      } else {
        this.cash = cash;
        this.validInput = true;
      }
    },
    checkout() {
      if (this.cash >= this.totalPrice && this.totalPrice != 0) {
        this.$emit("final-cart", this.finalCart);
        this.$router.push({ name: "Checkout Done" });
      }
    },
  },
  emit: ["update-total-price", "reset-price", "final-cart"],
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