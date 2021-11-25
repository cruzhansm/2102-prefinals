<template>
  <button
    :style="styleButton"
    @mouseover="this.isHovered = true"
    @mouseleave="this.isHovered = false"
  >
    <i v-if="icon" :class="icon"></i>
    {{ text }}
  </button>
</template>

<script>
export default {
  name: "Button",
  props: {
    productID: Number,
    icon: String,
    text: String,
    bgcolor: String,
    color: {
      type: String,
      default: "var(--tph-text-primary)",
    },
    width: {
      type: String,
      default: "max-content",
    },
    height: {
      type: String,
      default: "max-content",
    },
  },
  data() {
    return {
      isHovered: false,
    };
  },
  methods: {
    updateHover() {
      this.isHovered = !this.isHovered;
    },
  },
  computed: {
    styleButton() {
      const finalBG = this.isHovered
        ? this.bgcolor === "var(--tph-primary)"
          ? "#1d3953"
          : this.bgcolor === "var(--tph-tertiary)"
          ? "#2d4b65"
          : "var(--tph-button-hover)"
        : this.bgcolor;

      return `background-color: ${finalBG}; color: ${this.color}; width: ${this.width}; height: ${this.height}`;
    },
  },
};
</script>

<style scoped>
:root {
  --btn-hover: ;
}

button {
  border: 0;
  border-radius: 6px;
  color: var(--tph-text-primary);
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
  font-family: "Poppins-Regular", sans-serif;
  font-size: 18px;
  padding: 15px;
  text-transform: uppercase;
}

button:hover {
  cursor: pointer;
}

i {
  font-size: 18px;
}
</style>