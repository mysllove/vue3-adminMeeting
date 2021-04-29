import request from '../utils/request.js'

export function login(data) {
    return request({
        url: '/mrbs/index/checkLogin.do',
        method: 'post',
        data
    })
}
export function getUserInfo(data) {
    return request({
        url: '/mrbs/userInfo/index.do',
        method: 'post',
        data
    })
}
export function logout() {
    return request({
        url: '/mrbs/index/logout.do',
        method: 'post',
    })
}