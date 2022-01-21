# <a href="https://vuejs.org" target="_blank"><img valign="text-bottom" height="49" src="https://vuejs.org/images/logo.png"></a> Breadcrumbs  



## Description
This plugin adds breadcrumbs to your project based on vue 3. It provides easy and variable setup with Vue Router. Also, it includes the small component.


## Dependencies
- [Vue 3](https://github.com/vuejs/docs)
- [Vue Router](https://github.com/vuejs/router)



## Installation

```bash
npm i vue-3-breadcrumbs
```



## Usage

### Inclusion
```js
import { createApp } from 'vue'
import App from './App.vue'
import breadcrumbs from 'vue-3-breadcrumbs'

const app = createApp(App)

app.use(breadcrumbs, {
    includeComponent: false // {boolean} [includeComponent=false] - Include global breadcrumbs component or not
})
```


### Usage description

```js
// Every breadcrumb is an object:
$breadcrumbs[0] = {
    label: "My first crumb", // {String} label - text of a crumb
    link: '/some-path#special', // {String} [link=route.path] - crumb's "to" attribute for <router-link> component
    current: false, // {Boolean} current - whether the breadcrumb relates to the current route or not. Usually current crumb is last one, except cases when it has falsy value.
    _path: '/some_path', // {String} path - part of the current route.path related to crumb. Used as crumb's identifier
}
```

Breadcrumbs will be recalculated on every [Vue Router afterEach hook](https://next.router.vuejs.org/api/#aftereach).  
If breadcrumb already exist in current chain, it won't be recalculated. 

```js
export default {
    name: 'catalogPage',
    mounted() {
        console.log(this.$breadcrumbs) // you can simply get current breadcrumbs
        
        // You can reactively change it
        // !! It won't change meta object, or object returned by breadcrumb function
        this.$breadcrumbs[0].label = 'New label'
        
    }
}
```
If you want to access breadcrumbs in Composition API (setup option), read [this docs](https://v3.vuejs.org/api/composition-api.html#getcurrentinstance)

### Router settings

```js
const routes = [
    {
        path: '/', // default link for crumb
        component: Home,
        meta: {
            breadcrumb: 'Home' // Can be just a string
        },
    },
    {
        path: '/about',
        component: About,
        meta: {
            // Can be an object
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
            breadcrumb: false // If crumb has falsy value, it would be skipped
        },
    },
    {
        path: '/catalog/:id',
        component: Item,
        meta: {
            /**
             * Can be a function that returns string, object or falsy value (see above)
             * @param {object} route - crumbs's route
             * @param {object} app - object resulting from Vue's createApp
             */
            breadcrumb (route, app) {
                return `Item ${route.params.id}` 
            },
        },
        children: [
            {
                path: '/catalog/:id/:sub',
                component: SubItem,
                meta: {
                    breadcrumb(route, app) {
                        // Using api
                        let breadcrumb = app.config.globalProperties.$api.getBreadcrumb(route)
                        return {
                            label: `SubItem ${breadcrumb}`,
                            link: `${route.path}#special`
                        }
                    },
                },
            },
        ],
    },
]

const router = createRouter({
    routes,
})
```


### Component usage

Don't forget to include it first (by includeComponent option). This is [async component](https://v3.vuejs.org/guide/component-dynamic-async.html#async-components), so it won't be imported, if you don't use it
```html
<AmBreadcrumbs
    :showCurrentCrumb="true" <!-- {Boolean} [showCurrentCrumb=true] - Whether to show the breadcrumb of current route or not -->
/>

//or 
<AmBreadcrumbs>
    <template #crumb="{ crumb }">
        <router-link
            class="my-custom-crumb"
            :to="crumb.link"
        >
            {{ crumb.label }}
        </router-link>
    </template>
</AmBreadcrumbs>
```