import request from '../utils/request.js'



export function getMeetingInfo(data) {
    return request({
        url: '/mrbs/meetingInfo/index.do',
        method: 'post',
        data
    })
}



export function roleInfo(data) {
    return request({
        url: '/mrbs/roleInfo/index.do',
        method: 'post',
        data
    })
}
export function getRoleTreeData(data) {
    return request({
        url: '/mrbs/roleInfo/getMenuMethods.do',
        method: 'post',
        data
    })
}
export function getRoleTreeSelectedData(data) {
    return request({
        url: '/mrbs/roleInfo/getMenuMethodChecked.do',
        method: 'post',
        data
    })
}
export function addRole(data) {
    return request({
        url: '/mrbs/roleInfo/save.do',
        method: 'post',
        data
    })
}
export function updateRole(data) {
    return request({
        url: '/mrbs/roleInfo/update.d',
        method: 'post',
        data
    })
}
export function deleteRole(data) {
    return request({
        url: '/mrbs/roleInfo/batchDelete.do',
        method: 'post',
        data
    })
}

//会议室数据
export function meetingRoomData(data) {
    return request({
        url: '/mrbs/meetingRoom/index.do',
        method: 'post',
        data
    })
}
export function conferenceMeeting(data) {
    return request({
        url: '/mrbs/meetingList/myMeetingList.do',
        method: 'post',
        data
    })
}

