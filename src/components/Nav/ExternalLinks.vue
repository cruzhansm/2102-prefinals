<template>
  <div class="external-links">
    <div class="src-code-link">
      <a
        href="https://github.com/cruzhansm/2102-prefinals"
        target="_blank"
        class="fa-brands fa-github"
      ></a>
      <span>Source</span>
    </div>
    <div class="src-code-techs-area">
      <div class="src-code-techs">
        <i class="fa-brands fa-vuejs"></i>
        <i class="fa-brands fa-html5"></i>
        <i class="fa-brands fa-css3"></i>
      </div>
      <span>&copy; Hans Maco Cruz</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "ExternalLinks",
};
</script>

<style scoped>
.external-links {
  background-color: var(--tph-tertiary);
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 200px;
  padding: 10px 15px;
}

.src-code-link {
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: center;
  font-size: 12px;
}

a {
  color: var(--tph-text-primary);
  text-decoration: none;
  font-size: 24px;
}

a:visited {
  color: var(--tph-text-primary);
}

.src-code-techs-area {
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: center;
  font-size: 12px;
}

.src-code-techs {
  display: flex;
  gap: 20px;
  align-items: center;
  font-size: 24px;
}
</style>