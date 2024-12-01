import { createRouter, createWebHistory } from 'vue-router'
/*import App from '../App.vue'*/
import HomePage from '../components/HomePage.vue' // HomePage.vueコンポーネントをインポート
import InputPage from '../components/Input.vue' // Input.vueコンポーネントをインポート
import OutputPage from '../components/Output.vue' // Output.vueコンポーネントをインポート

const routes = [
  /*{
    path: '/',
    name: 'App',
    component: App,
  },*/
  {
    path: '/',
    name: 'HomePage',
    component: HomePage, // HomePage.vueコンポーネント
  },
  {
    path: '/InputPage',
    name: 'InputPage',
    component: InputPage, // Input.vueコンポーネント
  },
  {
    path: '/OutputPage',
    name: 'OutputPage',
    component: OutputPage, // Output.vueコンポーネント
  },
  // 追加のルートがあればここに書く
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
