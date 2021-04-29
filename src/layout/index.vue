<template>
  <div :class="classObj" class="app-wrapper">
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <div :class="{'fixed-header':fixedHeader}">
        <navbar />
<!--        <tags-view v-if="needTagsView" />-->
      </div>
      <app-main />
    </div>
  </div>
</template>

<script>
import {useStore} from 'vuex'
import sidebar from './components/Sidebar/index.vue'
import navbar from './components/Navbar/index.vue'
import AppMain from './components/AppMain/index.vue'
/*import TagsView from './components/TagsView/index.vue'*/
import {defineComponent,computed} from 'vue'

export default defineComponent({
  components: {
    sidebar,
    navbar,
    AppMain
  },
  setup: function () {
    const store = useStore()


  const classObj = computed(()=>{
        return {
          hideSidebar: !store.state.app.sidebar.opened,
          openSidebar: store.state.app.sidebar.opened
        }
    })
const fixedHeader = computed(()=> {
  return store.state.setting.fixedHeader
})

    return {
      classObj,
      fixedHeader
    };
  },

});
</script>

<style scoped>
/*侧边栏样式*/
.fixed-layout{

}

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;

&.mobile.openSidebar {
   position: fixed;
   top: 0;
 }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - 210px);
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px)
}

.mobile .fixed-header {
  width: 100%;
}


















.trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

.trigger:hover {
  color: #1890ff;
}

.logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.logo h1{
  color: #009688;
  font-size: 15px;
  margin-bottom: 0;
}
.site-layout .site-layout-background {
  background: #fff;
}
.meetingDuringItem{
  margin-bottom: 12px;
}
.meetingDuringItem:last-child{
  margin-bottom: 0;
}
.meetingRoomName{
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}
.meetingRoomName :deep(.ant-badge-status-text){
  font-size: 14px;
  font-weight: 400;
  line-height: 24px;
  color: rgba(0, 0, 0, 0.65);
  margin-left: 6px;
}
.meetingRoomName :deep(.ant-badge-status-dot){
  width: 8px;
  height: 8px;
  border-radius: 2px;
}
.meetingTime{
  font-size: 14px;
  font-weight: 400;
  line-height: 24px;
  color: rgba(0, 0, 0, 0.65);
}
.progress-message{
  position: absolute;
  right: 0;
  top: -18px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
}
.progress-percent{
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
  color: #009688;
  display: block;
}
.progress-text{
  margin: 0;
  transform: scale(0.83);
  font-size: 10px;
  font-weight: 400;
  line-height: 20px;
  color: rgba(0, 0, 0, 0.45);
}
/*.meeting-process{
  position: relative;
  display: flex;
  align-items: flex-end;
}
.progress-line{
  padding-right: 52px;
}
.progress-message{
  position: absolute;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
}
.progress-percent{
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
  color: #009688;
  display: block;
}
.progress-text{
  margin: 0;
  transform: scale(0.83);
  font-size: 10px;
  font-weight: 400;
  line-height: 20px;
  color: rgba(0, 0, 0, 0.45);
}
.meetingRoomName{
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}
.meetingRoomName>>>.ant-badge-status-text{
  font-size: 14px;
  font-weight: 400;
  line-height: 24px;
  color: rgba(0, 0, 0, 0.65);
  margin-left: 6px;
}
.meetingRoomName>>>.ant-badge-status-dot{
  width: 8px;
  height: 8px;
  border-radius: 2px;
}
.meetingTime{
  font-size: 14px;
  font-weight: 400;
  line-height: 24px;
  color: rgba(0, 0, 0, 0.65);
}*/
/* For demo */
.ant-carousel :deep(.slick-slide) {
  height: 176px;
  overflow: hidden;
}

.ant-carousel :deep(.slick-arrow.custom-slick-arrow) {
  width: 25px;
  height: 25px;
  font-size: 25px;
  color: #009688;
  background-color: transparent;
  opacity: 0.3;
  top: -31px;
}

.ant-carousel .slick-prev {
  left: auto;
  right: 50px;
}
.ant-carousel :deep(.custom-slick-arrow:before) {
  display: none;
}
.ant-carousel :deep(.custom-slick-arrow:hover) {
  opacity: 0.5;
}

.ant-carousel :deep(.slick-slide h3) {
  color: #555;
}
</style>