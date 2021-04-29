import {createRouter, createWebHashHistory} from 'vue-router'

const Layout = () => import('../layout/index.vue')


//当设置 true 的时候该路由不会在侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
//hidden: true // (默认 false)
//当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
//redirect: 'noRedirect'
// 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面,只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
// 若你想不管路由下面的 children 声明的个数都显示你的根路由,
// 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
//*alwaysShow: true
//name: 'router-name' // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
/*meta: {
    roles: ['admin', 'editor'] // 设置该路由进入的权限，支持多个权限叠加
    title: 'title' // 设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name' // 设置该路由的图标，支持 svg-class，也支持 el-icon-x element-ui 的 icon
    noCache: true // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
    breadcrumb: false //  如果设置为false，则不会在breadcrumb面包屑中显示(默认 true)
    affix: true // 如果设置为true，它则会固定在tags-view中(默认 false)
    // 当路由设置了该属性，则会高亮相对应的侧边栏。
    // 这在某些场景非常有用，比如：一个文章的列表页路由为：/article/list
    // 点击文章进入文章详情页，这时候路由为/article/1，但你想在侧边栏高亮文章列表的路由，就可以进行如下设置
    activeMenu: '/article/list'
}*/


export const constantRoutes = [
    {
        path: '/login',
        component: () => import('@/views/login/index.vue'),
        hidden: true
    },
    {
        path: '/404',
        component: () => import('@/views/404'),
        hidden: true
    },

    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [{
            path: 'dashboard',
            name: 'Dashboard',
            component: () => import('@/views/dashboard/index.vue'),
            meta: { title: '控制台', icon: 'dashboard' }
        }]
    },
    {
        path: '/meetingBooking',
        component: Layout,
        redirect: '/meetingBooking/meetingAppointment',
        name: 'MeetingBooking',
        meta: { title: '会议预定', icon: 'el-icon-s-help' },
        children: [
            {
                path: 'meetingAppointment',
                name: 'MeetingAppointment',
                component: () => import('@/views/meetingBooking/meetingAppointment.vue'),
                meta: { title: '会议预约', icon: 'table' }
            },
            {
                path: 'meetingList',
                name: 'MeetingList',
                component: () => import('@/views/meetingBooking/meetingList.vue'),
                meta: { title: '会议一览', icon: 'tree' }
            },
            {
                path: 'meetingRoomStatusList',
                name: 'MeetingRoomStatusList',
                component: () => import('@/views/meetingBooking/meetingRoomStatusList.vue'),
                meta: { title: '会议室状态列表', icon: 'tree' }
            }
        ]
    },
   /* {
        path: '/myMission',
        component: Layout,
  /!*      redirect: '/myMission/myReservation',*!/
        name: 'MyMission',
        meta: { title: '我的任务', icon: 'el-icon-s-help' },
        children: [
            {
                path: 'myReservation',
                name: 'MyReservation',
                component: () => import('@/views/myMission/myReservation.vue'),
                meta: { title: '我的预定', icon: 'table' }
            },
            {
                path: 'meetingReview',
                name: 'MeetingReview',
                component: () => import('@/views/myMission/meetingReview.vue'),
                meta: { title: '会议审核', icon: 'tree' }
            },
            {
                path: 'meetingAttendance',
                name: 'MeetingAttendance',
                component: () => import('@/views/myMission/meetingAttendance.vue'),
                meta: { title: '会议签到', icon: 'tree' }
            },
            {
                path: 'myMeeting',
                name: 'MyMeeting',
                component: () => import('@/views/meetingBooking/myMeeting.vue'),
                meta: { title: '我的会议', icon: 'tree' }
            }
        ]
    },*/












   /* {
        path: '/nested',
        component: Layout,
        redirect: '/nested/menu1',
        name: 'Nested',
        meta: {
            title: 'Nested',
            icon: 'nested'
        },
        children: [
            {
                path: 'menu1',
                component: () => import('@/views/nested/menu1/meetingAppointment.vue'), // Parent router-view
                name: 'Menu1',
                meta: { title: 'Menu1' },
                children: [
                    {
                        path: 'menu1-1',
                        component: () => import('@/views/nested/menu1/menu1-1.vue'),
                        name: 'Menu1-1',
                        meta: { title: 'Menu1-1' }
                    },
                    {
                        path: 'menu1-2',
                        component: () => import('@/views/nested/menu1/menu1-2'),
                        name: 'Menu1-2',
                        meta: { title: 'Menu1-2' },
                        children: [
                            {
                                path: 'menu1-2-1',
                                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                                name: 'Menu1-2-1',
                                meta: { title: 'Menu1-2-1' }
                            },
                            {
                                path: 'menu1-2-2',
                                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                                name: 'Menu1-2-2',
                                meta: { title: 'Menu1-2-2' }
                            }
                        ]
                    },
                    {
                        path: 'menu1-3',
                        component: () => import('@/views/nested/menu1/menu1-3'),
                        name: 'Menu1-3',
                        meta: { title: 'Menu1-3' }
                    }
                ]
            },
            {
                path: 'menu2',
                component: () => import('@/views/nested/menu2/index'),
                name: 'Menu2',
                meta: { title: 'menu2' }
            }
        ]
    },*/

    /*{
        path: 'external-link',
        component: Layout,
        children: [
            {
                path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
                meta: { title: 'External Link', icon: 'link' }
            }
        ]
    },*/

/*    // 404 page must be placed at the end !!!
    { path: '*', redirect: '/404', hidden: true }*/
]

const router = createRouter({
    history: createWebHashHistory(),
    routes: constantRoutes,
})

export default router