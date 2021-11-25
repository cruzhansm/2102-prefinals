<template>
  <div class="progress-column">
    <div :class="['progress', isActive ? 'active' : '']">
      {{ step }}
    </div>
    <span class="process">{{ process }}</span>
  </div>
</template>

<script>
export default {
  name: "Progress",
  props: {
    step: Number,
    process: String,
    isActive: Boolean,
  },
};
</script>

<style scoped>
.progress-column {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
}

.progress {
  background-color: #b9c7d3;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: 700;
  width: 44px;
  height: 44px;
  z-index: 11;
}

.progress.active {
  background-color: var(--tph-highlight);
}

.process {
  font-size: 13px;
}
</style>