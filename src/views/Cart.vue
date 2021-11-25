<template>
  <div>
    <Title :title="'My Cart'" />
    <div class="container-cart">
      <router-view :products="this.$props.cart"></router-view>
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
    };
  },
  created() {
    this.$router.push({ name: this.currentRoute });
  },
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