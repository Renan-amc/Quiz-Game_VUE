import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import ScoreBoard from './components/ScoreBoard.vue'

createApp(App)
.component('ScoreBoard',ScoreBoard)
.use(VueAxios, axios)
.mount('#app')
