<template>
  <section class="app-main">

<!--    <router-view v-slot="{ Component, route }">
      <transition name="fade-transform" mode="out-in">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>-->
    <router-view v-slot="{ Component }">
      <transition name="fade-transform" mode="out-in">
        <keep-alive >
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>

<!--
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>-->
  </section>
</template>

<script>
import {computed} from 'vue'
import {useRoute} from 'vue-router'
export default {
name: "index.vue",
  setup(){

    const key = computed(()=>{

      return useRoute().path
    })
    return {
      key
    }
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}

.fixed-header+.app-main {
  padding-top: 50px;
}

.hasTagsView {
.app-main {
  /* 84 = navbar + tags-view = 50 + 34 */
  min-height: calc(100vh - 84px);
}

.fixed-header+.app-main {
  padding-top: 84px;
}
}
</style>