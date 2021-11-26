<template>
  <div class="container">
    <Modal v-show="showModal" :text="modalText" />
    <div class="left">
      <Navbar />
    </div>
    <div class="right">
      <router-view
        :products="products"
        :favorites="favorites"
        :cart="cartProducts"
        @update-favorite="updateFavorites"
        @add-favorite="addSelectedToFavorites"
        @remove-favorite="removeSelectedFromFavorites"
        @add-to-cart="addToCart"
        @remove-from-cart="removeFromCart"
        @final-cart="updateCart"
      ></router-view>
    </div>
    <ExternalLinks />
  </div>
</template>

<script>
import Modal from "./components/Modal.vue";
import Navbar from "./components/Nav/Navbar.vue";
import ExternalLinks from "./components/Nav/ExternalLinks.vue";

export default {
  components: {
    Navbar,
    Modal,
    ExternalLinks,
  },
  data() {
    return {
      products: [
        {
          id: 1,
          name: "Bacon",
          price: 250,
          quantity: 10,
          category: ["Meat"],
          img: "https://healthyrecipesblogs.com/wp-content/uploads/2018/01/oven-bacon-featured.jpg",
          description:
            "With over 25 years of professional undertaking in the meat industry, Brand X has truly perfected the cut, thickness, and taste; truly, the epitome of culinary pursuits. Brand X offers only the finest cuts for our valued patrons. Cured in freshly harvested honey, Brand X's Honey Cured Bacon is sure to leave your taste buds wanting for more. The saliva flooding our customer's mouths only serves to elevate the taste of our meat even more. ",
          brand: "Brand X",
        },
        {
          id: 2,
          name: "Fish",
          price: 150,
          quantity: 5,
          category: ["Seafood", "Fresh"],
          img: "https://cdn-prod.medicalnewstoday.com/content/images/articles/322/322522/fresh-fish-on-ice.jpg",
          brand: "Brand X",
        },
        {
          id: 3,
          name: "Chicken",
          price: 200,
          quantity: 9,
          category: ["Poultry", "Fresh"],
          img: "https://www.seriouseats.com/thmb/t82X6N4ZwGkFZmWPuCjwT-osL3g=/1500x844/smart/filters:no_upscale()/20210714-potato-starch-fried-chicken-vicky-wasik-seriouseats-20-17e193a6bf274bba9091810a0b18ef89.jpg",
          brand: "Brand Y",
        },
        {
          id: 4,
          name: "Beef",
          price: 300,
          quantity: 11,
          category: ["Meat"],
          img: "https://post.healthline.com/wp-content/uploads/2020/08/beef-update-1200x628-facebook-1200x628.jpg",
          brand: "Brand Y",
        },
        {
          id: 5,
          name: "Soy Sauce",
          price: 50,
          quantity: 20,
          category: ["Sauce", "Seasoning"],
          img: "https://www.tasteofhome.com/wp-content/uploads/2020/01/GettyImages-461879075.jpg?fit=700,1024",
          brand: "Brand Z",
        },
        {
          id: 9,
          name: "Egg",
          price: 10,
          quantity: 72,
          category: ["Dairy"],
          img: "https://cdn.britannica.com/94/151894-050-F72A5317/Brown-eggs.jpg",
          brand: "Brand Z",
        },
        {
          id: 11,
          name: "Pork",
          price: 200,
          quantity: 12,
          category: ["Meat"],
          img: "https://www.seriouseats.com/thmb/yHg0KQZc928Iqbm8G-aOE91gJb0=/1500x1125/filters:fill(auto,1)/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__recipes__images__2016__02__20160208-sous-vide-pork-chop-guide-food-lab-37-9bfa2f9b8a464bccad99ea08423b9d8e.jpg",
          brand: "Brand Z",
        },
      ],
      favorites: [],
      cartProducts: [],
      showModal: false,
      modalText: "",
    };
  },
  watch: {
    showModal: function (val) {
      if (val) {
        setTimeout(() => {
          this.modalText = "";
          this.showModal = false;
        }, 500);
      }
    },
  },
  methods: {
    updateFavorites({ id, status }) {
      status
        ? this.favorites.push(
            this.products.find((product) => product.id === id)
          )
        : (this.favorites = this.favorites.filter(
            (favorite) => favorite.id != id
          ));
    },
    addSelectedToFavorites(id) {
      if (this.favorites.find((favorite) => favorite.id === id) === undefined) {
        this.updateFavorites({ id: id, status: true });
      }
    },
    removeSelectedFromFavorites(id) {
      if (this.favorites.find((favorite) => favorite.id === id) !== undefined) {
        this.updateFavorites({ id: id, status: false });
      }
    },
    addToCart({ id, quantity }) {
      const product = this.products.find((product) => product.id === id);
      product.bquantity = quantity;

      if (this.cartProducts.find((product) => product.id === id) == undefined) {
        this.cartProducts.push(product);
      }
    },
    removeFromCart(id) {
      const index = this.cartProducts.findIndex((product) => product.id == id);
      this.cartProducts.splice(index, 1);
      // console.log(this.cartProducts);
    },
    updateCart(discard) {
      discard.forEach((p) => {
        let index = this.cartProducts.findIndex((prod) => prod.id == p.id);
        this.cartProducts.splice(index, 1);
      });
    },
  },
};
</script>

<style>
@import "./assets/css/font.css";

::-webkit-scrollbar {
  width: 15px;
}

::-webkit-scrollbar-thumb {
  background-color: var(--tph-tertiary);
  border-radius: 12px;
}

::-webkit-scrollbar-thumb:hover {
  background-color: var(--tph-highlight);
}

a,
a:visited {
  color: var(--tph-text-primary);
  text-decoration: none;
}

:root {
  --tph-primary: #122333 !important;
  --tph-text-primary: #ffffff !important;
  --tph-secondary: #162738 !important;
  --tph-text-secondary: #64798b;
  --tph-tertiary: #21374a !important;
  --tph-highlight: #2eac68 !important;
  --tph-text-highlight: #2cad69 !important;
  --tph-button-hover: #2dd67b !important;
  --placeholder: #c4c4c4 !important;
  --input: #b9c8d3 !important;
}

* {
  box-sizing: border-box;
}

body {
  background-color: var(--tph-primary);
  margin: 0;
}

button {
  border: 0;
  border-radius: 12px;
  font-family: "Poppins-Regular", sans-serif;
}

#app {
  font-family: "Poppins-Regular", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--tph-text-primary);
  margin: 2rem;
}

.container {
  display: flex;
  width: 100%;
  height: 100%;
}

.left {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 435px;
  height: 100%;
  margin-top: 32px;
}

.right {
  /* background-color: var(--tph-tertiary); */
  width: calc(100vw - 435px);
  height: 100%;
  margin-top: 32px;
  padding-left: 60px;
}
</style>
