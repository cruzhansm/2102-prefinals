<template>
  <div>
    <Title :title="'My Cart'" />
    <div class="container-cart">
      <router-view
        :products="cart"
        :finalCart="finalCart"
        @remove-from-cart="removeFromCart"
        @final-cart="buildCart"
      ></router-view>
    </div>
  </div>
</template>

<script>
import Title from "../components/Utilities/Title.vue";
export default {
  name: "Cart",
  components: {
    Title,
  },
  props: {
    cart: Array,
  },
  data() {
    return {
      currentRoute: "Checkout",
      cartProducts: [],
      finalCart: [],
    };
  },
  methods: {
    removeFromCart(id) {
      this.$emit("remove-from-cart", id);
    },
    buildCart(cart) {
      this.finalCart.splice(0);
      cart.forEach((product) => this.finalCart.push(product));
      this.$emit("final-cart", this.finalCart);
    },
  },
  created() {
    this.$router.push({ name: this.currentRoute });
  },
  emits: ["remove-from-cart", "final-cart"],
};
</script>

<style scoped>
.container-cart {
  width: 100%;
}

.active {
  color: var(--tph-text-highlight);
}
</style>