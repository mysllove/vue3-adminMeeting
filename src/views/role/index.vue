<template>
  <a-button type="dashed" @click="newRole">新增</a-button>
<!--  <a-modal v-model:visible="visible" title="Basic Modal" @ok="handleOk">
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </a-modal>-->
  <RoleModal :option="modalOptions" @eventClose="handleOk" />
  <a-table :columns="columns" :data-source="userData" :rowKey="record => record.id">
    <template #name="{ text }">
      <a>{{ text }}</a>
    </template>

    <template #tags="{ text: tags }">
      <span>
        <a-tag
            v-for="tag in tags"
            :key="tag"
            :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'"
        >
          {{ tag.toUpperCase() }}
        </a-tag>
      </span>
    </template>
    <template #action="{ record }">
      <a  @click="modifyRole(record)">修改</a>
      <a-divider type="vertical" />
      <a-popconfirm
          title="Sure to delete?"
          @confirm="onDelete(record)"
      >
        <a>删除</a>
      </a-popconfirm>
    </template>
  </a-table>
</template>
<script>
import RoleModal from './components/roleModal.vue'
import { SmileOutlined, DownOutlined } from '@ant-design/icons-vue';
import {defineComponent, onMounted, toRaw} from 'vue';
const columns = [
  {
    title: '名称',
    dataIndex: 'roleName',
    key: 'roleName',
  },
  {
    title: 'Action',
    key: 'id',
    slots: {
      customRender: 'action',
    },
  },
];

import {reactive,toRefs,ref} from 'vue'
import {roleInfo,getRoleTreeData,getRoleTreeSelectedData,addRole,updateRole,deleteRole} from "../../api/meeting";
import {message} from "ant-design-vue";

export default defineComponent({
  setup() {
    const visible = ref(false);
    const state = reactive({
      userData : [],
      modalOptions:{
        id:'',
        title:'',
        roleName:'',
        visible:false,
        roleTreeDatas:[],
        roleTreeSelectedData:[],
        mark:null
      }
    })
    let modalOptions = toRefs(state.modalOptions)

    onMounted(() => {
      roleInfor()
      getRoleTreeData().then((res) => {
        let treeData = res.data.map((item) => {
          ({ menuName: item.title } = item);
          item.spread = true
          delete item.menuName
          formatRoutes(item.children)
          function formatRoutes(menuArr) {
            menuArr.forEach(ele => {
              ({ menuMethods: ele.children, menuName: ele.title } = ele);
              delete ele.menuName
              if (ele.methodName) {
                formatRoutes(ele.menuMethods)
                ele.title = ele.methodName
              }
              ele.menuMethods.forEach((item) => {
                item.title = item.methodName
              })
            })
          }
          return item
        })
        state.modalOptions.roleTreeDatas = treeData
      })

    })

    const roleInfor = () => {
      roleInfo().then((res) => {
        state.userData = res.data
      })
    }


    const getRoleSelectedKeys = (roleId) => {
      getRoleTreeSelectedData({roleId}).then((res) => {
        console.log(res)
        let getRoleTreeSelectedData = []
        res.data.forEach(item=>{
          getRoleTreeSelectedData.push(item.methodId)
        })
        console.log(getRoleTreeSelectedData)
        state.modalOptions.roleTreeSelectedData = getRoleTreeSelectedData
        modalOptions.roleTreeSelectedData.value = getRoleTreeSelectedData

      })
    };
    const newRole = () => {
      modalOptions.visible.value = true;
      modalOptions.title.value = '角色新增';
      modalOptions.roleTreeSelectedData.value = []
      modalOptions.roleName.value = ''
      modalOptions.mark = 'add'
    };
    const modifyRole = (roleId) => {
      console.log(roleId)
      modalOptions.visible.value = true;
      modalOptions.title.value = '角色修改';
      modalOptions.id.value = roleId.id;
      getRoleSelectedKeys(roleId.id)
      modalOptions.roleName.value = roleId.roleName
    };
    const onDelete = (roleId) => {
      deleteRole({ids:roleId.id}).then((res)=>{
        roleInfor()
        message.success(
            res.msg,
            3,
        );
      })
    }
    const handleOk = () => {
      modalOptions.visible.value = false;
     if(modalOptions.mark==='add'){
       addRole({
         roleName:modalOptions.roleName.value,
         methodId:modalOptions.roleTreeSelectedData.value.join()
       }).then((res)=>{
         roleInfor()
         message.success(
             res.msg,
             3,
         );
       })
     }else{
      updateRole({
        id:modalOptions.id.value,
        roleName:modalOptions.roleName.value,
        methodId:modalOptions.roleTreeSelectedData.value.join()
      }).then(()=>{
        roleInfor()
        message.success(
            '修改成功',
            3,
        );
      })
     }
    };

    return {
      ...toRefs(state),
      newRole,
      modifyRole,
      handleOk,
      onDelete,
      visible,
      columns
    };
  },

  components: {
    RoleModal,
    SmileOutlined,
    DownOutlined,
  },
});
</script>