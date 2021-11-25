<template>
  <div class="product-card">
    <div class="product-img">
      <img :src="img" :alt="name" />
      <div class="product-actions-overlay">
        <Button
          :productID="productID"
          :icon="'fa-solid fa-info'"
          :text="'View details'"
          :bgcolor="'var(--tph-highlight)'"
          @click="redirectToDetails"
        />
        <Button
          v-if="this.$route.path == '/'"
          :productID="productID"
          :icon="'fa-solid fa-heart'"
          :text="'Favorite'"
          :bgcolor="'var(--tph-primary)'"
          :redirect="'/favorites'"
          @click="addToFavorites"
        />
        <Button
          v-if="this.$route.path == '/favorites'"
          :productID="productID"
          :icon="'fa-solid fa-heart'"
          :text="'Unfavorite'"
          :bgcolor="'var(--tph-primary)'"
          :redirect="'/favorites'"
          @click="removeFromFavorites"
        />
      </div>
    </div>
    <div>
      <div class="product-inline">
        <div class="product-name">{{ name }}</div>
        <div class="product-price">P {{ price }}</div>
      </div>
      <div
        class="product-inline"
        style="margin-bottom: 3px; align-items: center"
      >
        <em class="product-status">In stock</em>
        <div class="product-quantity">Stocks left : {{ quantity }}</div>
      </div>
      <PillContainer :items="categories" />
    </div>
  </div>
</template>

<script>
import Button from "../Button.vue";
import PillContainer from "../Pills/PillContainer.vue";

export default {
  name: "Product",
  props: {
    productID: Number,
    name: String,
    price: Number,
    quantity: Number,
    categories: Array,
    img: String,
  },
  components: {
    Button,
    PillContainer,
  },
  methods: {
    redirectToDetails() {
      this.$router.push({
        name: "Product Details",
        params: { id: this.productID },
      });
    },
    addToFavorites() {
      this.$emit("add-favorite", this.productID);
    },
    removeFromFavorites() {
      this.$emit("remove-favorite", this.productID);
    },
  },
  emits: ["add-favorite", "remove-favorite"],
};
</script>

<style scoped>
.product-card {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 230px;
}

.product-img {
  border-radius: 12px;
  width: 230px;
  height: 230px;
  position: relative;
}

.product-img:hover .product-actions-overlay {
  z-index: 11;
}

.product-actions-overlay {
  background-color: rgba(33, 55, 74, 0.5);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  z-index: -1;
  width: 100%;
  height: 100%;
  padding: 30px;
  position: absolute;
  top: 0;
}

img {
  border-radius: 12px;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-inline {
  display: flex;
  justify-content: space-between;
  margin: 0 5px;
  width: 100%;
}

.product-name {
  font-size: 20px;
}

.product-price {
  color: var(--tph-text-highlight);
  font-weight: 700;
  font-size: 20px;
}

.product-status {
  color: var(--tph-text-highlight);
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
}

.product-quantity {
  color: var(--tph-text-secondary);
  font-size: 18px;
}
</style>