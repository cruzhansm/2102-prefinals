<template>
  <div>
    <Modal v-show="showModal" :text="modalText" />
    <Title :title="'Product Details'" />
    <div class="container-product-detail">
      <div class="container-product-formal">
        <img :src="product.img" :alt="product.name" class="product-img" />
        <div class="product-information">
          <span class="product-name">{{ product.name }}</span>
          <div class="product-inline">
            <div class="product-price">P {{ product.price }}.00</div>
            <i
              :class="determineIcon"
              @mouseover="this.isHovered = true"
              @mouseleave="this.isHovered = false"
              @click="favoriteThis"
            ></i>
          </div>
          <div class="product-inline-gap">
            <i class="fa-solid fa-star"></i>
            <div>0.0</div>
            <div>|</div>
            <div>0 ratings</div>
          </div>
          <PillContainer :items="product.category" :heading="'Category:'" />
          <div style="font-size: 18px">
            Brand: <em>{{ product.brand }}</em>
          </div>
          <div class="product-information-actions">
            <div class="product-inline product-quantity">
              <span>Quantity</span>
              <div class="product-inline">
                <i
                  class="fa-solid fa-circle-minus"
                  @click="
                    this.buyQuantity > 1 ? this.buyQuantity-- : this.buyQuantity
                  "
                ></i>
                <div style="width: 60px">
                  <Input
                    id="quantity"
                    :type="'number'"
                    :min="1"
                    :max="product.quantity"
                    :width="'60px'"
                    :value="getUpdatedQuantity"
                    @input="updateQuantity"
                  />
                </div>
                <i
                  class="fa-solid fa-circle-plus"
                  @click="
                    this.buyQuantity < product.quantity
                      ? this.buyQuantity++
                      : this.buyQuantity
                  "
                ></i>
              </div>
              <span class="text-muted">{{ product.quantity }} stocks left</span>
            </div>
            <Error
              v-if="validInput === false"
              :message="'Quantity must not exceed nor be lower than the actual stock.'"
            />
            <div @click="addToCart">
              <Button
                :text="'Add to cart'"
                :bgcolor="'var(--tph-highlight)'"
                :width="'100%'"
                :height="'48px'"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="container-product-description">
        <Subtitle :title="'Product Description'" />
        <p>
          {{ product.description }}
        </p>
      </div>
      <div class="container-product-reviews">
        <Subtitle :title="'Product Reviews'" />
        <div class="product-reviews-formal">
          <div class="product-reviews-rating">
            <i class="fa-solid fa-star"></i>
            <div class="product-reviews-rating-area">
              <span style="font-size: 36px; line-height: 36px">0.0</span>
              <span style="font-size: 18px">out of 5</span>
            </div>
          </div>
          <Button
            :icon="'fa-solid fa-filter'"
            :text="'Filter'"
            :bgcolor="'var(--tph-tertiary)'"
            :color="'var(--tph-text-secondary)'"
          />
        </div>
        <div class="placeholder">No reviews yet.</div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "../components/Button.vue";
import Error from "../components/Utilities/Error.vue";
import Input from "../components/Input/Input.vue";
import Modal from "../components/Modal.vue";
import Subtitle from "../components/Utilities/Subtitle.vue";
import Title from "../components/Utilities/Title.vue";
import PillContainer from "../components/Pills/PillContainer.vue";

export default {
  data() {
    return {
      product: Object,
      isFavorited: Boolean,
      favoriteIcon: String,
      isHovered: false,
      buyQuantity: 1,
      validInput: true,
      showModal: false,
      modalText: "",
    };
  },
  components: {
    Button,
    Error,
    Input,
    Modal,
    Subtitle,
    Title,
    PillContainer,
  },
  watch: {
    buyQuantity: function () {
      if (this.buyQuantity > this.product.quantity || this.buyQuantity < 1) {
        this.validInput = false;
      } else {
        this.validInput = true;
      }
    },
    showModal(val) {
      if (val) {
        setTimeout(() => {
          this.showModal = false;
          this.modalText = "";
        }, 500);
      }
    },
  },
  props: {
    products: Array,
    favorites: Array,
  },
  methods: {
    favoriteThis() {
      this.isFavorited = !this.isFavorited;
      this.modalText =
        this.isFavorited == true
          ? "Added to favorites!"
          : "Removed from favorites!";
      this.showModal = true;

      this.$emit("update-favorite", {
        id: this.product.id,
        status: this.isFavorited,
      });
    },
    updateQuantity(event) {
      this.buyQuantity = parseInt(event.target.value);
    },
    addToCart() {
      if (this.validInput) {
        this.$emit("add-to-cart", {
          id: this.product.id,
          quantity: this.buyQuantity,
        });
        this.modalText = "Added to cart!";
      } else {
        this.modalText = "Cannot buy more than stock.";
      }
      this.showModal = true;
    },
  },
  computed: {
    determineIcon() {
      return this.isFavorited
        ? "fa-solid fa-heart active"
        : this.isHovered
        ? "fa-regular fa-heart active"
        : "fa-regular fa-heart";
    },
    getUpdatedQuantity() {
      return this.buyQuantity;
    },
  },
  created() {
    let productID = parseInt(
      this.$route.path.toString().replace(/[^0-9]/g, "")
    );

    this.product = Array.from(this.$props.products).filter((product) => {
      if (product.id === productID) {
        return product;
      }
    })[0];

    this.isFavorited =
      this.$props.favorites.find(
        (favorite) => favorite.id === this.product.id
      ) !== undefined
        ? true
        : false;
  },
  emits: ["update-favorite", "add-to-cart"],
};
</script>

<style scoped>
.container-product-detail {
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 70%;
  margin-top: 36px;
  margin-left: 70px;
}

.container-product-formal {
  display: flex;
  gap: 40px;
}

.container-product-description,
.container-product-reviews {
  background-color: var(--tph-secondary);
  border-radius: 12px;
  width: 100%;
  padding: 20px 30px;
}

.product-inline,
.product-inline-gap {
  display: inline-flex;
  align-items: center;
  width: 100%;
}

.product-inline {
  justify-content: space-between;
}

.product-inline > i {
  font-size: 36px;
}

.product-inline-gap {
  font-size: 18px;
  gap: 10px;
}

.product-inline-gap > i {
  color: var(--tph-text-highlight);
  font-size: 18px;
}

.product-img {
  border-radius: 12px;
  width: 500px;
  min-width: 500px;
  height: 500px;
  min-height: 500px;
  object-fit: cover;
}

.product-information {
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex-grow: 1;
}

.product-name {
  font-size: 46px;
  font-weight: 700;
}

.product-price {
  background-color: var(--tph-tertiary);
  border-radius: 12px;
  color: var(--tph-text-highlight);
  display: flex;
  align-items: center;
  font-size: 30px;
  font-weight: 700;
  width: max-content;
  height: 45px;
  padding: 10px 20px;
}

i.active {
  color: var(--tph-text-highlight);
  cursor: pointer;
}

.product-quantity {
  width: max-content;
  gap: 20px;
}

.product-quantity > .product-inline {
  width: max-content;
  gap: 15px;
}

.product-quantity > .product-inline > i {
  color: var(--tph-tertiary);
  cursor: pointer;
  font-size: 24px;
}

.product-quantity > .product-inline > i:hover {
  color: var(--tph-highlight);
}

.product-information-actions {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: max-content;
  margin-top: 20px;
}

.container-product-description > p {
  color: var(--tph-text-secondary);
  font-size: 18px;
  margin-left: 20px;
  margin-right: 20px;
}

.product-reviews-formal {
  border-bottom: 1px solid var(--tph-text-secondary);
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  height: 100px;
  width: 100%;
  padding-bottom: 10px;
}

.product-reviews-rating {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
}

.product-reviews-rating > i {
  color: var(--tph-text-highlight);
  font-size: 54px;
}

.product-reviews-rating-area {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  max-height: 54px;
}

.placeholder {
  color: var(--tph-text-secondary);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  width: 100%;
  height: 270px;
}
</style>