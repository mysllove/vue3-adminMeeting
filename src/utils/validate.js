export function isExternal(path) {
    return /^(https?:|mailto:|tel:)/.test(path)
}
const routesToMenuTree = (routes = [], parentKey = '/') => {
    const menuTree = []
    routes.forEach((route, index) => {
        let routeChild = []
        const key = parentKey + route.path
        const { children = [], component, meta, ...other } = route
        if (children && children.length) {
            routeChild = routesToMenuTree(children, key + '/')
        }
        if (!meta.hide) {
            if (routeChild.length) {
                menuTree.push({
                    key,
                    ...other,
                    ...meta,
                    children: routeChild,
                })
            } else {
                menuTree.push({
                    key,
                    ...other,
                    ...meta,
                })
            }
        }
    })
    return menuTree
}
export { routesToMenuTree }