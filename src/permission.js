import router from './router'
import store from './store'
import { getToken } from './utils/auth' // get token from cookie

const whiteList = ['/login', '/auth-redirect']
router.beforeEach(async(to, from, next) => {
    // determine whether the user has logged in
    const hasToken = getToken()
    if (hasToken) {
        if (to.path === '/login') {
            // if is logged in, redirect to the home page

            next({ path: '/' })

        } else {
            const hasGetUserInfo = store.getters.name
            if (hasGetUserInfo) {
                next()
            } else {
                try {
                    //const { roles } = await store.dispatch('user/getInfo')

                    // generate accessible routes map based on roles
                    //const accessRoutes = await store.dispatch('permission/generateRoutes', roles)

                    // dynamically add accessible routes
                    ///router.addRoutes(accessRoutes)

                    // hack method to ensure that addRoutes is complete
                    // set the replace: true, so the navigation will not leave a history record
                    next()
                } catch (error) {

                    // remove token and go to login page to re-login
                    await store.dispatch('user/resetToken')
                    next(`/login?redirect=${to.path}`)
                }
            }
        }
    }else {
        /* has no token*/
        if (whiteList.indexOf(to.path) !== -1) {
            // in the free login whitelist, go directly
            next()
        } else {
            alert(2)
            // other pages that do not have permission to access are redirected to the login page.
            next(`/login?redirect=${to.path}`)
        }
    }
})