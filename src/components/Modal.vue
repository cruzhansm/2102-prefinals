<template>
  <div class="modal-container">
    <div class="modal-formal">
      <div class="modal">{{ text }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props: {
    text: String,
  },
};
</script>

<style scoped>
.modal-container {
  background-color: rgba(100, 121, 139, 0.05);
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 11;
}

.modal-formal {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 11;
}

.modal {
  background-color: var(--tph-highlight);
  border-radius: 12px;
  color: black;
  min-width: max-content;
  min-height: max-content;
  position: fixed;
  z-index: 22;
  font-size: 18px;
  padding: 10px 20px;
  margin-bottom: 100px;
}
</style>