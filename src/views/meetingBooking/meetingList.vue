<template>
  <div style="padding: 20px;">
    <fieldset style="
    padding: revert;
    border-color: cadetblue;
    border-radius: 10px;
    border-width: 1px;
    border-style: solid;">
      <legend style="width: auto;margin-bottom: 8px;padding: 0 10px">会议一览</legend>
      <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-row>
          <a-col :xs="2" :sm="4" :md="6" :lg="8" :xl="8">
            <a-form-item label="会议地点">
              <a-select
                  v-model:value="formState.roomName"
                  placeholder="请选择会议地点"
              >
                <a-select-option v-for="(item,index) in meetingPlace" :key="index" :value="item.id">
                  {{ item.roomName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xs="20" :sm="16" :md="12" :lg="8" :xl="8">
            <a-form-item label="会议主题">
              <a-input v-model:value="formState.meetingName" placeholder="请填写会议主题" />
            </a-form-item>
          </a-col>
          <a-col :xs="2" :sm="4" :md="6" :lg="8" :xl="8">
            <a-form-item label="会议日期">
              <a-date-picker
                  v-model:value="formState.date1"
                  show-time
                  type="date"
                  placeholder="Pick a date"
                  style="width: 100%"
              />
            </a-form-item>
          </a-col>
          <a-col :xs="2" :sm="4" :md="6" :lg="8" :xl="8">
            <a-form-item label="审核状态">
              <a-select
                  v-model:value="formState.auditState"
                  placeholder="请选择审核状态"
              >
                <a-select-option value="PENDINGAUDIT">待审核</a-select-option>
                <a-select-option value="AUDITED">已审核</a-select-option>
                <a-select-option value="NOTPASSAUDIT">未通过</a-select-option>
                <a-select-option value="CANCEL">已取消</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xs="2" :sm="4" :md="6" :lg="8" :xl="8">
            <a-form-item label="签到状态">
              <a-select
                  v-model:value="formState.signState"
                  placeholder="请选择签到状态"
              >
                <a-select-option value="SIGN">待签到</a-select-option>
                <a-select-option value="SIGNED">已签到</a-select-option>
                <a-select-option value="END">已结束</a-select-option>
                <a-select-option value="CANCEL">已取消</a-select-option>
                <a-select-option value="ADMINCANCEL">管理员取消</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xs="2" :sm="4" :md="6" :lg="8" :xl="8">
            <a-button type="primary" style="    margin-left: 25px;
    margin-top: 3px;
    margin-right: 10px;
    background-color: cadetblue;
    border-color:cadetblue;">查询</a-button>
            <a-button>重置</a-button>
          </a-col>
        </a-row>
      </a-form>
    </fieldset>
    <a-table
        :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
        :scroll="{ x: 'auto', y: 330 }"
        :columns="columns"
        :row-key="record => record.id"
        :data-source="dataSource"
        :pagination="pagination"
        :loading="loading"
        @change="handleTableChange"
    />
  </div>
</template>
<script>
import { usePagination } from 'vue-request';
import {conferenceMeeting,meetingRoomData} from '@/api/meeting.js'
import { defineComponent, reactive, toRaw,toRefs,computed } from 'vue';
const columns = [
  {
    title: '会议主题',
    dataIndex: 'meetingName',
  },
  {
    title: '会议室',
    dataIndex: 'roomName',
  },
  {
    title: '预定人',
    dataIndex: 'host',
  },
  {
    title: '会议时间',
    dataIndex: 'startDate',
    sorter: true,
  },
  {
    title: '预约时间',
    dataIndex: 'createTime',
    sorter: true,
  },
  {
    title: '审核状态',
    dataIndex: 'audit',
  },
  {
    title: '签到状态',
    dataIndex: 'meetingStatus',
  },
];




export default defineComponent({
  setup() {

    const state = reactive({
      selectedRowKeys: [],
      loading: false,
      meetingPlace:[],
      recordCount:null
    });


    const { data: dataSource, run, loading, current, pageSize,total,totalPage} = usePagination(conferenceMeeting, {
      formatResult: res => res.data,
      pagination: {
        currentKey: 'pageNum',
        pageSizeKey: 'numPerPage',
        totalPageKey: 'recordCount'
      },
    });


    const pagination = computed(() => ({
      total:total.value,
      current: current.value,
      pageSize: pageSize.value,
    }));

    const handleTableChange = (pag, filters, sorter) => {
      console.log(pag)
      run({
        numPerPage: pag.pageSize,
        pageNum: pag?.current,
        sortField: sorter.field,
        sortOrder: sorter.order,
        ...filters,
      });
    };




    const formState = reactive({
      roomName: null,
      meetingName: '',
      date1: undefined,
      auditState:null,
      signState:null,
    });



 /*   getConferenceMeeting()
  function  getConferenceMeeting(){
    conferenceMeeting({
      numPerPage: 999
    }).then((res)=>{
      state.conferenceMeeting = res.data
    })
  }*/


    getMeetingRoomData()
    function  getMeetingRoomData(){
      meetingRoomData({
        numPerPage: 999
      }).then((res)=>{
        state.meetingPlace = res.data
      })
    }







    const hasSelected = computed(() => state.selectedRowKeys.length > 0);
    const start = () => {
      state.loading = true;
      setTimeout(() => {
        state.loading = false;
        state.selectedRowKeys = [];
      }, 1000);
    };

    const onSelectChange = selectedRowKeys => {
      console.log('selectedRowKeys changed: ', selectedRowKeys);
      state.selectedRowKeys = selectedRowKeys;
    };
    const onSubmit = () => {
      console.log('submit!', toRaw(formState));
    };

    return {
      formState,
      onSubmit,
      columns,
      labelCol: {
        span: 6,
      },
      wrapperCol: {
        span: 14,
      },
      hasSelected,
      ...toRefs(state),
      start,
      dataSource,
      handleTableChange,
      pagination,
      loading,
      onSelectChange
    };
  },
});
</script>
<style>
.ant-form-item {
  margin-bottom: 10px;
}
</style>