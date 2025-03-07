import { createApp } from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import ScoreBoard from './components/ScoreBoard.vue'

createApp(App)
.component('ScoreBoard',ScoreBoard)
.use(VueAxios, axios)
.mount('#app')
