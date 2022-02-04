import { createApp } from 'vue'
import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import Home from './pages/index.vue'
import About from './pages/about.vue'
import Catalog from './pages/catalog.vue'
import Item from './pages/item.vue'
import SubItem from './pages/subitem.vue'

// import breadcrumbs from './../../../src/breadcrumbs'
import breadcrumbs from 'vue-3-breadcrumbs'

const app = createApp(App)

const routes = [
    {
        path: '/',
        component: Home,
        meta: {
            breadcrumb: {
                label: 'Home',
            },
        },
    },
    {
        path: '/about',
        component: About,
        meta: {
            breadcrumb: {
                label: 'About Crumb',
                link: '/about#special' // custom link
            },
        }
    },
    {
        path: '/catalog',
        component: Catalog,
        meta: {
            breadcrumb: 'Catalog'
        },
    },
    {
        path: '/catalog/:id',
        component: Item,
        // meta: {
        //     breadcrumb (route) {
        //         return 'Item ' + route.params.id
        //     },
        // },
        children: [
            {
                path: '/catalog/:id/:sub',
                component: SubItem,
                meta: {
                    breadcrumb(route, app) {
                        console.log(app.config)
                        return {
                            label: `SubItem ${route.params.sub}`,
                            link: `${route.path}#special`
                        }
                    },
                },
            },
        ],
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

app.use(router)
app.use(breadcrumbs, {
    includeComponent: true
})

app.mount('#app')