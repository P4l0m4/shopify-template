<script setup>
import InfiniteSlideBar from 'vue3-infinite-slide-bar'
</script>

<template>
  <infinite-slide-bar :barStyle="{ background: '#1c1a1a', padding: '6px 0' }" class="infinite-slide-bar">
    <div class="infinite-slide-bar__component">
      <span style="padding-left: 128px">5€ de réduction dès 40€ d'achats</span
      ><span>5€ de réduction dès 40€ d'achats</span><span>5€ de réduction dès 40€ d'achats</span
      ><span>5€ de réduction dès 40€ d'achats</span>
    </div>
  </infinite-slide-bar>
</template>
<style lang="scss" scoped>
.infinite-slide-bar {
  &__component {
    display: flex;
    justify-content: space-between;
    font-weight: 700;
    gap: 8px;
  }
}
</style>
