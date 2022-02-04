import { defineNuxtPlugin } from '#app'

// import breadcrumbs from './../../../src/breadcrumbs'
import breadcrumbs from 'vue-3-breadcrumbs'

export default defineNuxtPlugin((nuxtApp) => {
    const app = nuxtApp.vueApp.use(breadcrumbs, {
        includeComponent: true,
    })

    // without this return, you won't be able to access $breadcrumbs from useNuxtApp directly,
    // but this.$breadcrumbs anyway will be available
    return {
        provide: {
            breadcrumbs: app.config.globalProperties.$breadcrumbs
        }
    }
})