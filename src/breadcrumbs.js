import { reactive, defineAsyncComponent } from 'vue'

export default {
    install: (app, options) => {
        app.config.globalProperties.$breadcrumbs = reactive([])

        let $router = app.config.globalProperties.$router
        let $breadcrumbs = app.config.globalProperties.$breadcrumbs


        $router.afterEach(($route, from, failure) => {
            if (failure || ($route.path === from.path && from.matched.length)) return false

            let arPath = $route.path.replace(/\/$/, "").split('/')
            let iterablePath = ''
            let spliced = false

            arPath.forEach((item, i) => {
                // 1. Get path for crumb
                iterablePath += (i === 1) ? item : '/' + item

                // 2. Check if this crumb already exist, delete excess crumbs
                if ($breadcrumbs[i]?._path === iterablePath) {
                    // if this is last crumb delete excess existing crumbs
                    if (i + 1 >= arPath.length) $breadcrumbs.splice(i + 1, $breadcrumbs.length)
                    $breadcrumbs[i].current = i + 1 >= arPath.length
                    return false
                } else if (!spliced && i < $breadcrumbs.length) {
                    $breadcrumbs.splice(i, $breadcrumbs.length)
                    spliced = true
                }

                // 3. Get route and breadcrumb meta
                let route = $router.resolve(iterablePath)
                let breadcrumb = route.meta?.breadcrumb
                if (typeof breadcrumb === 'function') breadcrumb = breadcrumb.call(null, route, app)

                if (!breadcrumb) return false

                // 4. Create and push breadcrumb
                let isBcObject = typeof breadcrumb === 'object'
                breadcrumb = {
                    label: (isBcObject) ? breadcrumb.label : breadcrumb,
                    link: (isBcObject && breadcrumb.link) ? breadcrumb.link : route.path,
                    current: i + 1 >= arPath.length,
                    _path: iterablePath
                }

                $breadcrumbs.push(breadcrumb)
            })
        })

        // Component import
        if (options.includeComponent) {
            const AmBreadcrumbs = defineAsyncComponent(() =>
                import('./AmBreadcrumbs.vue')
            )
            app.component('AmBreadcrumbs', AmBreadcrumbs)
        }

    }
}