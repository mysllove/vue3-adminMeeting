<template>

  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <div class="scrollbar-wrapper">
      <a-menu
          mode="inline"
          theme="dark"
          v-model:openKeys="openKeys"
          v-model:selected-keys="selectedKeys"
          @openChange="onOpenChange"
      >
        <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
      </a-menu>
    </div>
  </div>
</template>

<script>
import logo from './Logo.vue'
import SidebarItem from './SidebarItem.vue'
import {computed, defineComponent,reactive,toRefs, watch} from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'


export default defineComponent({
  components: {
    logo,
    SidebarItem
  },
  setup() {
    const store = useStore()
    const currentRoute = useRouter()
    const route = useRoute()

  //默认展开
    const openKeysArr = route.path.split('/')
    openKeysArr.shift()
    openKeysArr[0] = '/' + openKeysArr[0]






    let currentSelectedPath = route.path
    currentSelectedPath = currentSelectedPath.substring(currentSelectedPath.lastIndexOf("/") + 1, currentSelectedPath.length)
    let currentOpenKeysPath = route.path.substring(0,route.path.lastIndexOf("/"))

    const state = reactive({
      rootSubmenuKeys: [],
      openKeys:[],
      selectedKeys: [currentSelectedPath==='dashboard'?"/":currentSelectedPath]
    })
    openKeysArr.forEach((item, index) => {
      state.openKeys.unshift(item)
    })
    const onOpenChange = openKeys => {
      const latestOpenKey = openKeys.find(key => {
        state.openKeys.indexOf(key) === -1
      });
      if (state.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        state.openKeys = openKeys;
      } else {
        state.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
    };
    watch(()=>[route.path],()=>{
      let currentSelectedPath = route.path
      currentSelectedPath = currentSelectedPath.substring(currentSelectedPath.lastIndexOf("/") + 1, currentSelectedPath.length)
      let currentOpenKeysPath = route.path.substring(0,route.path.lastIndexOf("/"))
      state.selectedKeys = [currentSelectedPath==='dashboard'?"/":currentSelectedPath]
    })
    return {
      showLogo: computed(() => store.state.setting.sidebarLogo),
      isCollapse: computed(() => store.state.app.sidebar.opened),
      routes:computed(() => currentRoute.options.routes),
      ...toRefs(state),
      onOpenChange
    }

  }
})
</script>

<style scoped>

</style>