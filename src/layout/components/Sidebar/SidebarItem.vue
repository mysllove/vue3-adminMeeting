<template>

<!--  若该路由中存在hidden则不显示  -->
  <div v-if="!item.hidden">
<!--    是否存在超过一级的路由   -->
    <template v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow">
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <a-menu-item :key="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':!isNest}">
          <item :icon="onlyOneChild.meta.icon||(item.meta&&item.meta.icon)" :title="onlyOneChild.meta.title" />
        </a-menu-item>
      </app-link>
    </template>

    <a-sub-menu v-else ref="subMenu" :key="resolvePath(item.path)" popper-append-to-body>
      <template v-slot:title>
        <span>
           <span>{{ item.meta.title }}</span>
        </span>
      </template>
      <sidebar-item
          v-for="child in item.children"
          :key="child.path"
          :is-nest="true"
          :item="child"
          :base-path="resolvePath(child.path)"
          class="nest-menu"
      />
    </a-sub-menu>
  </div>
</template>

<script>

import {reactive,ref, toRefs} from 'vue'
import AppLink from './Link.vue'
import Item from './Item.vue'
import { useRoute,useRouter } from 'vue-router'
import { isExternal } from '../../../utils/validate.js'
import Submenu from './Submenu.vue'
export default {
name: "SidebarItem",
  components: {  AppLink,Item, Submenu  },
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    },

  },
  setup(props){

    let  onlyOneChild = ref(null)



    const resolvePath = (routePath) => {
      if (/^(https?:|mailto:|tel:)/.test(routePath)) {
        return routePath;
      }


/*
      console.log(currentRoute.resolve(props.basePath).path+currentRoute.resolve(routePath).path)
*/
      return props.basePath+(props.basePath==='/'?routePath:routePath.substring(0,1)===''?routePath:'/'+routePath)

    };




    function hasOneShowingChild(children = [], parent){
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          onlyOneChild.value = item
          return true
        }
      })

      if (showingChildren.length === 1) {
        return true
      }
      if (showingChildren.length === 0) {
        onlyOneChild.value = { ... parent, path: '', noShowingChildren: true }
        return true
      }
      return false
    }

  return {
    hasOneShowingChild,
    onlyOneChild,
    resolvePath
  }
  }
}
</script>

<style scoped>

</style>