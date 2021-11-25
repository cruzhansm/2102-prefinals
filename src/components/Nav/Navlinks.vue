<template>
  <router-link tag="div" :to="link" class="store-link link-contents">
    <i :class="icon" class="link-icon"></i>
    <div>{{ name }}</div>
  </router-link>
</template>

<script>
export default {
  name: "Navlink",
  props: {
    name: String,
    active: Boolean,
    icon: String,
    link: String,
  },
  // emits: ["redirect"],
};
</script>

<style scoped>
.store-link {
  font-size: 24px;
  list-style: none;
  width: 100%;
  height: 56px;
}

.router-link-active {
  background-color: var(--tph-tertiary);
  border-radius: 30px 0 0 30px;
  color: var(--tph-text-highlight);
  font-weight: 700;
}

.store-link:hover {
  color: var(--tph-text-highlight);
  cursor: pointer;
}

.store-link.active:hover {
  pointer-events: none;
}

.link-contents {
  display: inline-flex;
  align-items: center;
  gap: 25px;
  padding-left: 30px;
}

.link-icon {
  font-size: 23px;
}
</style>