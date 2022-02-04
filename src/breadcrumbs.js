import { reactive, defineAsyncComponent } from 'vue'

class Breadcrumbs {
    #vueApp
    #router
    constructor(vueApp) {
        this.#vueApp = vueApp
        this.#router = vueApp.config.globalProperties.$router
        this.value = reactive([]) // breadcrumbs array
    }
    init() {
        this.#router.afterEach((route, from, failure) => {
            if (failure || (route.path === from.path && from.matched.length)) return false
            this.setBreadcrumbsByRoute(route)
        })
    }
    // Creates and sets breadcrumbs chain for route
    setBreadcrumbsByRoute(route) {
        if (!route) return false
        let arPath = route.path.replace(/\/$/, "").split('/')
        let iterablePath = ''
        let spliced = false

        arPath.forEach((item, i) => {
            // 1. Get path for crumb
            iterablePath += (i === 1) ? item : '/' + item
            let isCurrentCrumb = i + 1 >= arPath.length;

            // 2. Check if this crumb already exist, delete excess crumbs
            if (this.value[i]?._path === iterablePath) {
                // if this is last crumb delete excess existing crumbs
                if (isCurrentCrumb) this.value.splice(i + 1, this.value.length)
                this.value[i].current = i + 1 >= arPath.length
                return false
            } else if (!spliced && i < this.value.length) {
                this.value.splice(i, this.value.length)
                spliced = true
            }

            // 3. Create and add crumb
            const breadcrumb = this.createBreadcrumb(iterablePath, isCurrentCrumb)

            if (!breadcrumb) return false

            this.value.push(breadcrumb)
        })
    }
    // Resolves route meta by path and creates breadcrumb object
    createBreadcrumb(path, isCurrent = false) {
        if (!path) return false
        let crumbRoute = this.#router.resolve(path)
        let breadcrumb = crumbRoute.meta?.breadcrumb
        if (typeof breadcrumb === 'function') breadcrumb = breadcrumb.call(null, crumbRoute, this.#vueApp)

        if (!breadcrumb) return false

        let isBcObject = typeof breadcrumb === 'object'

        return {
            label: (isBcObject) ? breadcrumb.label : breadcrumb,
            link: (isBcObject && breadcrumb.link) ? breadcrumb.link : crumbRoute.path,
            current: isCurrent,
            _path: path
        }
    }
}

export default {
    install: (app, options) => {
        // Init breadcrumbs
        app.config.globalProperties.$breadcrumbs = new Breadcrumbs(app)
        app.config.globalProperties.$breadcrumbs.init()

        // Component import
        if (options?.includeComponent) {
            const AmBreadcrumbs = defineAsyncComponent(() => import('./AmBreadcrumbs.vue'))
            app.component('AmBreadcrumbs', AmBreadcrumbs)
        }

    }
}