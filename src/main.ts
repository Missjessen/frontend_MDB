/* import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app') */
import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import fullRouter from './router' // Standard router
import simpsonsRouter from './router/simpsonsRouter' // Kun Simpsons Events

// Bestem om vi kun skal vise Simpsons Events (styres via .env fil)
const isSimpsonsMode = import.meta.env.VITE_SIMPSONS_MODE === 'true';

const app = createApp(App)

// Brug den rigtige router baseret på Simpsons Mode
app.use(isSimpsonsMode ? simpsonsRouter : fullRouter)

app.mount('#app')
