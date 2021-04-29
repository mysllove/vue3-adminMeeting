
import { login,getUserInfo,logout } from '../../api/user'
import {getToken,setToken,removeToken} from '../../utils/auth'

import { message, notification } from 'ant-design-vue'

const state = () => ({
    token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: []
})
const getters = {
    accessToken: (state) => state.accessToken,
    username: (state) => state.username,
    avatar: (state) => state.avatar,
}
const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
        state.introduction = introduction
    },
    SET_NAME: (state, name) => {
        state.name = name
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
        state.roles = roles
    }
}
const actions = {
    login({ commit }, userInfo) {
        const { loginName, loginPwd } = userInfo
        return new Promise((resolve, reject) => {
            login({ loginName: loginName.trim(), loginPwd: loginPwd }).then(response => {
                const { msg } = response
                commit('SET_TOKEN', msg)
                setToken(msg)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    // get user info
    getInfo({ commit, state }) {
        return new Promise((resolve, reject) => {
            getUserInfo({id:state.token}).then(response => {
                const { data } = response
                console.log(data)
                if (!data) {
                    reject('Verification failed, please Login again.')
                }

                const { roles, name, avatar, introduction } = data
                // roles must be a non-empty array
                if (!roles || roles.length <= 0) {
                    reject('getInfo: roles must be a non-null array!')
                }

                commit('SET_ROLES', roles)
                commit('SET_NAME', name)
                commit('SET_AVATAR', avatar)
                commit('SET_INTRODUCTION', introduction)
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // user logout
    logout({ commit, state, dispatch }) {
        return new Promise((resolve, reject) => {
            logout(state.token).then(() => {
                commit('SET_TOKEN', '')
                commit('SET_ROLES', [])
                removeToken()
               // resetRouter()



                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    // remove token
    resetToken({ commit }) {
        return new Promise(resolve => {
            commit('SET_TOKEN', '')
            commit('SET_ROLES', [])
            removeToken()
            resolve()
        })
    },
}
export default {
    namespaced: true,//namespaced: true 的方式使其成为带命名空间的模块。保证在变量名一样的时候，添加一个父级名拼接
    state,
    getters,
    mutations,
    actions
}