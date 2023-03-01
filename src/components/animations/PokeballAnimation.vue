<template>
  <div class="pokeball">
    <div class="pokeball__button"></div>
  </div>
</template>
<style lang="scss" scoped>
.pokeball {
  scale: 0.4;
  position: relative;
  width: 200px;
  height: 200px;
  background: #fff;
  border: 10px solid #000;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: inset -10px 10px 0 10px #ccc;
  animation: shake 1.25s cubic-bezier(0.36, 0.07, 0.19, 0.97) 1s infinite;
}
.pokeball::before,
.pokeball::after {
  content: '';
  position: absolute;
}
.pokeball::before {
  background: red;
  width: 100%;
  height: 50%;
}
.pokeball::after {
  top: calc(50% - 10px);
  width: 100%;
  height: 20px;
  background: #000;
}
.pokeball__button {
  position: absolute;
  top: calc(50% - 30px);
  left: calc(50% - 30px);
  width: 60px;
  height: 60px;
  background: #7f8c8d;
  border: 10px solid #fff;
  border-radius: 50%;
  z-index: 10;
  box-shadow: 0 0 0 10px black;
  animation: blink 0.5s alternate infinite;
}
/* Animation */
@keyframes blink {
  from {
    background: #eee;
  }
  to {
    background: #e74c3c;
  }
}
</style>
