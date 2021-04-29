
<template>
    <span>{{title }}</span>
</template>

<script>

import { toRefs,defineComponent } from 'vue'
export default defineComponent({
  name: "Item",
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  //emits: ['eventClose'],
  setup: function (props) {
    let { title,visible } = toRefs(props)

  }
})



</script>


