import { createStore } from 'vuex'
const modules = import.meta.globEager('./modules/*.js')
const map = {}
Object.keys(modules).forEach(file => {
    const modulesName = file.replace('./modules/', '').replace('.js', '')
    map[modulesName] = modules[file].default
})
// getters、 actions 、 mutations
import getters from './getters'

const Store = createStore({
    modules: {
        ...map,
    },
    getters,
})

export default Store