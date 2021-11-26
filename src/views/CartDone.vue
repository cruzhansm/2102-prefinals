<template>
  <div class="success">
    <img src="../assets/images/order-successful.svg" class="success-img" />
    <div
      class="div"
      style="
        font-size: 24px;
        color: var(--tph-text-highlight);
        font-weight: 700;
      "
    >
      order successful
    </div>
    <div class="div" style="font-size: 18px; color: var(--tph-text-secondary)">
      We appreciate your continued patronage!
    </div>
  </div>
</template>

<script>
export default {
  name: "CartDone",
};
</script>

<style scoped>
.success {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-top: 100px;
  width: 80%;
}

.success-img {
  width: 400px;
  height: 400px;
  margin-right: 50px;
}
</style>