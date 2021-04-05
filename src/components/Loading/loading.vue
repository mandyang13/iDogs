<template>
  <div v-show="show" class="container">
    <div class="loading" />
    <div class="mask" />
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: "loading",
  data() {
    return {
      show: false,
    };
  },
};
</script>

<style scoped>
.container {
  position: relative;
}

.mask {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0,0,0,.16);
  z-index: 1002;
}

.loading {
  position: fixed;
  left: 50%;
  top: 50%;
  width: 60px;
  height: 60px;
  border-radius: 100%;
  border: 5px #ffffff solid;
  border-right-color: #87ceeb;
  animation: loading 1s linear infinite;
}

@keyframes loading {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

