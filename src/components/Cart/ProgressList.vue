<template>
  <div class="container-progress">
    <div class="strikethrough"></div>
    <Progress
      :key="index"
      v-for="(item, index) in progress"
      :step="item.stepNum"
      :process="item.process"
      :isActive="step === item.stepNum ? true : false"
    />
  </div>
</template>

<script>
import Progress from "../Cart/Progress.vue";

export default {
  name: "ProgressList",
  components: {
    Progress,
  },
  props: {
    step: Number,
    progress: Array,
  },
};
</script>

<style scoped>
.container-progress {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 780px;
  position: relative;
  margin-bottom: 32px;
}

.strikethrough {
  background-color: var(--tph-tertiary);
  width: 750px;
  height: 3px;
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>