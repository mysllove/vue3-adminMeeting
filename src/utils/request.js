
import axios from 'axios'
import qs from 'qs';
import store from '@/store'
import { message,Modal  } from 'ant-design-vue';



/*
import store from '@/store'
import { getToken } from '@/utils/auth'*/



// create an axios instance
const service = axios.create({
    baseURL: '/dory-mrbs', // url = base url + request url
    withCredentials: true,
    timeout: 5000 // request timeout
})


// request interceptor
service.interceptors.request.use(
    config => {
        config.headers = {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8" //配置请求头
        };
        config.data = qs.stringify(config.data)
        return config
    },
    error => {
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    response => {
        const res = response.data
        if (res.status !== '200') {
            message.error(
                res.msg || 'Error',
                3,
            );
            // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
            if (res.status==='300') {
                Modal.confirm({
                    content: '您已经登出，您可以取消留在此页面，或重新登录',
                    onOk() {
                        store.dispatch('user/resetToken').then(() => {
                            location.reload()
                        })
                    },
                    okText:'确认注销',
                    cancelText: '取消',
                    onCancel() {
                        Modal.destroyAll();
                    },
                });







            }
            return Promise.reject(new Error(res.msg || 'Error'))
        } else {
            return res
        }

    },
    error => {
        console.log('err' + error) // for debug
        message.error(
            error,
            3 ,
        );
        return Promise.reject(error)
    }
)

export default service