import { createApp } from 'vue'
import { createPinia } from 'pinia'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import App from './App.vue'

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.mount('#app');
