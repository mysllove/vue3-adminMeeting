<template>
  <div class="navbar">
    <breadcrumb class="breadcrumb-container" />

  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb.vue'
export default {
name: "index",
  components: {
    Breadcrumb
  },
}
</script>

<style scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, .08);
}
</style>