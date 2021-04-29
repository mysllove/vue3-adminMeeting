<template>
  <a-modal v-model:visible="option.visible" :title="option.title" @ok="$emit('eventClose')">

    <a-input v-model:value="option.roleName" placeholder="角色名称" />
    <a-tree
        checkable
        :tree-data="option.roleTreeDatas"
        v-model:selectedKeys="option.roleTreeSelectedData"
        v-model:checkedKeys="option.roleTreeSelectedData"
        :replace-fields="{key:'id'}"
    >
    </a-tree>

  </a-modal>
</template>

<script>
import { toRefs,defineComponent } from 'vue'
export default defineComponent({
name: "roleModal",
  props: {
    option: Object
  },
  //emits: ['eventClose'],
  setup: function (props) {
    let { title,visible } = toRefs(props)

  }
})
</script>

<style scoped>

</style>