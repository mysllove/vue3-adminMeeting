<template>

  <a-form :model="formState">
    <a-form-item label="账号：">
      <a-input v-model:value="formState.loginName" placeholder="请输入您的账号" />
    </a-form-item>
    <a-form-item label="密码：">
      <a-input v-model:value="formState.loginPwd" placeholder="请输入您的密码" type="password" autocomplete="off" />
    </a-form-item>
    <a-form-item>
      <a-button type="primary" @click="onSubmit">Create</a-button>
      <a-button style="margin-left: 10px">Cancel</a-button>
    </a-form-item>
  </a-form>




</template>

<script>
import md5 from 'js-md5'
import {defineComponent,computed, reactive, toRaw, toRefs} from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { login } from '../../api/user'
import {useStore} from 'vuex'
import { mapActions, mapGetters } from 'vuex'
export default defineComponent({
  setup(){
    const store = useStore()

    console.log(store,'ok')



    const formState = reactive({
      loginName:'',
      loginPwd:''
    })
    const md5Pass = computed(()=>{
      return md5
    })
    console.log(md5Pass)
    const router = useRouter()
    const route = useRoute()


    console.log(router,route)
    const onSubmit = () => {
      let userInfor = toRaw(formState)
      userInfor.loginPwd = md5(userInfor.loginPwd)



      store.dispatch('user/login', userInfor).then((res) => {
        router.push('/')

      }).catch(() => {
        router.push('/')

      })
      /*console.log('submit!', toRaw(formState));

      login(toRaw(formState)).then((res) => {
        localStorage.setItem("sid",res.msg)
        router.push('/')

      }).catch(() => {


      })
*/




    };

    return {
      formState,
      md5Pass,
      onSubmit
    }
  }
})

</script>