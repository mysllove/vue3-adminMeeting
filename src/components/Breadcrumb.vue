<template>
  <div>
<!--  <a-breadcrumb :routes="levelList">
      <template #itemRender="{ route, routes, paths }">
        <span v-if="route.redirect==='noRedirect'||routes.indexOf(route)===routes.length-1" class="no-redirect">{{ route.meta.title }}</span>
        <router-link v-else :to="`/${paths.join('/')}`">
          {{ route.meta.title }}
        </router-link>
      </template>
</a-breadcrumb>-->
  </div>
</template>

<script>
import {reactive, onMounted,watchEffect, toRefs} from 'vue'
import {useRoute} from 'vue-router'

export default {
  name:'in',
 setup(){
   const state = reactive({
     levelList: null
   })

   const route = useRoute()


   onMounted(()=>{
     getBreadcrumb()
   })
   const routes = watchEffect(() => {
     getBreadcrumb()
   })


   function isDashboard(route) {
     const name = route && route.name
     if (!name) {
       return false
     }
     return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
   }
  function getBreadcrumb() {
     // only show routes with meta.title
     let matched = route.matched.filter(item => {
       const {title} = item.meta;
       return item.meta && title;
     })
     const first = matched[0]
     if (!isDashboard(first)) {
       matched = [{ path: '/dashboard', meta: { title: 'Dashboard' }}].concat(matched)
     }
    state.levelList = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
   }
   return {
     ...toRefs(state),
     routes
   }
 }
};
</script>

<style scoped>
a {
  color: #42b983;
}
</style>