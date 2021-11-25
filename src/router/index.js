import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import ProductDetails from "../views/ProductDetails.vue";
import Favorites from "../views/Favorites.vue";
import Cart from "../views/Cart.vue";
import CartCheckout from "../views/CartCheckout.vue";
import CartDone from "../views/CartDone.vue";
import About from "../views/About.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/product/:id",
    name: "Product Details",
    component: ProductDetails,
  },
  {
    path: "/favorites",
    name: "Favorites",
    component: Favorites,
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart,
    children: [
      {
        path: "checkout",
        name: "Checkout",
        component: CartCheckout,
      },
      {
        path: "done",
        name: "Checkout Done",
        component: CartDone,
      },
    ],
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
