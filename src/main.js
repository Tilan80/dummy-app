import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import '@mdi/font/css/materialdesignicons.css'
import NavBar from './components/NavBar'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
  iconfont: 'mdi',
})

const app = createApp(App)

app.component('NavBar', NavBar)

app.use(vuetify).use(router).mount('#app')
