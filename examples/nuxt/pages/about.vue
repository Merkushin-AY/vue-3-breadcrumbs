<template>
  <div>
    <h1>
      About page
    </h1>
  </div>
</template>

<script>
import { useNuxtApp } from '#app'

export default {
  name: "about",
  setup() {
    const { $breadcrumbs } = useNuxtApp()
    const app = useNuxtApp()

    definePageMeta({
      breadcrumb: 'About page'
    })

    console.log('Nuxt App breadcrumbs', $breadcrumbs)
    // console.log('Nuxt App breadcrumbs', $breadcrumbs.#vueApp)
  },
}
</script>