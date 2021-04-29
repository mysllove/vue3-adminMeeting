import defaultSettings from '../../setting.js'

const { showSettings, fixedHeader, sidebarLogo } = defaultSettings

const state = {
    showSettings: showSettings,
    fixedHeader: fixedHeader,
    sidebarLogo: sidebarLogo,
    // 当前打开菜单
    openKey: [],
    // 路由刷新辅助变量
    routerActive: true,
    // 路由列表
    routes:[],
}


const mutations = {
    selectTab(state, key) {
        state.activeKey = key;
    },
    UPDATE_ROUTER_ACTIVE(state) {
        state.routerActive = !state.routerActive;
    },
    CHANGE_SETTING: (state, { key, value }) => {
        // eslint-disable-next-line no-prototype-builtins
        if (state.hasOwnProperty(key)) {
            state[key] = value
        }
    },
    UPDATE_ROUTES(state,routes){
        state.routes = routes;
    },
    TOGGLE_SIDEBAR(state) {
        if (state.collapsed) {
            state.openKey = JSON.parse(localStorage.getItem("openKeys"));
        } else {
            localStorage.setItem("openKeys", JSON.stringify(state.openKey));
            state.openKey = [];
        }
        state.collapsed = !state.collapsed;
    },
    updateOpenKey(state, { openKeys }) {
        //手风琴模式, 只保留当前打开的节点
        let length = openKeys.length;
        if (length > 0 && state.muiltOpen) {
            //除了最后打开的节点, 其他的节点可能包含父节点
            let otherKeys = openKeys.slice(0, length - 1);
            //最后一次打开的节点
            let lastKey = openKeys[length - 1];
            state.openKey = [...otherKeys.filter(ok => lastKey.startsWith(ok)), lastKey];
        } else {
            state.openKey = openKeys;
        }
    },
}

const actions = {
    changeSetting({ commit }, data) {
        commit('CHANGE_SETTING', data)
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}