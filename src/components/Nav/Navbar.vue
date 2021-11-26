<template>
  <nav>
    <div class="store">
      <img
        src="../../assets/images/tph-logo-512px.png"
        alt="Store"
        class="store-logo"
      />
      <span class="store-name">tindahan.ph</span>
    </div>
    <div class="store-links">
      <Navlink
        :key="index"
        v-for="(link, index) in links"
        :name="link.name"
        :active="link.active"
        :icon="link.icon"
        :link="link.link"
      />
    </div>
    <div class="note">
      This project was designed for 16:9 aspect-ratio or 1920x1080 monitors. It
      may look weird if viewed in a different aspect-ratio.
    </div>
  </nav>
</template>

<script>
import Navlink from "../Nav/Navlinks.vue";

export default {
  name: "Navbar",
  data() {
    return {
      links: [
        {
          name: "Home",
          active: false,
          icon: "fa-solid fa-house",
          link: "/",
        },
        {
          name: "My Favorites",
          active: false,
          icon: "fa-solid fa-heart",
          link: "/favorites",
        },
        {
          name: "Cart",
          active: false,
          icon: "fa-solid fa-cart-shopping",
          link: "/cart",
        },
      ],
    };
  },
  components: {
    Navlink,
  },
};
</script>

<style scoped>
nav {
  background-color: var(--tph-secondary);
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 310px;
  height: 350px;
  position: relative;
}

.store {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  margin-left: 30px;
  padding-left: 25px;
}

.store-logo {
  width: 40px;
  height: 40px;
}

.store-name {
  color: var(--tph-text-highlight);
  font-size: 24px;
  font-weight: 700;
}

.store-links {
  padding: 0;
  margin-left: 30px;
}

.note {
  font-size: 18px;
  position: absolute;
  bottom: -150px;
}
</style>