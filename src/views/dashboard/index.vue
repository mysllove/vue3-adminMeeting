<template>
  <div style="padding: 20px;">
  <a-row :gutter="[16,16]">
    <a-col :xl="8">
      <a-card :loading="loading" title="Card title">234</a-card>
    </a-col>
    <a-col :xl="8">
      <a-card :loading="loading" title="Card title">whatever content</a-card>
    </a-col>
    <a-col :xl="8">
      <a-card :loading="loading" title="Card title">whatever content</a-card>
    </a-col>
    <a-col :xl="16">
      <a-card :loading="loading" title="Card title">whatever content</a-card>
    </a-col>
    <a-col :xl="8">
      <a-card :loading="loading" title="Card title">whatever content</a-card>
    </a-col>
    <a-col :xl="16">
      <a-card :loading="loading" title="Card title">
        <a-tabs v-model:activeKey="activeKey">
          <a-tab-pane key="1" tab="Tab 1">
            <a-table :columns="columns" :data-source="data" :pagination={pageSize:5}>
              <template #name="{ text }">
                <a>{{ text }}</a>
              </template>
            </a-table>
          </a-tab-pane>
          <a-tab-pane key="2" tab="Tab 2" force-render>Content of Tab Pane 2</a-tab-pane>
          <a-tab-pane key="3" tab="Tab 3">Content of Tab Pane 3</a-tab-pane>
        </a-tabs>
      </a-card>
    </a-col>
    <a-col :xl="8">
      <a-card :loading="loading" title="正在进行的会议" :bodyStyle="{padding:'12px 24px'}">
        <a-empty v-if="meetingDuringData.length===0" />
        <a-carousel arrows>
          <template #prevArrow>
            <div class="custom-slick-arrow">
              <left-circle-outlined />
            </div>
          </template>
          <template #nextArrow>
            <div class="custom-slick-arrow" style="right: 10px">
              <right-circle-outlined />
            </div>
          </template>
          <div v-for="(meetingInProgress,index) in meetingDuringData" :key="index">
            <div class="meetingDuringItem" v-for="{endDate, roomName, startDate,percent} in meetingInProgress">
              <div class="meetingRoomName">
                <a-badge :color="getProgressColor(percent)" />
                <a-typography-text
                    :style="ellipsis ? { maxWidth: '200px' } : {}"
                    :ellipsis="ellipsis ? { tooltip: roomName } : false"
                    :content="roomName"
                />
                <span class="meetingTime">（{{ dayjs(startDate).format("HH:mm") }} - {{ dayjs(endDate).format("HH:mm") }}）</span>
              </div>
              <div class="meeting-process">
                <a-progress class="progress-line" :percent="percent"  :strokeColor="getProgressColor(percent)"   status="active"   >
                  <template #format="percent">
                    <div class="progress-message">
                      <span class="progress-percent" :style="{color:getProgressColor(percent)}">{{ percent+'%' }}</span>
                      <p class="progress-text" v-text="getProgressTxt(percent)"></p>
                    </div>
                  </template>
                </a-progress>
              </div>
            </div>
          </div>
        </a-carousel>
      </a-card>
      <a-card :loading="loading" title="Card title">whatever content</a-card>
    </a-col>
  </a-row>
  </div>
</template>

<script>
import {defineComponent, onMounted, reactive, ref, toRefs} from "vue";
import dayjs from "dayjs";
import {getMeetingInfo} from '../../api/meeting.js'
import {
  LeftCircleOutlined,
  RightCircleOutlined,
} from "@ant-design/icons-vue";
const columns = [
  {
    title: '会议主题',
    dataIndex: 'meetingName',
    key: 'meetingName',
    slots: { customRender: 'meetingName' },
  },
  {
    title: '会议室',
    dataIndex: 'age',
    key: 'age',
    width: 80,
  },
  {
    title: '预定人',
    dataIndex: 'address',
    key: 'address 1',
    ellipsis: true,
  },
  {
    title: '会议时间',
    dataIndex: 'address',
    key: 'address 2',
    ellipsis: true,
  },
  {
    title: '预约时间',
    dataIndex: 'address',
    key: 'address 3',
    ellipsis: true,
  },
  {
    title: '审核状态',
    dataIndex: 'address',
    key: 'address 4',
    ellipsis: true,
  },
];
const data = [
  {
    key: '1',
    meetingName: 'sanguoyanyi',
    age: 32,
    address: 'New York No. 1 Lake Park, New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    meetingName: 'hongloumeng',
    age: 42,
    address: 'London No. 2 Lake Park, London No. 2 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    meetingName: 'shuihuzhuan',
    age: 32,
    address: 'Sidney No. 1 Lake Park, Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
  {
    key: '4',
    meetingName: 'xiyouji',
    age: 32,
    address: 'Sidney No. 1 Lake Park, Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
  {
    key: '5',
    meetingName: 'daxue',
    age: 32,
    address: 'Sidney No. 1 Lake Park, Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
  {
    key: '6',
    meetingName: 'zhongyong',
    age: 32,
    address: 'Sidney No. 1 Lake Park, Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];
export default defineComponent({
  components: {
    LeftCircleOutlined,
    RightCircleOutlined,
  },
  setup: function () {
    const loading = ref(true);
    const state = reactive({
      meetingDuringData: [],
    });

    function getProgressColor(Percent) {
      let color = ''
      if (Percent < 50) {
        color = '#FF8367'
      } else if (Percent >= 50 && Percent < 90) {
        color = '#975FE5'
      } else if (Percent >= 90) {
        color = '#009688'
      }
      return color
    }

    function getProgressTxt(Percent) {
      let txt = ''
      if (Percent < 50) {
        txt = '刚开始'
      } else if (Percent >= 50 && Percent < 90) {
        txt = '进行中'
      } else if (Percent >= 90) {
        txt = '快结束'
      }
      return txt
    }

    setTimeout(() => {
      loading.value = false
    }, 2000)

    onMounted(() => {

      getMeetingInfo().then(function (response) {

            const result = [];
            let data = response.data.filter(item => {
              const {startDate, endDate, audit} = item;
              if (audit !== "CANCEL" && new Date().getTime() >= new Date(startDate).getTime() && new Date().getTime() <= new Date(endDate).getTime()) {
                let allTime = dayjs(endDate).diff(dayjs(startDate), 'second')
                let startToEnd = dayjs(new Date()).diff(dayjs(startDate), 'second')
                item.percent = parseInt((startToEnd / allTime * 100).toFixed(0))
                return item
              }
            })

            for (let i = 0; i < data.length; i += 3) {
              result.push(data.slice(i, i + 3));
            }
            state.meetingDuringData = result
          })
    });

    return {
      loading,
      data,
      columns,
      ellipsis: ref(true),
      activeKey: ref('1'),
      getProgressTxt,
      getProgressColor,
      ...toRefs(state),
      dayjs
    }
  }
})
</script>

<style scoped>
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
  margin: 16px;
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
.ant-progress-show-info .ant-progress-outer {
  margin-right: calc(-2em - 15px);
  padding-right: calc(2em + 15px);
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