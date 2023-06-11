import {createPinia} from 'pinia';
// 持久化
import piniaPluginPersist from 'pinia-plugin-persist';
const store = createPinia()
// 使用插件
store.use(piniaPluginPersist)

export default store